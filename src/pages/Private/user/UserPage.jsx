import { useEffect, useState } from "react";
import {
  Footer, FooterButton, Header, Main
} from "../../../components/common"
import { useClosePage } from "../../../hooks/common"
import { searchUser, userGetById } from "../../../services/user";
import { 
  UserFilter, UserModalReset, UserModel, UserModelDelete, UserTable 
} from "./components";

const UserPage =()=> {
  const handleGoBack = useClosePage()
  /* FILTRO */
  const [filteredUsers, setFilteredUsers] = useState([])
  /*Model */
  const [showModal, setShowModal] = useState(false)
  const [selectedRowData, setSelectedRowData] = useState(null)
  const [showModalDelete, setShowModalDelete] = useState(null)
  const [dataModal, setDataModal] = useState({})
  const [showModalReset, setShowModalReset] = useState(null)

  useEffect(()=>{
    getUsers()
  },[])
  const getUsers = async (search=null) => {
    const users = await searchUser(search)
    setFilteredUsers(users || [])
  }
  const handleDataFromChild = (data) => {
    const {typeUserId, name, userName, estado} = data
    if(typeUserId === '' && name==='' && userName==='' && estado==='') 
      return getUsers()
    getUsers(data)
  }
  const handleRowSelect = async(rowData) =>{
    if(rowData.userId){
      const user = await userGetById({id:rowData.userId})
      setSelectedRowData(user)
    }else setSelectedRowData(rowData)
    setShowModal(true)
  }
  const handleShowModel = (data) => {
    if(data.userId > 0) getUsers()    
    setShowModal(false)
  }
  const eliminarProducto = (data) => {
    setDataModal(data)
    setShowModalDelete(true)
  }
  const handleShowModelDelete = (userId) =>{
    if(userId > 0) getUsers()
    setShowModalDelete(false)
  }
  const resetPassword = async(user) => {    
    setDataModal(user)
    setShowModalReset(true)
  }
  const handleShowModelReset = (userId) =>{
    if(userId) getUsers()
    setShowModalReset(false)
  }
  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title={'Usuarios'} />
      <Main>
        {!showModal ?
        <>
          <UserFilter onUserValues={handleDataFromChild}/>
          <UserTable data={filteredUsers} onRowSelect={handleRowSelect} onDelete={eliminarProducto} onResetPassword={resetPassword}/>
          <Footer>
            <FooterButton name={'Nuevo'} accion={handleRowSelect} />
            <FooterButton name={'Salir'} accion={handleGoBack} />
          </Footer>
        </>:
        <UserModel onShowModel={handleShowModel} data={selectedRowData}/>}
        {showModalDelete && (<UserModelDelete onShowModel={handleShowModelDelete} data={dataModal}/>)}
        {showModalReset && (<UserModalReset onShowModel={handleShowModelReset} data={dataModal}/>)}

      </Main>
    </div>
  )
}
export default UserPage