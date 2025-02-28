import { useEffect, useState } from 'react'
import { useClosePage } from '~hooks/common'
import { 
  ContainerPageCustom, Footer, FooterButton, Header, Main 
} from '~components/common'
import { 
  CorteFilter, CorteModel, CorteTable ,CorteModelDelete
} from './components'
import { ExportToExcel, ExportToPdf } from '~components/download'
import { corteGetById, searchCortes } from '~services/corte'
import { Toaster } from 'sonner'
import { CorteExcelFile, CortePdfFile } from './reports'
import { 
  corteAdapterGetData, corteAdapterList 
} from './adapter/CorteAdapter'
import { obtenerFechaInicialMes, obtenerSoloFechaLocal } from '~utils/index'


const CortePage = () => {
  const handleGoBack = useClosePage()
  const [corteList, setCorteList] = useState([])
  const [showModel, setShowModel] = useState(false)
  const [selectedRowData, setSelectedRowData] = useState(null)
  const [showModelDelete, setShowModelDelete] = useState(false)
  const [modelDataDelete, setModelDataDelete] = useState(false)
  useEffect(() => {
    getCortes({})
  },[])
  const getCortes = async({
    fechaDesde=obtenerFechaInicialMes(), 
    fechaHasta=obtenerSoloFechaLocal({date:new Date()}), 
    tierraId='', estadoId=''
  }) =>{
    const tickets = await searchCortes({fechaDesde, fechaHasta, tierraId, estadoId})
    setCorteList(corteAdapterList(tickets) || [])
  }
  const handleDataFromChild = (data) => getCortes(data)

  const handleRowSelect = async(rowData) => {
    if(rowData.corteId != null){
      const resp = await corteGetById({id: rowData.corteId})
      setSelectedRowData(corteAdapterGetData(resp))
    }else setSelectedRowData(null)  
    setShowModel(true)
  }
  const handleShowModel = (data) => {
    if(data.result) getCortes({})
    
    setShowModel(false)
  }
  const handleRowExportExcel = async(corteId) =>{
    const corte = await corteGetById({id: corteId})
    await ExportToExcel(CorteExcelFile(corteAdapterGetData(corte)), 'CorteReporte')
  }
  const handleRowExportPdf = async(corteId) =>{
    const corte = await corteGetById({id: corteId})
    ExportToPdf(CortePdfFile(corteAdapterGetData(corte)), 'CortePdf')
  }
  const handleRowDelete = (data) =>{
    setModelDataDelete(data)
    setShowModelDelete(true)
  }
  const handleShowModelDelete = (data) =>{
    if(data.result) getCortes({})    
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