import React, { useEffect, useState } from 'react'
import CorteTicketPopup from './CorteTicketPopup'
import { Trash2 } from 'lucide-react'
import { corteSave } from '../../services/corte'
import { searchAsignaTierra } from '../../services/asignartierra'
import { 
  ButtonCustom, ComboBoxCustom, FilterOption, Footer, FooterButton, 
  InputTextCustom, 
  NoRegistros, SectionModel 
} from '../common'
import { 
  convertirFechaToYMD, FormatteDecimal, formatterDataCombo, obtenerFechaLocal 
} from '../../utils'

export const CorteModel = ({ onShowModel, data }) => {
  const [idModel, setIdModel] = useState('')
  const [ucModel, setUcModel] = useState('')
  const [campoModel, setCampoModel] = useState('')
  const [fechaModel, setFechaModel] = useState('')
  const [precioModel, setPrecioModel] = useState('')
  const [sumaPesoBrutoModel, setSumaPesoBrutoModel] = useState('')
  const [totalModel, setTotalModel] = useState('')
  const [estadoModel, setEstadoModel] = useState('Activo')
  const [proveedoresModel, setProvedoresModel] = useState('')
  const [ticketSelected, setTicketSelected] = useState([])
  const [errores, setErrores] = useState({})
  const [showPopup, setShowPopup] = useState(false)

  const seleccionTierra = data.tierraId ? {id: data.tierraId, nombre: data.tierraUC } : null
  const [ucLista, setUcLista] = useState([])
  const [ucListaCombo, setUcListaCombo] = useState([])
  const headers = ['ID', 'Ingenio', 'Viaje', 'Fecha', 'Transportista', 'Camión', 
    'Camión Peso', 'Vehículo', 'Vehículo Peso', 'Peso Bruto']

  useEffect(()=> {
    getListUC()
  },[])
  useEffect(()=>{
    if(data){
      setIdModel(data.corteId || 0)
      setUcModel(data.tierraUC || '')
      setCampoModel(data.tierraCampo || '')
      setFechaModel(
        data.corteFecha ? convertirFechaToYMD(data.corteFecha) : 
        obtenerFechaLocal({date: new Date()}).split('T')[0]
      )
      setPrecioModel(data.cortePrecio || '')
      setSumaPesoBrutoModel(data.cortePesoBrutoTotal || '')
      setTotalModel(data.corteTotal || '')
      setEstadoModel(data.corteEstadoDescripcion || 'Activo')
      setTicketSelected(data.tickets || [])
      setProvedoresModel(data.proveedoresNombres || '')
    }
  }, [data])
  useEffect(() => {
    const total = ticketSelected.reduce(getSum, 0)
    if(total>0) return setSumaPesoBrutoModel(FormatteDecimal(total,3))
    return setSumaPesoBrutoModel('')
  }, [ticketSelected])
  useEffect(()=>{
    if(precioModel > 0 && sumaPesoBrutoModel > 0) 
      return setTotalModel(FormatteDecimal(precioModel * sumaPesoBrutoModel,2))
    return setTotalModel('')
  },[precioModel, sumaPesoBrutoModel])
  const getSum=(total, num) =>{
    return total + parseFloat(num.pesoBruto)
  }
  const getListUC = async() => {
    const ucs = await searchAsignaTierra({})
    setUcLista(ucs)
    const formatter= ucs?.map(tipo =>
      (formatterDataCombo(tipo.tierraId, tipo.uc)))
    setUcListaCombo(formatter)
  }
  const validarCampos = () => {
    const nuevosErrores = {}
    //if (!idModel) nuevosErrores.id = "El campo ID es obligatorio."
    if (!ucModel) nuevosErrores.uc = "El campo UC es obligatorio."
    if (!fechaModel) nuevosErrores.fecha = "El campo FECHA es obligatorio."
    if (!precioModel) nuevosErrores.precio = "El campo PRECIO es obligatorio."
    if (!sumaPesoBrutoModel) nuevosErrores.suma = "El campo SUMA PESO BRUTO es obligatorio."
    if (!totalModel) nuevosErrores.total = "El campo TOTAL es obligatorio."
  
    setErrores(nuevosErrores)
  
    return Object.keys(nuevosErrores).length === 0 // Solo es válido si no hay errores
  }
  const handleSelectionChange = (option) => {
    setUcModel(option)
    var uc = ucLista.find((item) => item.tierraId === option)
    setCampoModel(uc.campo)
    setProvedoresModel(uc.proveedoresNombres)
  }
  const handleShowModel = () => setShowPopup(true)
  const resspuestaShowModel = (data) => {
    if(data.length > 0) {
      if(ticketSelected.length > 0){
        const mergedArray = [
          ...ticketSelected,
          ...data.filter((item2) => !ticketSelected.some((item1) => item1.id === item2.id)),
        ]
        setTicketSelected(mergedArray)
      }else setTicketSelected(data)
    }
    setShowPopup(false)
  }
  const handleGuardar = async(e) => {
    e.preventDefault()
    if (validarCampos()) {
      const corte = await corteSave({
        corteFecha: fechaModel,
        tierraId: ucModel,
        cortePrecio: precioModel,
        cortePesoBrutoTotal: sumaPesoBrutoModel,
        corteTotal: totalModel,
        userCreatedName: 'ADMIN',
        userCreatedAt: obtenerFechaLocal({date: new Date()}),
        corteDetail: ticketSelected?.map(ticket => ({ticketId :ticket.id}))
      })
      onShowModel(corte)
    }
  }
  const handleCancelar = (e) => {
    e.preventDefault()
    onShowModel({id:0})
  }
  const onRowDelete= (data)=>{
    setTicketSelected(ticketSelected.filter(ticket => ticket.id !== data.id))
  }
  return (
    <>
    <SectionModel title={(data.corteId > 0 ? 'Información del': 'Registrar') + ' Corte'}>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-3'>
        <div className='space-y-2 hidden'>
          <label htmlFor="IdModel" className="text-white ">ID</label>
          <input type='text' className={`bg-transparent  focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
            errores.id ? "border-red-500" : "" 
          } `}
            name='query' placeholder='Automático'
            value={idModel}
            onChange={(e) => setIdModel(e.target.value)}
          />
        </div>
        <div className='space-y-2'>
          <label htmlFor="FechaModel" className="text-white">Fecha </label>
          <input type='date' className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
              errores.fecha ? "border-red-500" : ""
            }`}
            name='query' placeholder='Ejm: 20/11/2024'
            value={fechaModel}
            onChange={(e) => setFechaModel(e.target.value)}
            readOnly={data.corteId > 0}
          />
          {errores.fecha && <p className="text-red-500 text-sm">{errores.fecha}</p>}
        </div>           
        <FilterOption htmlFor={'UCFilter'} name={'UC'} >
          {data.corteId > 0 ?
            (
            <input type='text' className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                errores.uc ? "border-red-500" : ""
              }`}
              name='query' 
              value={ucModel}
              readOnly
            />
            ):
            (
              <>
          <ComboBoxCustom  initialOptions={ucListaCombo} selectedOption={seleccionTierra} 
            onSelectionChange={handleSelectionChange}
            className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
              errores.uc ? "border-red-500" : ""
            }`}
            colorOptions={"text-black"}
          />
          {errores.uc && <p className="text-red-500 text-sm">{errores.uc}</p>}
              </>
            )
          }
        </FilterOption>
        <FilterOption htmlFor={'CampoModel'} name={'Campo'}>
          <InputTextCustom textValue={campoModel} placeholder='Automático' readOnly={true}/>
        </FilterOption>
        <div className='space-y-2'>
          <label htmlFor="PrecioModel" className="text-white">Precio Corte</label>
          <input type='text' className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
              errores.precio ? "border-red-500" : ""
            }`}
            name='query' placeholder='Ejm: 85.60'
            value={precioModel}
            onChange={(e) => setPrecioModel(e.target.value)}
            readOnly={data.corteId > 0}
          />
          {errores.precio && <p className="text-red-500 text-sm">{errores.precio}</p>}
        </div>
        <div className='space-y-2'>
          <label htmlFor="EstadoModel" className="text-white">Estado</label>
          <input type='text' className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
              errores.estado ? "border-red-500" : ""
          }`}
              name='query' placeholder='Automático'
              value={estadoModel}
              onChange={(e) => setEstadoModel(e.target.value)}
              readOnly
          />
          {errores.estado && <p className="text-red-500 text-sm">{errores.estado}</p>}
        </div>
        <div className='space-y-2 md:col-span-2 lg:col-span-4 '>
          <label htmlFor="ProveedoresModel" className="text-white">Proveedores</label>
          <InputTextCustom textValue={proveedoresModel} placeholder='Automático' readOnly={true}/>
        </div>
      </div>        
    </SectionModel>
    <div>
    <div className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'>
      <div className='grid grid-cols-1 md:flex justify-between items-center mb-6'>
        <h2 className='pb-6 text-xl font-semibold text-gray-100 md:pb-0'>Lista de Tickets Seleccionados</h2>
        <ButtonCustom name={'Agregar'} onClick={handleShowModel} extraClassName={data.corteId > 0 ? 'hidden' : ''}/>
      </div>
      <div className="overflow-auto max-h-[350px]">
        <table className="table-auto w-full divide-y divide-gray-700">
            <thead className="bg-gray-900  sticky top-0 z-10">
              <tr>
                { headers.map((header, index) => (
                  <th key={index} className={`px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider ${header =='ID' ? 'hidden':''}`}>
                    {header}
                  </th>
                ))}
                {data.corteId > 0 ?(''):(                    
                <th className={`px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider`}>
                  Acción
                </th>
                )}
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-700'>
            {ticketSelected.length > 0 ? (
              ticketSelected.map((ticket) => (
                <tr key={ticket.id} >
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 gap-2 items-center hidden'>
                      {ticket.id}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                      {ticket.ingenio}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                      {ticket.viaje}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                      {ticket.fecha.toLocaleDateString('es-PE')}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                      {ticket.transportista}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                      {ticket.camion}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                      {ticket.camionPeso}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                      {ticket.vehiculo}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                      {ticket.vehiculoPeso}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                      {ticket.pesoBruto}
                  </td>
                  {data.corteId > 0 ?(''):(
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-30 '>
                    <button className='text-red-400 hover:text-red-300'
                      onClick={()=>onRowDelete(ticket)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                  )}                  
                </tr>
              ))
            ): ( <NoRegistros colSpan={headers.length -1}/> )}
            </tbody>
        </table>
      </div>
      <div className='grid grid-cols-1 pt-6 md:grid-cols-2 lg:grid-cols-4 gap-4 '>  
        <div className='space-y-2'>
          <label htmlFor="PesoBrutoModel" className="text-white">Suma Peso Bruto</label>
          <input type='text' className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
              errores.suma ? "border-red-500" : ""
            }`}
            name='query' placeholder='Automático'
            value={sumaPesoBrutoModel}
            onChange={(e) => setSumaPesoBrutoModel(e.target.value)}
            readOnly
          />
          {errores.suma && <p className="text-red-500 text-sm">{errores.suma}</p>}
        </div>
        <div className='space-y-2'>
          <label htmlFor="totalModel" className="text-white">Total</label>
          <input type='text' className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
              errores.total ? "border-red-500" : ""
            }`}
            name='query' placeholder='Automático'
            value={totalModel}
            onChange={(e) => setTotalModel(e.target.value)}
            readOnly
          />
          {errores.total && <p className="text-red-500 text-sm">{errores.total}</p>}
        </div>
      </div>
	  </div>
    </div> 

    <Footer>
      {
        data.corteId > 0 ?
        (''):( <FooterButton accion={handleGuardar} name={"Guardar"}/> )
      }
      <FooterButton accion={handleCancelar} name={"Cancelar"}/>
    </Footer>
    {showPopup ? <CorteTicketPopup onShowModel={resspuestaShowModel} headers={headers}/>    : ''}
    </>
  )
}
