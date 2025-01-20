import { useEffect, useState } from "react"
import { useClosePage } from "~hooks/common"
import { 
  ContainerPageCustom, Footer, FooterButton, Header, Main 
} from "~components/common"
import { 
  servicioPaleroGetById, servicioPaleroSearch 
} from "~services/servicio"
import { 
  AdapterListadoServicioTransporte, AdapterServicioGetData,
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
    setServicioList(AdapterListadoServicioTransporte(servicios))
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
    if(rowData.servicioTransporteId){
      const servicio = await servicioPaleroGetById({id:rowData.servicioTransporteId})
      setSelectedRowData(AdapterServicioGetData(servicio))
    }else setSelectedRowData(rowData)
    setShowModal(true)
  }  
  const handleSaveModel = (data) =>{
    if(data.servicioTransporteId>0){
      const existingIndex = servicioList.findIndex((item) => item.servicioTransporteId === data.servicioTransporteId)
      if (existingIndex >= 0) {
        const updatedList = [...servicioList]
        updatedList[existingIndex] = data
        setServicioList(updatedList)
      } else setServicioList([...servicioList, data])
    }
    setShowModal(false)
  }
  const handleRowDelete = (data) =>{
    setModelDelete(data)
    setShowModelDelete(true)
  }
  const handleShowModelDelete = (servicioId) =>{
    if(servicioId > 0) getServicios()
    setShowModelDelete(false)
  }
  const handleRowExportExcel = async(servicioId) =>{
    const servicio = await servicioPaleroGetById({id: servicioId})
    await ExportToExcel(
      ServicioPaleroExcelFile(AdapterServicioGetDataExport(servicio)),
      'ServicioPaleroReporte'
    )
  }
  const handleRowExportPdf = async(servicioId) =>{
    const servicio = await servicioPaleroGetById({id: servicioId})
    ExportToPdf(
      ServicioPaleroPdfFile(AdapterServicioGetDataExport(servicio)), 
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
      </Main>
    </ContainerPageCustom>
  )
}
export default ServicioPaleroPage