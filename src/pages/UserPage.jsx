import { useEffect, useState } from "react";
import { Footer, FooterButton, Header, Main } from "../components/common";
import UserFilter from "../components/user/UserFilter";
import UserTable from "../components/user/UserTable";
import { useClosePage } from "../hooks/common";
import { searchUser, userGetById } from "../services/user";
import UserModel from "../components/user/UserModel";
import UserModelDelete from "../components/user/UserModelDelete";

export const UserPage =()=> {
  const handleGoBack = useClosePage()
  /* FILTRO */
  const [filteredUsers, setFilteredUsers] = useState([])
  /*Model */
  const [showModal, setShowModal] = useState(false)
  const [selectedRowData, setSelectedRowData] = useState(null)
  const [showModalDelete, setShowModalDelete] = useState(null)
  const [dataModalDelete, setDataModalDelete] = useState(0)

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
    setDataModalDelete(data)
    setShowModalDelete(true)
  }
  const handleShowModelDelete = (userId) =>{
    if(userId > 0) getUsers()
    setShowModalDelete(false)
  }
  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title={'Usuarios'} />
      <Main>
          <UserFilter onUserValues={handleDataFromChild}/>
          <UserTable data={filteredUsers} onRowSelect={handleRowSelect} onDelete={eliminarProducto} />
          <Footer>
            <FooterButton name={'Nuevo'} accion={handleRowSelect} />
            <FooterButton name={'Salir'} accion={handleGoBack} />
          </Footer>        
        {showModal && (<UserModel onShowModel={handleShowModel} data={selectedRowData}/>)}
        {showModalDelete && (<UserModelDelete onShowModel={handleShowModelDelete} data={dataModalDelete}/>)}
      </Main>
    </div>
  )
}