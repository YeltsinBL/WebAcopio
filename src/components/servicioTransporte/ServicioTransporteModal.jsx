import { useEffect, useState } from "react"
import { 
  ButtonCustom, ComboBoxCustom, FilterOption, Footer, FooterButton, InputDateCustom,
  InputDecimalCustom, InputTextCustom, NoRegistros, SectionModel 
} from "../common"
import { getCarguilloInTickets, searchCarguilloList } from "../../services/carguillo"
import { convertirFechaDDMMYYYY, convertirFechaToYMD, FormatteDecimal, 
  formatterDataCombo, obtenerFechaLocal 
} from "../../utils"
import { servicioTransporteSave } from "../../services/serviciotransporte"
import { Trash2 } from "lucide-react"
import { ServicioTransportePopup } from "./ServicioTransportePopup"

export const ServicioTransporteModal = ({onShowModel, data}) => {
  const [carguilloList, setCarguilloList] = useState([])
  const [carguilloPaleroLista, setCarguilloPaleroLista] = useState([])
  const [servicioIdModel, setServicioIdModel] = useState('')
  const [fechaModel, setFechaModel] = useState('')
  const [carguilloIdModel, setCarguilloIdModel] = useState('')
  const [servicioPrecioModel, setServicioPrecioModel] = useState('')
  const [sumaPesoBrutoModel, setSumaPesoBrutoModel] = useState('')
  const [totalModel, setTotalModel] = useState('')
  const [ticketSelected, setTicketSelected] = useState([])
  const [servicioDescripcion, setServicioDescripcion] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  const [carguilloIdPaleroModel, setCarguilloIdPaleroModel] = useState('')
  const [carguilloPaleroPrecioModel, setCarguilloPaleroPrecioModel] = useState('')

  const [errores, setErrores] = useState({})

  const seleccionCarguillo = data.carguilloId ? {id: data.carguilloId, nombre: data.carguilloTitular } : null
  const seleccionCarguilloPalero = data.carguilloIdPalero ? {id: data.carguilloIdPalero, nombre: data.carguilloTitularPalero } : null
  
  const headers = ['Ingenio', 'Campo', 'Viaje', 'Fecha', 'Transportista', 'Camión', 
    'Camión Peso', 'Vehículo', 'Vehículo Peso', 'Peso Bruto']

  useEffect(() => {
    const total = ticketSelected.reduce(getSum, 0)
    if(total>0) return setSumaPesoBrutoModel(FormatteDecimal(total,3))
    return setSumaPesoBrutoModel('')
  }, [ticketSelected])
  useEffect(()=>{
    if(servicioPrecioModel> 0 && carguilloPaleroPrecioModel >= 0 && sumaPesoBrutoModel > 0) 
      return setTotalModel(FormatteDecimal((servicioPrecioModel * sumaPesoBrutoModel) + parseFloat(carguilloPaleroPrecioModel||0) ,2))
    return setTotalModel('')
  },[servicioPrecioModel, carguilloPaleroPrecioModel, sumaPesoBrutoModel])
  const getSum=(total, num) =>{
    return total + parseFloat(num.pesoBruto)
  }
  useEffect(()=>{    
    getCarguillo()
    getListCarguilloPalero()
    if(data){
      setServicioIdModel(data.servicioTransporteId || '')
      setFechaModel(
        data.corteFecha ?  convertirFechaToYMD(data.servicioTransporteFecha) 
        : obtenerFechaLocal({ date: new Date() }).split("T")[0])
      setCarguilloIdModel(data.carguilloId || '')
      setServicioPrecioModel(data.servicioTransportePrecio || '')
      setServicioDescripcion(data.servicioTransporteEstadoDescripcion || 'Activo')
      setTicketSelected(data.servicioTransporteDetails || [])
      setCarguilloIdPaleroModel(data.carguilloIdPalero || '')
      setCarguilloPaleroPrecioModel(data.carguilloPaleroPrecio || '')
    }
  }, [])
  const getCarguillo = async() =>{
    const tipos = await getCarguilloInTickets()
    const formatter = tipos?.map(tipo =>(
      formatterDataCombo(tipo.carguilloId,tipo.carguilloTitular)))
    setCarguilloList(formatter)
  }
  const getListCarguilloPalero = async() => {
    const paleros = await searchCarguilloList({tipoCarguilloId:1, titular:'', estado: 1})
    const formatter = paleros.map(palero =>
      (formatterDataCombo(palero.carguilloId, palero.carguilloTitular)))
    setCarguilloPaleroLista(formatter)
  }
  const validarCampos = (viewPopUp = false) => {
    const nuevosErrores = {}
    if(!viewPopUp){
      if (!fechaModel) nuevosErrores.fechaModel = "El campo FECHA es obligatorio."
      if (!servicioPrecioModel) nuevosErrores.precio = "El campo PRECIO es obligatorio."
      if (!sumaPesoBrutoModel) nuevosErrores.suma = "El campo SUMA PESO BRUTO es obligatorio."
      if (!totalModel) nuevosErrores.total = "El campo TOTAL es obligatorio."
    }
    if (!carguilloIdModel) nuevosErrores.carguillo = "El campo TRANSPORTISTA es obligatorio."
  
    setErrores(nuevosErrores)

    return Object.keys(nuevosErrores).length === 0 // Solo es válido si no hay errores
  }

  const handleSelectionCarguilloChange = (option) => setCarguilloIdModel(option)
  const handleSelectionCarguilloPaleroChange = (option) => setCarguilloIdPaleroModel(option)
  const handleShowModel = () => {
    if(validarCampos(true)){
      setShowPopup(true)
    }
  }
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
  const handleGuardar = async(e)=>{
    e.preventDefault()
    if(validarCampos()){
      let servicioModel = {
        servicioTransporteFecha: fechaModel,
        carguilloId: carguilloIdModel,
        servicioTransportePrecio: servicioPrecioModel,
        servicioTransporteTotal: totalModel,
        servicioTransporteDetail: ticketSelected?.map(ticket => ({ticketId :ticket.id})),
        carguilloIdPalero: (carguilloIdPaleroModel==''|| isNaN(carguilloIdPaleroModel))?null:carguilloIdPaleroModel,
        carguilloPaleroPrecio: carguilloPaleroPrecioModel || null
      }
      if(servicioIdModel >0){
        servicioModel = {...servicioModel, 
          servicioTransporteId: servicioIdModel,
          servicioTransporteEstadoDescripcion: servicioDescripcion,
          userModifiedAt: obtenerFechaLocal({date: new Date()}),
          userModifiedName: "ADMIN"
        }
        // const servicioSave = await servicioTransporteSave({method:'PUT',servicioTransporte: servicioModel})
        // return onShowModel({...servicioSave,
        //   servicioTransporteFecha: convertirFechaDDMMYYYY(servicioSave.servicioTransporteFecha)
        // })
        return console.log(servicioModel)
      }      

      servicioModel.userCreatedAt= obtenerFechaLocal({date: new Date()})
      servicioModel.userCreatedName= "ADMIN"
      const servicioSave = await servicioTransporteSave({method:'POST', servicioTransporte: servicioModel})
      return onShowModel({...servicioSave,
        servicioTransporteFecha: convertirFechaDDMMYYYY(servicioSave.servicioTransporteFecha)
      })
    }
  }
  const onRowDelete= (data)=>{
    setTicketSelected(ticketSelected.filter(ticket => ticket.id !== data.id))
  }
  const handleCancelar = (e)=>{
    e.preventDefault()
    onShowModel({servicioTransporteId:0})
  }
  return (
    <>
      <SectionModel title={(data.servicioTransporteId > 0 ? 'Modificar':'Registrar') + ' Servicio Transporte'}>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 pt-3'>
          <FilterOption htmlFor={'FechaModel'} name={'Fecha'}>
            <>
              <InputDateCustom fechaValue={fechaModel}
                valueError={errores.fechaModel ? true: false}
                setFechaValue={setFechaModel}/>
              {errores.fechaModel && <p className="text-red-500 text-sm">{errores.fechaModel}</p>}
            </>
          </FilterOption>
          <FilterOption htmlFor={'CarguilloModel'} name={'Transportista'}>
            <>
              <ComboBoxCustom  initialOptions={carguilloList} selectedOption={seleccionCarguillo} 
                onSelectionChange={handleSelectionCarguilloChange}
                className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                  errores.carguillo ? "border-red-500" : ""
                }`}
                colorOptions={"text-black"}
                />
              {errores.carguillo && <p className="text-red-500 text-sm">{errores.carguillo}</p>}
            </>
          </FilterOption>
          <FilterOption htmlFor={'TransportePrecioModel'} name={'Precio'}>
            <>
              <InputDecimalCustom onChange={setServicioPrecioModel}
                valueError={errores.precio}
                placeholder={'Ejm: 10.55'} textValue={servicioPrecioModel} />
              {errores.precio && <p className="text-red-500 text-sm">{errores.precio}</p>}
            </>
          </FilterOption>
          <FilterOption htmlFor={'TransportePrecioModel'} name={'Estado'}>
            <InputTextCustom onChange={setServicioDescripcion}
              textValue={servicioDescripcion} readOnly={true} />
          </FilterOption>
          <FilterOption htmlFor={'CarguilloIdPaleroModel'} name={'Palero'}>
            <ComboBoxCustom  initialOptions={carguilloPaleroLista} selectedOption={seleccionCarguilloPalero} 
              onSelectionChange={handleSelectionCarguilloPaleroChange}
              className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                errores.carguilloIdPalero ? "border-red-500" : ""
              }`}
              colorOptions={"text-black"}
              disabled={false}
            />
        </FilterOption>
        <FilterOption htmlFor={'PrecioModel'} name={'Precio Pala'}>
            <InputTextCustom onChange={setCarguilloPaleroPrecioModel} placeholder='Ejm: 85.60'
              textValue={carguilloPaleroPrecioModel} />
          </FilterOption>
        </div>
      </SectionModel>
      <div>
    <div className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'>
      <div className='grid grid-cols-1 md:flex justify-between items-center mb-6'>
        <h2 className='pb-6 text-xl font-semibold text-gray-100 md:pb-0'>Lista de Tickets Seleccionados</h2>
        <ButtonCustom name={'Agregar'} onClick={handleShowModel} extraClassName={data.servicioTransporteId > 0 ? 'hidden' : ''}/>
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
                {data.carguilloId > 0 ?(''):(                    
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
                      {ticket.campo}
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
                  {data.carguilloId > 0 ?(''):(
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
            ): ( <NoRegistros colSpan={headers.length}/> )}
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
        {data.servicioTransporteId > 0 ?(''): (
          <FooterButton accion={handleGuardar} name={'Guardar'} />
        )}
        <FooterButton accion={handleCancelar} name={'Cancelar'} />
      </Footer>
      {showPopup ? <ServicioTransportePopup onShowModel={resspuestaShowModel} headers={headers} carguilloId={carguilloIdModel}/>    : ''}
    </>
  )
}
