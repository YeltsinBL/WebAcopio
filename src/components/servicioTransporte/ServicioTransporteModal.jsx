import { useEffect, useState } from "react"
import { ComboBoxCustom, ContainerPopupCustom, FilterOption, Footer, FooterButton, InputDateCustom, InputDecimalCustom, InputNumberCustom, InputTextCustom, SectionModel, SectionModelPopup } from "../common"
import { getCarguilloInTickets } from "../../services/carguillo"
import { convertirFechaDDMMYYYY, formatterDataCombo, obtenerFechaLocal } from "../../utils"
import { servicioTransporteSave } from "../../services/serviciotransporte"

export const ServicioTransporteModal = ({onShowModel, data}) => {
  const [carguilloList, setCarguilloList] = useState([])
  const [servicioIdModel, setServicioIdModel] = useState('')
  const [fechaModel, setFechaModel] = useState('')
  const [carguilloIdModel, setCarguilloIdModel] = useState('')
  const [servicioPrecioModel, setServicioPrecioModel] = useState('')
  const [servicioCantidadTicket, setServicioCantidadTicket] = useState('')
  const [servicioDescripcion, setServicioDescripcion] = useState('')

  const [errores, setErrores] = useState({})

  const seleccionCarguillo = data.carguilloId ? {id: data.carguilloId, nombre: data.servicioTransporteCarguilloTitular } : null
  
  useEffect(()=>{    
    getCarguillo()

    if(data){
      setServicioIdModel(data.servicioTransporteId || '')
      setFechaModel(data.servicioTransporteFecha 
        || obtenerFechaLocal({ date: new Date() }).split("T")[0])
      setCarguilloIdModel(data.carguilloId || '')
      setServicioPrecioModel(data.servicioTransportePrecio || '')
      setServicioCantidadTicket(data.servicioTransporteTicketCantidad || '')
      setServicioDescripcion(data.servicioTransporteEstadoDescripcion || 'Activo')
    }
  }, [])
  const getCarguillo = async() =>{
    const tipos = await getCarguilloInTickets({
        tipoCarguilloId: 2, titular:'', estado:1
    })
    const formatter = tipos?.map(tipo =>(
      formatterDataCombo(tipo.carguilloId,tipo.carguilloTitular)))
    setCarguilloList(formatter)
  }
  const validarCampos = () => {
    const nuevosErrores = {}
    if (!fechaModel) nuevosErrores.fechaModel = "El campo FECHA es obligatorio."
    if (!carguilloIdModel) nuevosErrores.carguillo = "El campo TRANSPORTISTA es obligatorio."
    if (!servicioPrecioModel) nuevosErrores.precio = "El campo PRECIO es obligatorio."
    if (!servicioCantidadTicket) nuevosErrores.cantidad = "El campo CANTIDAD TICKET es obligatorio."
  
    setErrores(nuevosErrores)
  
    return Object.keys(nuevosErrores).length === 0 // Solo es válido si no hay errores
  }

  const handleSelectionCarguilloChange = (option) => setCarguilloIdModel(option)
  const handleGuardar = async(e)=>{
    e.preventDefault()
    if(validarCampos()){
      let servicioModel = {
        servicioTransporteFecha: fechaModel,
        carguilloId: carguilloIdModel,
        servicioTransportePrecio: servicioPrecioModel,
        servicioTransporteTicketCantidad: servicioCantidadTicket,
      }
      if(servicioIdModel >0){
        servicioModel.servicioTransporteId= servicioIdModel
        servicioModel.servicioTransporteEstadoDescripcion= servicioDescripcion
        servicioModel.userModifiedAt= obtenerFechaLocal({date: new Date()})
        servicioModel.userModifiedName= "ADMIN"
        const servicioSave = await servicioTransporteSave({method:'PUT',servicioTransporte: servicioModel})
        return onShowModel({...servicioSave,
          servicioTransporteFecha: convertirFechaDDMMYYYY(servicioSave.servicioTransporteFecha)
        })
      }      

      servicioModel.userCreatedAt= obtenerFechaLocal({date: new Date()})
      servicioModel.userCreatedName= "ADMIN"
      const servicioSave = await servicioTransporteSave({method:'POST', servicioTransporte: servicioModel})
      return onShowModel({...servicioSave,
        servicioTransporteFecha: convertirFechaDDMMYYYY(servicioSave.servicioTransporteFecha)
      })
    }
  }
  const handleCancelar = (e)=>{
    e.preventDefault()
    onShowModel({servicioTransporteId:0})
  }
  return (
    <>
      <ContainerPopupCustom >
          <SectionModelPopup title={(data.servicioTransporteId >0?'Modificar':'Registrar') +' Servicio Transporte'}>
<div className="space-y-4 p-5">

          {/*content*/}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 '>
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
              <FilterOption htmlFor={'CantidadCamionModel'} name={'Cantidad Ticket'}>
                <>
                  <InputNumberCustom onChange={setServicioCantidadTicket} textValue={servicioCantidadTicket}
                    placeholder={'Ejm: 1'} valueError={errores.cantidad} />
                  {errores.cantidad && <p className="text-red-500 text-sm">{errores.cantidad}</p>}
                </>
              </FilterOption>
              <FilterOption htmlFor={'TransportePrecioModel'} name={'Estado'}>
                <InputTextCustom onChange={setServicioDescripcion}
                  textValue={servicioDescripcion} readOnly={true} />
              </FilterOption>
            </div>
</div>
            <Footer>
              {servicioDescripcion =='Activo'? (
                <FooterButton accion={handleGuardar} name={'Guardar'} />
              ):('')}
              <FooterButton accion={handleCancelar} name={'Cancelar'} />
            </Footer>
          </SectionModelPopup>
        </ContainerPopupCustom>
    </>
  )
}
