import { Power, Trash2 } from 'lucide-react'
import { saveCarguillo } from '~services/carguillo'
import { 
  ButtonCustom, ComboBoxCustom, FilterOption, Footer, FooterButton,
  InputTextCustom, MessageValidationInput, NoRegistros, SectionModel,
  TableBodyCustom, TableButton, TableContainerCustom, TableFooterCustom,
  TableHeaderCustom, TableTd, TitleCustom
 } from '~components/common'
import { useCarguilloForm, useCarguilloValidate } from '../hooks'
import { toast } from 'sonner'
import { CarguilloAdapterSave } from '../adapter/CarguilloAdapter'

const CarguilloForm = ({ onShowModel, data }) => {
  const {
    carguilloId, tipoId, setTipoId,
    titular, setTitular,
    tipoTransporteId, setTipoTransporteId,
    placa, setPlaca, seleccionTipo,
    carguilloTipoList, carguilloTipoTransporteList, 
    placasList, setPlacasList,
    isRequiredPlaca, setIsRequiredPlaca,
    TIPO_TRANSPORTISTAID, headers
  } = useCarguilloForm(data)
  const { validate, errores } = useCarguilloValidate()

  const handleSelectionChange = (option) => {
    setTipoId(option)
    if(option==TIPO_TRANSPORTISTAID) setIsRequiredPlaca(true)
    else setIsRequiredPlaca(false)
    setPlacasList([])
  }
  const handleSelectionTipoTransporteChange = (option) => {
    setTipoTransporteId(option)
  }

  const handleAgregarPlaca = (e) => {
    e.preventDefault()
    const {isValid} = validate(
      {isPlaca:true, values:{
        titular, tipoId, tipoTransporteId, placa, tipoTransporteId, placasList
      }}
    )
    if(isValid){
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
    const toastLoadingCustom = toast.loading('Cargando...')
    const save = {
      carguilloId, titular, tipoId, placasList, isRequiredPlaca
    }
    const {isValid} = validate({values:save})
    if(isValid){      
      const carguillo =await saveCarguillo(carguilloId > 0?'PUT':'POST', CarguilloAdapterSave(save))
      if(carguillo.result === false)
        return toast.error(carguillo.message, {id: toastLoadingCustom, style: { color:'red' }})
      toast.success(carguillo.message, {id: toastLoadingCustom})
      onShowModel(carguillo)
    }
  }
  const handleCancelar = (e) => {
    e.preventDefault()
    onShowModel({result:false})
  }
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