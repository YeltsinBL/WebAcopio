import { useEffect, useState } from 'react'
import { 
  ContainerPageCustom, Footer, FooterButton, Header, Main 
} from '../components/common'
import { useNavigate } from 'react-router-dom'
import { corteGetById, searchCortes } from '../services/corte'
import { 
  CorteFilter, CorteModel, CorteTable 
} from '../components/corte'
import ExportToExcel from '../components/excel/ExportToExcel'
import { CorteExcelFile } from '../components/corte/CorteExcelFile'

const CortePage = () => {
  const navigate = useNavigate()
  const [corteList, setCorteList] = useState([])
  const [showModel, setShowModel] = useState(false)
  const [selectedRowData, setSelectedRowData] = useState(null)
  // const [showModelDelete, setShowModelDelete] = useState(false)
  // const [idModelDelete, setIdModelDelete] = useState(false)
  const handleGoBack = () => {
    navigate('/')
  }
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
    if(data.corteId > 0) getCortes()
    setShowModel(false)
  }
  const handleRowExportExcel = async(corteId) =>{
    const corte = await corteGetById({id: corteId})
    await ExportToExcel(CorteExcelFile(corte), 'CorteReporte')
  }
  // const handleRowDelete = (id) =>{
  //   setIdModelDelete(id)
  //   setShowModelDelete(true)
  // }
  // const handleShowModelDelete = (data) =>{
  //   if(data.id > 0) getCortes()
  //   setShowModelDelete(false)
  // }
  return (
    <ContainerPageCustom>
      <Header title={'Corte'} />
      <Main>
        {!showModel ?
          <>
            <CorteFilter onFiltersValue={handleDataFromChild}/>
            <CorteTable CORTE_DATA={corteList} onRowSelect={handleRowSelect} exportExcel={handleRowExportExcel}/>
            <Footer>
              <FooterButton name={'Nuevo'} accion={handleRowSelect} /> 
              <FooterButton name={'Salir'} accion={handleGoBack} /> 
            </Footer>
          </>:
          <CorteModel onShowModel={handleShowModel} data={selectedRowData}/>
        }
        {/* {showModelDelete ? <CorteModelDelete onShowModel={handleShowModelDelete} data={idModelDelete} /> :'' } */}
      </Main>
    </ContainerPageCustom>
  )
}
export default CortePage