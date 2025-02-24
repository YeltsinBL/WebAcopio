import { useEffect, useState } from 'react'
import { toast, Toaster } from 'sonner'
import { 
  ContainerPageCustom, Footer, FooterButton, Header, Main 
} from '~components/common'
import { useClosePage } from '~hooks/common'
import { 
  servicioTransporteGetById, servicioTransporteSearch 
} from '~services/servicio'
import { 
  ServicioTransporteFilter, ServicioTransporteModal, 
  ServicioTransporteModalDelete, ServicioTransporteTable
} from './components'
import { ExportToExcel, ExportToPdf } from '~components/download'
import {
  AdapterListadoServicio, AdapterServicioGetData, AdapterServicioGetDataExport
} from '~/adapters/ServicioAdapter'
import { ServicioTransporteExcelFile, ServicioTransporteExcelGeneralFile, ServicioTransportePdfFile, ServicioTransportePdfGeneralFile } from './reports'
import { obtenerFechaInicialMes, obtenerSoloFechaLocal } from '~utils/index'

const ServicioTransportePage = () => {
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
    const servicios = await servicioTransporteSearch({fechaDesdeFilter,
      fechaHastaFilter, carguilloFilter, estadoFilter})
    setServicioList(AdapterListadoServicio(servicios))
  }
  const handleDataFromChild = (data)=> getServicios(data)
  
  const handleRowSelect = async(rowData) =>{
    if(rowData.servicioId){
      const servicio = await servicioTransporteGetById({id:rowData.servicioId})
      setSelectedRowData(AdapterServicioGetData(servicio))
    }else setSelectedRowData(null)
    setShowModal(true)
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
    const servicio = await servicioTransporteGetById({id: servicioId})
    await ExportToExcel(
      ServicioTransporteExcelFile(AdapterServicioGetDataExport(servicio)),
      'ServicioTransporteReporte'
    )
  }
  const handleRowExportPdf = async(servicioId) =>{
    const servicio = await servicioTransporteGetById({id: servicioId})
    ExportToPdf(
      ServicioTransportePdfFile(AdapterServicioGetDataExport(servicio)), 
      'ServicioTransporteReporte'
    )
  }
  const handleRowExportExcelGeneral = async() =>{
    await ExportToExcel(
      ServicioTransporteExcelGeneralFile(servicioList),
      'ServicioTransporteReporteGeneral'
    )
  }
  const handleRowExportPdfGeneral = async() =>{
    ExportToPdf(
      ServicioTransportePdfGeneralFile(servicioList), 
      'ServicioTransporteReporteGeneral'
    )
  }
  return (
    <ContainerPageCustom>
      <Header title={'Servicio Transporte'}/>
      <Main>
        {!showModal ?
        <>
          <ServicioTransporteFilter onFiltersValue={handleDataFromChild} />
          <ServicioTransporteTable data={servicioList} onRowSelect={handleRowSelect} onRowDelete={handleRowDelete} 
            exportExcel={handleRowExportExcel} exportPdf={handleRowExportPdf} /> 
          <Footer>
            <FooterButton name={'Excel'} accion={handleRowExportExcelGeneral} />
            <FooterButton name={'PDF'} accion={handleRowExportPdfGeneral} />
            <FooterButton name={'Nuevo'} accion={handleRowSelect} />
            <FooterButton name={'Salir'} accion={handleGoBack} />
          </Footer>
        </>:        
         <ServicioTransporteModal onShowModel={handleSaveModel} data={selectedRowData}/>}
        {showModelDelete && <ServicioTransporteModalDelete data={modelDelete} onShowModel={handleShowModelDelete}/>}
        <Toaster />
      </Main>
    </ContainerPageCustom>
  )
}
export default ServicioTransportePage