import { useEffect, useState } from "react"
import { Footer, FooterButton, Header, Main } from "../../../components/common"
import { useClosePage } from "../../../hooks/common";
import { 
    TipoUsuarioFilter, TipoUsuarioModalDelete, TipoUsuarioTable
} from "./components"
import { searchTypeUser } from "../../../services/tipousuario"

const TipoUsuarioPage = () => {
  const handleGoBack = useClosePage()

  const [filteredUsers, setFilteredUsers] = useState([])
  const [showModalDelete, setShowModalDelete] = useState(null)
  const [dataModalDelete, setDataModalDelete] = useState(0)

  useEffect(()=>{
    getTypeUsers()
  },[])
  const getTypeUsers = async (search=null) => {
    const users = await searchTypeUser(search)
    setFilteredUsers(users || [])
  }
  const handleDataFromChild = (data) => {
    const {name, estado} = data
    if(name=='' && estado==='') return getTypeUsers()
    getTypeUsers(data)
  }
  const handleSaveModel = (data) => {
    if(data.tipoUsuarioId > 0) getTypeUsers()
  }
  const onDelete = (data) => {
    setDataModalDelete(data)
    setShowModalDelete(true)
  }
  const handleShowModelDelete = (tipoUsuarioId) =>{
    if(tipoUsuarioId > 0) getTypeUsers()
    setShowModalDelete(false)
  }
  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title={'Tipo de Usuario'} />
      <Main>
        <TipoUsuarioFilter onTypeUserValues={handleDataFromChild} />
        <TipoUsuarioTable data={filteredUsers} onSave={handleSaveModel} onDelete={onDelete} />
        <Footer>
          <FooterButton name={'Salir'} accion={handleGoBack} />
        </Footer>
        {showModalDelete && (
        <TipoUsuarioModalDelete onShowModel={handleShowModelDelete} data={dataModalDelete}/>
        )}
      </Main>
    </div>
  )
}
export default TipoUsuarioPage