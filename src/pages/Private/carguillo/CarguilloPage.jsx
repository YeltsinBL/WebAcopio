import { useEffect, useState } from 'react'
import { Footer, FooterButton, Header, Main } from '~components/common'
import { getCarguillobyId, searchCarguilloList } from '~services/carguillo'
import { CarguilloFilter, CarguilloForm, CarguilloTable } from './components'
import { useClosePage } from '~hooks/common'
import { toast, Toaster } from 'sonner'

const CarguilloPage = () => {
  const handleGoBack = useClosePage()
  const [carguilloList, setCarguilloList] = useState([])
  const [selectedRowData, setSelectedRowData] = useState(null)
  const [showModel, setShowModel] = useState(false)

  useEffect(()=>{
    getCarguilloTipoList()
  }, [])

  const getCarguilloTipoList = async(filters) =>{
    const toastLoadingCustom = toast.loading('Cargando...')
    const carguillos = await searchCarguilloList(filters)
    if(carguillos.result === false)
      return toast.error(carguillos.message, {id: toastLoadingCustom, style: { color:'red' }})
    toast.success(carguillos.message, {id: toastLoadingCustom})
    setCarguilloList(carguillos.data)
  }
  const handleSearchCarguilloList = (data) => {
    const { tipoCarguilloId, titular, estado } = data
    if(tipoCarguilloId == '' && titular == '' && estado == '')
        return getCarguilloTipoList()
    return getCarguilloTipoList(data)
  }
  const handleRowSelect = async(rowData) => {
    if(rowData.carguilloId != null){
      const toastLoadingCustom = toast.loading('Cargando...')
      const carguillo = await getCarguillobyId(rowData.carguilloId)
      if(carguillo.result === false)
        return toast.error(carguillo.message, {id: toastLoadingCustom, style: { color:'red' }})
      toast.success(carguillo.message, {id: toastLoadingCustom})
      setSelectedRowData(carguillo.data)
    }else setSelectedRowData(rowData)
    setShowModel(true)
  }
  const handleSaveModel =(data)=>{
    if(data.result) getCarguilloTipoList()
    setShowModel(false)
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
        <Toaster />
      </Main>
    </div>
  )
}
export default CarguilloPage