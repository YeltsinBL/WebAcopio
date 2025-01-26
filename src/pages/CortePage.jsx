import { useEffect, useState } from 'react'
import { useClosePage } from '~hooks/common'
import { 
  ContainerPageCustom, Footer, FooterButton, Header, Main 
} from '~components/common'
import { 
  CorteFilter, CorteModel, CorteTable ,CorteModelDelete,
  CorteExcelFile, CortePdfFile
} from '~components/corte'
import { ExportToExcel, ExportToPdf } from '~components/download'
import { corteGetById, searchCortes } from '~services/corte'
import { toast, Toaster } from 'sonner'

const CortePage = () => {
  const handleGoBack = useClosePage()
  const [corteList, setCorteList] = useState([])
  const [showModel, setShowModel] = useState(false)
  const [selectedRowData, setSelectedRowData] = useState(null)
  const [showModelDelete, setShowModelDelete] = useState(false)
  const [modelDataDelete, setModelDataDelete] = useState(false)
  useEffect(() => {
    getCortes()
  },[])
  const getCortes = async(filter=null) =>{
    const tickets = await searchCortes(filter)
    setCorteList(tickets || [])
  }
  const handleDataFromChild = (data) => {
    const {
      tierraId, fechaDesde, fechaHasta, estadoId
    } = data
    if(tierraId=='' && fechaDesde=='' && fechaHasta=='' && estadoId==''){
      return getCortes()
    }
    return getCortes({tierraId, fechaDesde, fechaHasta, estadoId})
  }
  const handleRowSelect = async(rowData) => {
    if(rowData.corteId != null){
      const resp = await corteGetById({id: rowData.corteId})
      setSelectedRowData(resp)
    }else setSelectedRowData(rowData)  
    setShowModel(true)
  }
  const handleShowModel = (data) => {
    if(data.result) {
      toast.success(data.errorMessage)
      getCortes()
    }
    setShowModel(false)
  }
  const handleRowExportExcel = async(corteId) =>{
    const corte = await corteGetById({id: corteId})
    await ExportToExcel(CorteExcelFile(corte), 'CorteReporte')
  }
  const handleRowExportPdf = async(corteId) =>{
    const corte = await corteGetById({id: corteId})
    ExportToPdf(CortePdfFile(corte), 'CortePdf')
  }
  const handleRowDelete = (data) =>{
    setModelDataDelete(data)
    setShowModelDelete(true)
  }
  const handleShowModelDelete = (data) =>{
    if(data.result){
      toast.success(data.errorMessage)
      getCortes()
    }
    setShowModelDelete(false)
  }
  return (
    <ContainerPageCustom>
      <Header title={'Corte'} />
      <Main>
        {!showModel ?
          <>
            <CorteFilter onFiltersValue={handleDataFromChild}/>
            <CorteTable CORTE_DATA={corteList} onRowSelect={handleRowSelect} onRowDelete={handleRowDelete} exportExcel={handleRowExportExcel} exporPdf={handleRowExportPdf} />
            <Footer>
              <FooterButton name={'Nuevo'} accion={handleRowSelect} /> 
              <FooterButton name={'Salir'} accion={handleGoBack} /> 
            </Footer>
          </>:
          <CorteModel onShowModel={handleShowModel} data={selectedRowData}/>
        }
        {showModelDelete ? <CorteModelDelete onShowModel={handleShowModelDelete} data={modelDataDelete} /> :'' }
        <Toaster />
      </Main>
    </ContainerPageCustom>
  )
}
export default CortePage