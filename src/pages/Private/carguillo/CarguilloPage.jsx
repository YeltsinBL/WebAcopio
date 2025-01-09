import { useEffect, useState } from 'react'
import { Footer, FooterButton, Header, Main } from '../../../components/common'
import { getCarguillobyId, searchCarguilloList } from '../../../services/carguillo'
import { CarguilloFilter, CarguilloForm, CarguilloTable } from './components'
import { useNavigate } from 'react-router-dom'

const CarguilloPage = () => {
  const navigate = useNavigate()
  const [carguilloList, setCarguilloList] = useState([])
  const [selectedRowData, setSelectedRowData] = useState(null)
  const [showModel, setShowModel] = useState(false)

  useEffect(()=>{
    getCarguilloTipoList()
  }, [])

  const getCarguilloTipoList = async(filters) =>{
    const carguillos = await searchCarguilloList(filters)
    setCarguilloList(carguillos)
  }
  const handleSearchCarguilloList = (data) => {
    const { tipoCarguilloId, titular, estado } = data
    if(tipoCarguilloId == '' && titular == '' && estado == '')
        return getCarguilloTipoList()
    return getCarguilloTipoList(data)
  }
  const handleRowSelect = async(rowData) => {
    if(rowData.carguilloId != null){
        const carguillo = await getCarguillobyId(rowData.carguilloId)
        setSelectedRowData(carguillo)
    }else setSelectedRowData(rowData)
    setShowModel(true)
  }
  const handleSaveModel =(data)=>{
    if(data.carguilloId > 0) {
      const existIndex = carguilloList.findIndex((item) => item.carguilloId === data.carguilloId)
      if(existIndex >= 0) {
        const updatedList = [...carguilloList]
        updatedList[existIndex] = data
        setCarguilloList(updatedList)
      } else setCarguilloList([...carguilloList, data])
    }
    setShowModel(false)
  }
  const handleGoBack = () => {
    navigate('/')
  }
  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title={'Carguillo'} />
      <Main>
        {!showModel ? 
        <>
          <CarguilloFilter onFiltersValue={handleSearchCarguilloList}/>
          <CarguilloTable data={carguilloList} onRowSelect={handleRowSelect}/>
          <Footer>
            <FooterButton name={'Nuevo'} accion={handleRowSelect} />
            <FooterButton name={'Salir'} accion={handleGoBack} />
          </Footer>
        </>:
        <CarguilloForm onShowModel={handleSaveModel} data={selectedRowData}/>
        }
      </Main>
    </div>
  )
}
export default CarguilloPage