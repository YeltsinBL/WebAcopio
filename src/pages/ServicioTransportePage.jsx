import { useEffect, useState } from 'react'
import { 
  ContainerPageCustom, Footer, FooterButton, Header, Main 
} from '~components/common'
import { useClosePage } from '~hooks/common'
import { 
  servicioTransporteGetById, servicioTransporteSearch 
} from '~services/servicio'
import { 
  ServicioTransporteExcelFile, ServicioTransporteFilter, ServicioTransporteModal, 
  ServicioTransporteModalDelete, ServicioTransportePdfFile, ServicioTransporteTable
} from '~components/servicioTransporte'
import { ExportToExcel, ExportToPdf } from '~components/download'
import {
  AdapterListadoServicio,
  AdapterServicioGetData,
  AdapterServicioGetDataExport
} from '~/adapters/ServicioAdapter'

const ServicioTransportePage = () => {
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
    const servicios = await servicioTransporteSearch(filters)
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
      const servicio = await servicioTransporteGetById({id:rowData.servicioId})
      setSelectedRowData(AdapterServicioGetData(servicio))
    }else setSelectedRowData(rowData)
    setShowModal(true)
  }  
  const handleSaveModel = (data) =>{
    if(data.servicioId>0){
      const existingIndex = servicioList.findIndex((item) => item.servicioId === data.servicioId)
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
            <FooterButton name={'Nuevo'} accion={handleRowSelect} />
            <FooterButton name={'Salir'} accion={handleGoBack} />
          </Footer>
        </>:        
         <ServicioTransporteModal onShowModel={handleSaveModel} data={selectedRowData}/>}
        {showModelDelete && <ServicioTransporteModalDelete data={modelDelete} onShowModel={handleShowModelDelete}/>}
      </Main>
    </ContainerPageCustom>
  )
}
export default ServicioTransportePage