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
import { corteAdapterSave } from '../adapter/CorteAdapter'
import { useCorteForm, useCorteValidation } from '../hooks'
import { CorteFormImage } from './CorteFormImage'
import { createImage } from '~utils/util'
import { AdvancedImage } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen'
import { scale } from '@cloudinary/url-gen/actions/resize'

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
    listaImagenes, setListaImagenes,
    showPopupImagen, setShowPopupImagen, listaImagenesFile, 
    setListaImagenesFile, listaComentarios, setListaComentarios
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
      totalModel, ticketSelected, estadoModel, listaImagenesFile,
      listaComentarios, 
    }
    const {isValid} = validate({values: save})
    if(isValid){
      const corte = await corteSave(idModel>0? 'PUT':'POST', corteAdapterSave(save))
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
  const handleShowModelImagen = (e) =>{
    e.preventDefault()
    setShowPopupImagen(true)
  }
  const responseShowModelImagen = async(data) =>{
    if(data) {
      setListaImagenesFile([...listaImagenesFile, await createImage(data.image)])
      setListaComentarios([...listaComentarios, data.comentario])
      const updatePlacaList = [...listaImagenes, { 
        imagenId: `temp-${Date.now()}`,
        imagenUrl: data.image,
        imagenComentario: data.comentario,
      }]
      setListaImagenes(updatePlacaList)
    }
    setShowPopupImagen(false)
  }
  const onRowDeleteImagen = (data) =>{
    if (typeof data.imagenId === "string" && data.imagenId.startsWith("temp")){
      // Obtener el índice de la imagen eliminada dentro de listaImagenes
      const indexToRemove = listaImagenes?.filter((item) => 
        typeof item.imagenId === "string" &&
        item.imagenId.startsWith('temp')).findIndex(item => item.imagenId === data.imagenId)
      if (indexToRemove !== -1) {
        // Eliminar la imagen de listaImagenes
        setListaImagenes(listaImagenes.filter((item) => item.imagenId !== data.imagenId))

        // Eliminar la imagen correspondiente en listaImagenesFile
        setListaImagenesFile(listaImagenesFile.filter((_, index) => index !== indexToRemove))

        // Eliminar el comentario correspondiente en listaComentarios
        setListaComentarios(listaComentarios.filter((_, index) => index !== indexToRemove))
      }
    }
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
    <TableContainerCustom>
      <TableHeaderCustom grid>
        <div className={'grid grid-cols-1 gap-6 md:flex justify-between items-center mb-6 '}>
        <TitleCustom titulo={'Lista de Imágenes'}  />  
          <ButtonCustom extraClassName={`${estadoModel == 'Anulado' ? 'hidden' : ''}`} 
            name={'Seleccionar'} onClick={handleShowModelImagen} />    
        </div>
      </TableHeaderCustom>
      <div className="w-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border border-gray-700">
        <div className="flex gap-4 pt-3 overflow-x-auto whitespace-nowrap">
        {listaImagenes.length > 0 ? (
          listaImagenes.map((imagen) => (
            <div key={imagen.imagenId} className='flex flex-col items-center min-w-[160px] mb-3'>
              {
                typeof imagen.imagenId === "string" ?
                (<img src={imagen.imagenUrl} alt={imagen.imagenComentario} className='w-40 h-52 object-cover rounded-lg' />)
                :(
                <OptimizarImagen imagenUrl={imagen.imagenUrl} imagenComentario={imagen.imagenComentario} />)
              }              
              <p className='w-40 text-left border border-red-600 text-sm break-words whitespace-normal p-1'>{imagen.imagenComentario}</p>
              { typeof imagen.imagenId === "string" &&
                <TableButton className='text-red-400 hover:text-red-300'
                  onRowSelect={()=>onRowDeleteImagen(imagen)} >
                  <Trash2 size={18} />
                </TableButton>
              }
            </div>
          ))
        ): ( <span  className="text-center py-4">No hay registros</span> )}
        </div>
      </div>
    </TableContainerCustom>
    <Footer>
      { estadoModel == 'Anulado'  || (<FooterButton accion={handleGuardar} name={"Guardar"}/>) }
      <FooterButton accion={handleCancelar} name={"Cancelar"}/>
    </Footer>
    {showPopup && <CorteTicketPopup onShowModel={resspuestaShowModel} headers={headers}/> }    
    {showPopupImagen && <CorteFormImage onImageCharge={responseShowModelImagen} />}
    </>
  )
}

const OptimizarImagen = ({imagenUrl, imagenComentario}) => {
  const parts = imagenUrl.split("/") // Divide la URL en partes por "/"
  const lastPart = parts[parts.length - 1].split(".")[0] // Obtiene la última parte sin la extensión
  const folder = parts[parts.length - 2] // Obtiene el nombre de la carpeta

  const cloudinary = new Cloudinary({ cloud: { cloudName: 'dkd0jybv9' } })
  const cld = cloudinary
    .image(`${folder}/${lastPart}`)
    .delivery('q_auto')
    .format('auto')
    .resize(scale().height(460))
 return (
  <AdvancedImage
    key={lastPart}
    width={160}
    height={160}
    cldImg={cld}
    alt={imagenComentario}
  />
 )
}