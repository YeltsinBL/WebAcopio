import React, { useEffect, useState } from 'react'
import { Power, Trash2 } from 'lucide-react'
import { 
  getCarguilloTipoList, saveCarguillo 
} from '../../../../services/carguillo'
import { 
  ButtonCustom, ComboBoxCustom, FilterOption, Footer, FooterButton,
  InputTextCustom,
  MessageValidationInput,
  NoRegistros, SectionModel,
  TableBodyCustom,
  TableButton,
  TableContainerCustom,
  TableFooterCustom,
  TableHeaderCustom,
  TableTd,
  TitleCustom
} from '../../../../components/common'
import { 
  formatterDataCombo, obtenerFechaLocal 
} from '../../../../utils'

const CarguilloForm = ({ onShowModel, data }) => {
  const [carguilloId, setCarguilloId] = useState(0)
  const [tipoId, setTipoId] = useState('')
  const [titular, setTitular] = useState('')
  const [tipoTransporteId, setTipoTransporteId] = useState('')
  const [placa, setPlaca] = useState('')
  const [errores, setErrores] = useState({})

  const seleccionTipo = data.carguilloTipoId ? {id:data.carguilloTipoId, nombre:data.carguilloTipoDescripcion} : null
  const [carguilloTipoList, setCarguilloTipoList] = useState([])
  const [carguilloTipoTransporteList, setCarguilloTipoTransporteList] = useState([])
  const [placasList, setPlacasList] = useState([])
  const TIPO_TRANSPORTISTAID = import.meta.env.VITE_TIPOTRANSPORTISTAId
  const [isRequiredPlaca, setIsRequiredPlaca] = useState(false)

  const headers= ['Tipo Transporte', 'Placa','Estado','Acción ']
  
  useEffect(()=>{
    getCarguilloTipo()
    getCarguilloTipoTransporte(false)
  }, [])
  useEffect(()=>{
    if(data){
      setCarguilloId(data.carguilloId || 0)
      setTitular(data.carguilloTitular || '')
      setTipoId(data.carguilloTipoId || '')
      setPlacasList(data.carguilloDetalle || [])
    }
  },[data])
  const getCarguilloTipo = async(value) =>{
    const tipos = await getCarguilloTipoList(value)
    const formatter = tipos?.map(tipo =>(formatterDataCombo(tipo.carguilloTipoId,tipo.carguilloTipoDescripcion)))
    setCarguilloTipoList(formatter)
  }
  const getCarguilloTipoTransporte = async(value) =>{
    const tipos = await getCarguilloTipoList(value)
    const formatter = tipos?.map(tipo =>(formatterDataCombo(tipo.carguilloTipoId,tipo.carguilloTipoDescripcion)))
    setCarguilloTipoTransporteList(formatter)
  }
  const handleSelectionChange = (option) => {
    setTipoId(option)
    if(option==TIPO_TRANSPORTISTAID) setIsRequiredPlaca(true)
    else setIsRequiredPlaca(false)
    setPlacasList([])
  }
  const validarCampos = (isPlaca= false) => {
    const nuevosErrores = {}
    if (!titular) nuevosErrores.titular = "El campo TITULAR es obligatorio."
    if (!tipoId) nuevosErrores.tipoId = "El campo TIPO es obligatorio."
    if (isPlaca) {
      if(!tipoTransporteId) nuevosErrores.tipoTransporteId = 'Seleccione un TRANSPORTE antes de agregar.'
      if(!placa) nuevosErrores.placa = 'Ingrese una PLACA antes de agregar.'
    }
    if (!isPlaca && !verificarCantidadTipoTransporte(placasList)) 
      nuevosErrores.isRequiredPlaca = "Agregue al menos una placa para cada Tipo de transporte"
    setErrores(nuevosErrores)  
    return Object.keys(nuevosErrores).length === 0
  }  
  const handleSelectionTipoTransporteChange = (option) => {
    setTipoTransporteId(option)
  }
  const verificarCantidadTipoTransporte = (array) => {
    if (isRequiredPlaca){
      const uniqueTypes = new Set(array.map(item => item.carguilloTipoId));
      return uniqueTypes.size >= 2;
    }
    return true
  };
  const handleAgregarPlaca = (e) => {
    e.preventDefault()
    if (validarCampos(true)) {
      const isDuplicado = placasList.some(
        (item) => item.carguilloTipoId === tipoTransporteId &&
        item.carguilloDetallePlaca === placa
      )
      if(isDuplicado) return setErrores({placa:"La placa ya ha sido agregado con este tipo de transporte"})
      
        const nombreTipo = carguilloTipoTransporteList
        .filter((tipo)=>tipo.id ==tipoTransporteId)
      setPlaca('')
      const updatePlacaList = [...placasList, 
        { carguilloDetalleId: `temp-${Date.now()}`,
          carguilloTipoId: tipoTransporteId,
          carguilloTipoDescripcion: nombreTipo[0].nombre, 
          carguilloDetallePlaca: placa,
          carguilloDetalleEstado: true}]
      setPlacasList(updatePlacaList)
    }
  }
  const onRowDelete = (placa) => {
    if (typeof placa.carguilloDetalleId === "string" && placa.carguilloDetalleId.startsWith("temp")) {
        // Eliminar si es un ID temporal
        setPlacasList(placasList.filter((item) => item.carguilloDetalleId !== placa.carguilloDetalleId));
      } else {
        // Cambiar estado si tiene un ID del backend
        setPlacasList(
          placasList.map((item) =>
            item.carguilloDetalleId === placa.carguilloDetalleId
              ? { ...item, carguilloDetalleEstado: !item.carguilloDetalleEstado }
              : item
          )
        );
      }
  }

  const handleGuardar = async(e) => {
    e.preventDefault()
    if (validarCampos()) {
      if(carguilloId > 0){
        const save={
          carguilloId: carguilloId,
          carguilloTitular: titular,
          carguilloTipoId: tipoId,
          userModifiedName: 'ADMIN',
          userModifiedAt: obtenerFechaLocal({date: new Date()}),
          carguilloDetalle: reemplazarIdTemporal(placasList)
        }
        const carguillo =await saveCarguillo('PUT', save)
        return onShowModel(carguillo)
      }
      const save={
        carguilloTitular: titular,
        carguilloTipoId: tipoId,
        userCreatedName: 'ADMIN',
        userCreatedAt: obtenerFechaLocal({date: new Date()}),
        carguilloDetalle: placasList
      }
      const carguillo =await saveCarguillo('POST', save)
      onShowModel(carguillo)
    }
  }
  const handleCancelar = (e) => {
    e.preventDefault()
    onShowModel({carguilloId:0})
  }
  const reemplazarIdTemporal = (data) => {
    return data.map((item) => ({
      ...item,
      carguilloDetalleId: typeof item.carguilloDetalleId === "string" && item.carguilloDetalleId.startsWith("temp")
        ? 0 // Cambiar los temporales a 0
        : item.carguilloDetalleId,
    }));
  };
  return (
    <>
    <SectionModel title={(carguilloId > 0 ? 'Información del':'Registrar') + ' Carguillo'}>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 pt-3'>
        <FilterOption htmlFor={'TipoModel'} name={'Tipo'}>
          <ComboBoxCustom initialOptions={carguilloTipoList} selectedOption={seleccionTipo}
            onSelectionChange={handleSelectionChange}
            className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
              errores.tipoId ? "border-red-500" : ""
            }`}
            colorOptions={"text-black"}
            allDisabled={carguilloId>0}
          />
          {errores.tipoId && <MessageValidationInput mensaje={errores.tipoId}/>}
        </FilterOption>
        <FilterOption htmlFor={'TitularModel'} name={'Titular'}>
          <InputTextCustom textValue={titular} placeholder='Ejm: Representante 1'
            onChange={setTitular} valueError={errores.titular}
          />
          {errores.titular && <MessageValidationInput mensaje={errores.titular}/>}
        </FilterOption>
      </div>
    </SectionModel>
    
    <TableContainerCustom>
      <TableHeaderCustom grid >
        <TitleCustom titulo={'Lista de Placas'} />
        <TableFooterCustom>
          <FilterOption htmlFor={'TipoTransporteModel'} name={'Tipo Transporte'}>
            <ComboBoxCustom initialOptions={carguilloTipoTransporteList}
                onSelectionChange={handleSelectionTipoTransporteChange}
                className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                errores.tipoTransporteId ? "border-red-500" : ""
                }`}
                colorOptions={"text-black"}
            />
            {errores.tipoTransporteId && <MessageValidationInput mensaje={errores.tipoTransporteId}/>}
          </FilterOption>
          <FilterOption htmlFor={'PlacaModel'} name={'Placa'}>
            <InputTextCustom textValue={placa} placeholder={'Ejm: PE-T3X896'}
              onChange={setPlaca} valueError={errores.placa} />
            {errores.placa && <MessageValidationInput mensaje={errores.placa}/>}
          </FilterOption>
          <ButtonCustom extraClassName={'mt-6 md:w-28'} name={'Agregar'} 
            onClick={handleAgregarPlaca} disabled={tipoId != TIPO_TRANSPORTISTAID} />
        </TableFooterCustom>
      </TableHeaderCustom>
      <TableBodyCustom headers={headers}>
        {placasList.length > 0 ? (
          placasList.map((placa) =>(
            <tr key={placa.carguilloDetalleId}>
              <TableTd hidden> {placa.carguilloDetalleId} </TableTd>
              <TableTd hidden>{placa.carguilloTipoId}</TableTd>
              <TableTd>{placa.carguilloTipoDescripcion}</TableTd>
              <TableTd>{placa.carguilloDetallePlaca}</TableTd>
              <TableTd>{placa.carguilloDetalleEstado ? 'Activo': 'Inactivo'}</TableTd>
              <TableTd>
                <TableButton className={`${placa.carguilloDetalleEstado ? 'text-red-400 hover:text-red-300':'text-blue-400 hover:text-blue-300'} `}
                  onRowSelect={()=>onRowDelete(placa)}>
                  {placa.carguilloDetalleEstado ?(
                    <Trash2 size={18} />
                  ):(
                    <Power size={18}/>
                  )}
                </TableButton>
              </TableTd>
            </tr>
          ))
          ):(<NoRegistros colSpan={headers.length} />)}
      </TableBodyCustom>
      {errores.isRequiredPlaca && <MessageValidationInput mensaje={errores.isRequiredPlaca}/>}
	  </TableContainerCustom>
    <Footer>
      <FooterButton accion={handleGuardar} name={'Guardar'} />
      <FooterButton accion={handleCancelar} name={'Cancelar'} />
    </Footer>
    </>
  )
}

export default CarguilloForm