import { 
  ContainerPageCustom, Footer, FooterButton, Header, Main 
} from "~components/common"
import { 
  DistribuidorFilter, DistribuidorFormDelete, DistribuidorTable 
} from "./components"
import { toast, Toaster } from "sonner"
import { useClosePage } from "~hooks/common"
import { searchDistribuidor } from "~services/distribuidor"
import { useEffect, useState } from "react"

const DistribuidorPage = () => {
  const handleGoBack = useClosePage()
  const [filteredUsers, setFilteredUsers] = useState([])
  const [showModalDelete, setShowModalDelete] = useState(null)
  const [dataModalDelete, setDataModalDelete] = useState(0)
  useEffect(()=>{
    getDistribuidores()
  },[])
  const getDistribuidores = async (search=null) => {
    const users = await searchDistribuidor(search)
    setFilteredUsers(users || [])
  }
  const handleDataFromChild = (data) => {
    const {ruc, name, estado} = data
    if(ruc=='' && name=='' && estado==='') return getDistribuidores()
    getDistribuidores(data)
  }
  const handleSaveModel = (data) => {
    if(data.result) {
      toast.success(data.message)
      getDistribuidores()
    }
  }
  const onDelete = (data) => {
    setDataModalDelete(data)
    setShowModalDelete(true)
  }
  const handleShowModelDelete = (data) =>{
    if(data.result) {
      toast.success(data.message)
      getDistribuidores()
    }
    setShowModalDelete(false)
  }
  return (
    <ContainerPageCustom>
      <Header title={'Distribuidor'} />
      <Main>
        <DistribuidorFilter onDistribuidorFilters={handleDataFromChild} />
        <DistribuidorTable data={filteredUsers} onSave={handleSaveModel} onDelete={onDelete}/>
        <Footer>
            <FooterButton name={'Salir'} accion={handleGoBack} />
        </Footer>
        {showModalDelete ? <DistribuidorFormDelete onShowModel={handleShowModelDelete} data={dataModalDelete} /> :'' }
        <Toaster />
      </Main>
    </ContainerPageCustom>
  )
}
export default DistribuidorPage