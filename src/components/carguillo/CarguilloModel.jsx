import React, { useEffect, useState } from 'react'
import SectionModel from '../common/SectionModel'
import FilterOption from '../common/FilterOption'
import ComboBoxCustom from "../common/ComboBoxCustom"
import { getCarguilloTipoList, saveCarguillo } from '../../services/carguillo'
import Footer from '../common/Footer'
import FooterButton from '../common/FooterButton'
import { formatterDataCombo, obtenerFechaLocal } from '../common/FormatteData'
import ButtonCustom from '../common/ButtonCustom'
import { NoRegistros } from '../common/NoRegistros'
import { Power, Trash2 } from 'lucide-react'

const CarguilloModel = ({ onShowModel, data }) => {
  const [carguilloId, setCarguilloId] = useState('')
  const [tipoId, setTipoId] = useState('')
  const [titular, setTitular] = useState('')
  const [tipoTransporteId, setTipoTransporteId] = useState('')
  const [placa, setPlaca] = useState('')
  const [errores, setErrores] = useState({})

  const seleccionTipo = data.carguilloTipoId ? {id:data.carguilloTipoId, nombre:data.carguilloTipoDescripcion} : null
  const [carguilloTipoList, setCarguilloTipoList] = useState([])
  const [carguilloTipoTransporteList, setCarguilloTipoTransporteList] = useState([])
  const [placasList, setPlacasList] = useState([])
  const TIPO_TRANSPORTISTA = 2
  const [isRequiredPlaca, setIsRequiredPlaca] = useState(false)

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
    if(option==TIPO_TRANSPORTISTA) setIsRequiredPlaca(true)
    else setIsRequiredPlaca(false)
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
    <SectionModel title={(data.carguilloId > 0 ? 'Información del':'Registrar') + ' Carguillo'}>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 pt-3'>
        <FilterOption htmlFor={'TipoModel'} name={'Tipo'}>
          <ComboBoxCustom initialOptions={carguilloTipoList} selectedOption={seleccionTipo}
            onSelectionChange={handleSelectionChange}
            className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
              errores.tipoId ? "border-red-500" : ""
            }`}
            colorOptions={"text-black"}
          />
          {errores.tipoId && <p className="text-red-500 text-sm">{errores.tipoId}</p>}
        </FilterOption>
        <FilterOption htmlFor={'TitularModel'} name={'Titular'}>
          <>
            <input type='text' className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
              errores.titular ? "border-red-500" : ""
              }`}
              name='query' placeholder='Ejm: Representante 1'
              value={titular}
              onChange={(e) => setTitular(e.target.value)}
            />
            {errores.titular && <p className="text-red-500 text-sm">{errores.titular}</p>}
          </>
        </FilterOption>
      </div>
    </SectionModel>
    
    <div className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'>
      <div className='grid grid-cols-1  justify-between items-center mb-6'>
        <h2 className='pb-6 text-2xl font-semibold text-gray-100 md:pb-0'>Lista de Placas </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 pt-3'>
          <FilterOption htmlFor={'TipoTransporteModel'} name={'Tipo Transporte'}>
            <ComboBoxCustom initialOptions={carguilloTipoTransporteList}
                onSelectionChange={handleSelectionTipoTransporteChange}
                className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                errores.tipoTransporteId ? "border-red-500" : ""
                }`}
                colorOptions={"text-black"}
            />
            {errores.tipoTransporteId && <p className="text-red-500 text-sm">{errores.tipoTransporteId}</p>}
          </FilterOption>
          <FilterOption htmlFor={'PlacaModel'} name={'Placa'}>
            <>
              <input type='text' className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                errores.placa ? "border-red-500" : ""
                }`}
                name='query' placeholder='Ejm: PE-T3X896'
                value={placa}
                onChange={(e) => setPlaca(e.target.value)}
              />
              {errores.placa && <p className="text-red-500 text-sm">{errores.placa}</p>}
            </>
          </FilterOption>
          <ButtonCustom extraClassName={'mt-6 md:w-28'} name={'Agregar'} onClick={handleAgregarPlaca} />
        </div>
      </div>
      <div className="overflow-auto max-h-[350px]">
        <table className="table-auto w-full divide-y divide-gray-700">
          <thead className="bg-gray-900  sticky top-0 z-10">
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>
                Tipo Transporte
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>
                Placa
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>
                Estado
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>
                Acción
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-700'>
            {placasList.length > 0 ? (
                placasList.map((placa) =>(
                  <tr key={placa.carguilloDetalleId}>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 gap-2 items-center hidden'>
                      {placa.carguilloDetalleId}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300 hidden'>
                      {placa.carguilloTipoId}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                      {placa.carguilloTipoDescripcion}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                      {placa.carguilloDetallePlaca}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                      {placa.carguilloDetalleEstado ? 'Activo': 'Deshabilitado'}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-30 '>
                      <button className={`${placa.carguilloDetalleEstado ? 'text-red-400 hover:text-red-300':'text-blue-400 hover:text-blue-300'} `}
                      onClick={()=>onRowDelete(placa)}
                      >
                        {placa.carguilloDetalleEstado ?(
                            <Trash2 size={18} />
                        ):(
                            <Power size={18}/>
                        )}
                      </button>
                    </td>
                  </tr>
                ))
            ):(<NoRegistros colSpan={4} />)}
          </tbody>
        </table>
        {errores.isRequiredPlaca && <p className="text-red-500 text-sm">{errores.isRequiredPlaca}</p>}
      </div>
	</div>

    <Footer>
      <FooterButton accion={handleGuardar} name={'Guardar'} />
      <FooterButton accion={handleCancelar} name={'Cancelar'} />
    </Footer>
    </>
  )
}

export default CarguilloModel