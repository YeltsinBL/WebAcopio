import { useEffect, useState } from "react"
import { toast, Toaster } from "sonner"
import { useClosePage } from "~hooks/common"
import { 
  ContainerPageCustom, Footer, FooterButton, Header, Main 
} from "~components/common"
import { 
  servicioPaleroGetById, servicioPaleroSearch 
} from "~services/servicio"
import { 
  AdapterListadoServicio, AdapterServicioGetData,
  AdapterServicioGetDataExport
} from "~/adapters/ServicioAdapter"
import { 
  ServicioPaleroExcelFile, ServicioPaleroFilter, ServicioPaleroForm, 
  ServicioPaleroFormDelete, ServicioPaleroPdfFile, ServicioPaleroTable 
} from "./components"
import { ExportToExcel, ExportToPdf } from "~components/download"

const ServicioPaleroPage = () => {
const handleGoBack = useClosePage()
  const [servicioList, setServicioList] = useState([])
  const [selectedRowData, setSelectedRowData] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showModelDelete, setShowModelDelete] = useState(false)
  const [modelDelete, setModelDelete] = useState(false)
  
  useEffect(()=>{
    getServicios()
  },[])
  const getServicios = async(filters) =>{
    const servicios = await servicioPaleroSearch(filters)
    setServicioList(AdapterListadoServicio(servicios))
  }
  const handleDataFromChild = (data)=>{
    const {
      fechaDesdeFilter, fechaHastaFilter, carguilloFilter, estadoFilter
    } = data
    if(fechaDesdeFilter=='' && fechaHastaFilter=='' && carguilloFilter =='' && estadoFilter=='')
      return getServicios()
    return getServicios({fechaDesdeFilter, fechaHastaFilter, carguilloFilter, estadoFilter})
  }
  const handleRowSelect = async(rowData) =>{
    if(rowData.servicioId){
      const toastLoadingCustom = toast.loading('Cargando...')
      const servicio = await servicioPaleroGetById({id:rowData.servicioId})
      if(!servicio.result)
        return toast.error(servicio.message, { id: toastLoadingCustom, style: { color:'red' }})
      toast.success(servicio.message, {id: toastLoadingCustom})
      setSelectedRowData(AdapterServicioGetData(servicio.data))
      setShowModal(true)
    }else {
      setSelectedRowData(null)
      setShowModal(true)
    }
  }  
  const handleSaveModel = (data) =>{
    if(data.result) getServicios()    
    setShowModal(false)
  }
  const handleRowDelete = (data) =>{
    setModelDelete(data)
    setShowModelDelete(true)
  }
  const handleShowModelDelete = (data) =>{
    if(data.result) getServicios()    
    setShowModelDelete(false)
  }
  const handleRowExportExcel = async(servicioId) =>{
    const servicio = await servicioPaleroGetById({id: servicioId})
    await ExportToExcel(
      ServicioPaleroExcelFile(AdapterServicioGetDataExport(servicio.data)),
      'ServicioPaleroReporte'
    )
  }
  const handleRowExportPdf = async(servicioId) =>{
    const servicio = await servicioPaleroGetById({id: servicioId})
    ExportToPdf(
      ServicioPaleroPdfFile(AdapterServicioGetDataExport(servicio.data)), 
      'ServicioPaleroReporte'
    )
  }
  return (
    <ContainerPageCustom>
      <Header title={'Servicio Palero'}/>
      <Main>
        {!showModal ?
        <>
          <ServicioPaleroFilter onFiltersValue={handleDataFromChild} />
          <ServicioPaleroTable data={servicioList} onRowSelect={handleRowSelect} onRowDelete={handleRowDelete} 
            exportExcel={handleRowExportExcel} exportPdf={handleRowExportPdf} /> 
          <Footer>
            <FooterButton name={'Nuevo'} accion={handleRowSelect} />
            <FooterButton name={'Salir'} accion={handleGoBack} />
          </Footer>
        </>:        
         <ServicioPaleroForm onShowModel={handleSaveModel} data={selectedRowData}/>}
        {showModelDelete && <ServicioPaleroFormDelete data={modelDelete} onShowModel={handleShowModelDelete}/>}
        <Toaster />
      </Main>
    </ContainerPageCustom>
  )
}
export default ServicioPaleroPage