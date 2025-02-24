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
  ServicioPaleroFilter, ServicioPaleroForm, 
  ServicioPaleroFormDelete, ServicioPaleroTable 
} from "./components"
import { ExportToExcel, ExportToPdf } from "~components/download"
import { ServicioPaleroExcelFile, ServicioPaleroExcelGeneralFile, ServicioPaleroPdfFile, ServicioPaleroPdfGeneralFile } from "./reports"
import { obtenerFechaInicialMes, obtenerSoloFechaLocal } from "~utils/index"

const ServicioPaleroPage = () => {
const handleGoBack = useClosePage()
  const [servicioList, setServicioList] = useState([])
  const [selectedRowData, setSelectedRowData] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showModelDelete, setShowModelDelete] = useState(false)
  const [modelDelete, setModelDelete] = useState(false)
  
  useEffect(()=>{
    getServicios({})
  },[])
  const getServicios = async({fechaDesdeFilter= obtenerFechaInicialMes(), 
      fechaHastaFilter= obtenerSoloFechaLocal({date: new Date()}),
      carguilloFilter='', estadoFilter =''}) =>{
    const servicios = await servicioPaleroSearch({fechaDesdeFilter,
      fechaHastaFilter, carguilloFilter, estadoFilter})
    setServicioList(AdapterListadoServicio(servicios))
  }
  const handleDataFromChild = (data)=> getServicios(data)
  
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
    if(data.result) getServicios({})    
    setShowModal(false)
  }
  const handleRowDelete = (data) =>{
    setModelDelete(data)
    setShowModelDelete(true)
  }
  const handleShowModelDelete = (data) =>{
    if(data.result) getServicios({})    
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
    const handleRowExportExcelGeneral = async() =>{
      await ExportToExcel(
        ServicioPaleroExcelGeneralFile(servicioList),
        'ServicioPaleroReporteGeneral'
      )
    }
    const handleRowExportPdfGeneral = async() =>{
      ExportToPdf(
        ServicioPaleroPdfGeneralFile(servicioList), 
        'ServicioPaleroReporteGeneral'
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
            <FooterButton name={'Excel'} accion={handleRowExportExcelGeneral} />
            <FooterButton name={'PDF'} accion={handleRowExportPdfGeneral} />
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