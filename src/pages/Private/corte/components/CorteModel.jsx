import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { corteSave } from '~services/corte'
import { 
  ButtonCustom, ComboBoxCustom, FilterOption, Footer, FooterButton, 
  InputDateCustom, InputTextCustom, MessageValidationInput, 
  NoRegistros, SectionModel, TableBodyCustom, TableButton, 
  TableContainerCustom, TableFooterCustom, TableHeaderCustom,
  TableTd, TitleCustom
} from '~components/common'
import CorteTicketPopup from '~components/corte/CorteTicketPopup'
import { corteAdpterSave } from '../adapter/CorteAdapter'
import { useCorteForm, useCorteValidation } from '../hooks'

export const CorteModel = ({ onShowModel, data }) => {
  const {
    idModel, ucModel, setUcModel,
    campoModel, setCampoModel,
    fechaModel, setFechaModel,
    precioModel, setPrecioModel,
    sumaPesoBrutoModel, totalModel,
    estadoModel, proveedoresModel, setProvedoresModel,
    ticketSelected, setTicketSelected,
    showPopup, setShowPopup,
    ucLista, ucListaCombo, seleccionTierra, headers,
  } = useCorteForm(data)
  const {validate, errores} = useCorteValidation()

  const handleSelectionChange = (option) => {
    setUcModel(option)
    var uc = ucLista.find((item) => item.asignarTierraTierraId === option)
    setCampoModel(uc.tierraCampo)
    setProvedoresModel(uc.proveedoresNombres)
  }
  const handleShowModel = () => setShowPopup(true)
  const resspuestaShowModel = (data) => {
    if(data.length > 0) {
      if(ticketSelected.length > 0){
        const mergedArray = [
          ...ticketSelected,
          ...data.filter((item2) => !ticketSelected.some((item1) => item1.ticketId === item2.ticketId)),
        ]
        setTicketSelected(mergedArray)
      }else setTicketSelected(data)
    }
    setShowPopup(false)
  }
  const handleGuardar = async(e) => {
    e.preventDefault()
    const toastLoadingCustom = toast.loading('Cargando...')
    const save = {
      idModel, fechaModel, ucModel, precioModel, sumaPesoBrutoModel, 
      totalModel, ticketSelected, estadoModel
    }
    const {isValid} = validate(save)
    if(isValid){    
      const corte = await corteSave(idModel>0? 'PUT':'POST', corteAdpterSave(save))
      if(!corte.result) 
        return toast.error(corte.message, { id: toastLoadingCustom, style: { color:'red' }})
      toast.success(corte.message,{id:toastLoadingCustom})
      return onShowModel(corte)
    }
    setTimeout(() => {
      toast.dismiss(toastLoadingCustom)
    })
  }
  const handleCancelar = (e) => {
    e.preventDefault()
    onShowModel({corteId:0})
  }
  const onRowDelete= (data)=>{
    setTicketSelected(ticketSelected.filter(ticket => ticket.ticketId !== data.ticketId))
  }
  return (
    <>
    <SectionModel title={(idModel > 0 ? 'Información del': 'Registrar') + ' Corte'}>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-3'>
        <FilterOption htmlFor={'FechaModel'} name={'Fecha'}>
          <InputDateCustom fechaValue={fechaModel} setFechaValue={setFechaModel}
            valueError={errores.fecha ? true: false} readOnly={idModel > 0} />
          {errores.fecha && <MessageValidationInput mensaje={errores.fecha}/>}
        </FilterOption>           
        <FilterOption htmlFor={'UCFilter'} name={'UC'} >
          <ComboBoxCustom  initialOptions={ucListaCombo} selectedOption={seleccionTierra} 
            onSelectionChange={handleSelectionChange}
            className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
              errores.uc ? "border-red-500" : ""
            }`}
            colorOptions={"text-black"}
            allDisabled={idModel > 0 }
          />
          {errores.uc && <MessageValidationInput mensaje={errores.uc} />}
        </FilterOption>
        <FilterOption htmlFor={'CampoModel'} name={'Campo'}>
          <InputTextCustom textValue={campoModel} placeholder='Automático' readOnly/>
        </FilterOption>
        <FilterOption htmlFor={'PrecioModel'} name={'Precio Corte'}>
          <InputTextCustom textValue={precioModel} placeholder='Ejm: 85.60'
            onChange={setPrecioModel} valueError={errores.precio}
            readOnly={estadoModel != 'Activo'} />
          {errores.precio && <MessageValidationInput mensaje={errores.precio} />}
        </FilterOption>
        <FilterOption htmlFor={'EstadoModel'} name={'Estado'}>
          <InputTextCustom textValue={estadoModel} placeholder='Automático' readOnly />
        </FilterOption>
        <div className='space-y-2 md:col-span-2 lg:col-span-4 '>
          <FilterOption htmlFor="ProveedoresModel" name={'Proveedores'}>
            <InputTextCustom textValue={proveedoresModel} placeholder='Automático' readOnly />
          </FilterOption>
        </div>
      </div>        
    </SectionModel>
    <TableContainerCustom>
      <TableHeaderCustom>
        <TitleCustom titulo={'Lista de Tickets Seleccionados'} />
        <ButtonCustom name={'Agregar'} onClick={handleShowModel} extraClassName={idModel > 0 ? 'hidden' : ''} />
      </TableHeaderCustom>
      <TableBodyCustom headers={headers}>
        {ticketSelected.length > 0 ? (
          ticketSelected.map((ticket) => (
            <tr key={ticket.ticketId} >
              <TableTd hidden>{ticket.ticketId}</TableTd>
              <TableTd>{ticket.ticketIngenio}</TableTd>
              <TableTd>{ticket.ticketViaje}</TableTd>
              <TableTd>{ticket.ticketFecha}</TableTd>
              <TableTd>{ticket.ticketVehiculo}</TableTd>
              <TableTd>{ticket.ticketCamion}</TableTd>
              <TableTd>{ticket.ticketTransportista}</TableTd>
              <TableTd>{ticket.ticketVehiculoPeso}</TableTd>
              <TableTd>{ticket.ticketCamionPeso}</TableTd>
              <TableTd>{ticket.ticketPesoBruto}</TableTd>
              <TableTd>{ticket.paleroNombre}</TableTd>
              <TableTd>{ticket.ticketCampo}</TableTd>
              <TableTd>{ticket.ticketEstadoDescripcion}</TableTd>
              <TableTd hidden={idModel > 0}>
                <TableButton className='text-red-400 hover:text-red-300'
                  onRowSelect={()=>onRowDelete(ticket)} >
                  <Trash2 size={18} />
                </TableButton>
              </TableTd>                
            </tr>
          ))
        ): ( <NoRegistros colSpan={headers.length -1}/> )}
      </TableBodyCustom>
      <TableFooterCustom>  
        <FilterOption htmlFor={'PesoBrutoModel'} name={'Suma Peso Bruto'}>
          <InputTextCustom textValue={sumaPesoBrutoModel} placeholder='Automático'
            valueError={errores.suma} readOnly />
          {errores.suma && <MessageValidationInput mensaje={errores.suma} />}
        </FilterOption>
        <FilterOption htmlFor={'totalModel'} name={'Total'}>
          <InputTextCustom textValue={totalModel} placeholder='Automático'
            valueError={errores.total} readOnly />
          {errores.total && <MessageValidationInput mensaje={errores.total} />}
        </FilterOption>
      </TableFooterCustom>
	  </TableContainerCustom>

    <Footer>
      { estadoModel == 'Activo'  && (<FooterButton accion={handleGuardar} name={"Guardar"}/>) }
      <FooterButton accion={handleCancelar} name={"Cancelar"}/>
    </Footer>
    {showPopup ? <CorteTicketPopup onShowModel={resspuestaShowModel} headers={headers}/>    : ''}
    </>
  )
}
