import { useEffect, useState } from "react"
import { 
  ProveedorFilter, ProveedorModel, ProveedorModelDelete, ProveedorTable 
} from "./components"
import {  
  Header, Main, Footer, FooterButton, ContainerPageCustom 
} from "~components/common"
import { proveedorGetById, searchProveedor } from "~services/proveedor"
import { useClosePage } from "~hooks/common"
import { toast, Toaster } from "sonner"

const ProveedorPage = () => {
  const handleGoBack = useClosePage()
  /* FILTRO */
	const [filteredProducts, setFilteredProducts] = useState([])
  /*Model */
  const [showModal, setShowModal] = useState(false)
  const [selectedRowData, setSelectedRowData] = useState(null)
  const [showModalDelete, setShowModalDelete] = useState(false)
  const [idModalDelete, setIdModalDelete] = useState(0)

  useEffect(()=> {
    getProducts()
  }, [])
  const getProducts = async (search=null) => {
    const toastLoadingCustom = toast.loading('Cargando...');
    const searchProveedores = await searchProveedor(search)
    if(searchProveedores.result === false)
      return toast.error(
        searchProveedores.errorMessage, 
        { id: toastLoadingCustom, style: { color:'red' } }
      )
    setTimeout(() => {
      toast.dismiss(toastLoadingCustom)
    })
    setFilteredProducts(searchProveedores || [])
  }
  // Función que se pasará al hijo
  const handleDataFromChild = (data) => {
    const {ut, nombre, estado} = data
    if(ut=='' && nombre=='' && estado==='') return getProducts()
    getProducts(data)
  }
  const handleShowModel = (data) => {
    if(data.proveedorId > 0) {
      toast.success("Guardado")
      getProducts()
    }
    setShowModal(false)
  }
  // Función para manejar la selección de una fila desde la tabla
  const handleRowSelect = async(rowData) => {
    const toastLoadingCustom = toast.loading('Cargando...');
    if(rowData.proveedorId != null){
      const proveedorById = await proveedorGetById({id:rowData.proveedorId})
      if(proveedorById.result === false)
        return toast.error(proveedorById.errorMessage, {id: toastLoadingCustom, style: { color:'red' }})
      setSelectedRowData(proveedorById.data)
    }else setSelectedRowData(rowData)    
    setTimeout(() => {
      toast.dismiss(toastLoadingCustom)
    })
    setShowModal(true)
  }
  // Función para eliminar un producto
  const eliminarProducto = (id) => {
    setIdModalDelete(id)
    setShowModalDelete(true)
  }
  const handleShowModelDelete = (data) =>{
    if(data.id > 0){
      toast.success("Eliminado")
      getProducts()
    }
    setShowModalDelete(false)
  }
  return (
    <ContainerPageCustom>
        <Header title='Proveedor'/>
        <Main>
          {!showModal ? 
          <>
          <ProveedorFilter onUTValue={handleDataFromChild} />
          <ProveedorTable PROVEEDOR_DATA={filteredProducts} onRowSelect={handleRowSelect} eliminarProducto={eliminarProducto}/>
          <Footer>
            <FooterButton name={'Nuevo'} accion={handleRowSelect} />
            <FooterButton name={'Salir'} accion={handleGoBack} />
          </Footer>
          </>:<ProveedorModel onShowModel={handleShowModel} data={selectedRowData} /> }
          {showModalDelete ? ( <ProveedorModelDelete onShowModel={handleShowModelDelete} data={idModalDelete}/>): null}
          <Toaster />
        </Main>
    </ContainerPageCustom>
  )
}
export default ProveedorPage