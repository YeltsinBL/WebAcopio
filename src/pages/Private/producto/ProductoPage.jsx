import { 
  ContainerPageCustom, Footer, FooterButton, Header, Main 
} from "~components/common"
import { useClosePage } from "~hooks/common"
import { 
  ProductoFilter, ProductoForm, ProductoFormDelete, ProductoTable 
} from "./components"
import { useEffect, useState } from "react"
import { productoGetById, searchProducto } from "~services/producto"
import { toast, Toaster } from "sonner"
import { ExportToExcel, ExportToPdf } from "~components/download"
import { ProductoExcel } from "./reports/ProductoExcel"
import { ProductoPdf } from "./reports/ProductoPdf"

const ProductoPage = () => {
  const handleGoBack = useClosePage()
  const [filteredUsers, setFilteredUsers] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [productData, setProductData] = useState(null)
  const [showModalDelete, setShowModalDelete] = useState(false)
  const [dataModalDelete, setDataModalDelete] = useState(0)
  
  useEffect(()=>{
    getProductos({})
  },[])
  const getProductos = async ({nombre='', estado='', stock=''}) => {
    const users = await searchProducto({nombre, estado, stock})
    setFilteredUsers(users || [])
  }
  const handleDataFromChild = (data) => {
    const {nombre, estado, stock} = data
    if(nombre==='' && estado==='' && stock ==='') return getProductos({})
    getProductos(data)
  }
  const onDelete = (data) => {
    setDataModalDelete(data)
    setShowModalDelete(true)
  }
  const handleShowModelDelete = (data) =>{
    if(data.result) getProductos({})    
    setShowModalDelete(false)
  }
  const handleRowExportExcel = async() =>{
    await ExportToExcel(ProductoExcel(filteredUsers), 'Producto')
  }
  const handleRowExportPdf = () =>{
    ExportToPdf(ProductoPdf(filteredUsers), 'Producto')
  }
  const onRowSelect = async(rowData) =>{
    if(rowData.productoId){
      const toastLoadingCustom = toast.loading('Cargando...')
      const response = await productoGetById({id:rowData.productoId})
      if(response.result === false)
        return toast.error(response.message, {id: toastLoadingCustom, style: { color:'red' }})
      toast.success(response.message, {id: toastLoadingCustom})
      setProductData(response.data)
    } else setProductData(null)
    setShowModal(true)
  }
  const handleShowModel = (data) => {
    if(data.result) getProductos({})
    setShowModal(false)
  }
  return (
    <ContainerPageCustom>
      <Header title={'Producto'} />
      <Main>
      <ProductoFilter onProductFilters={handleDataFromChild} />
      <ProductoTable data={filteredUsers} onRowSelect={onRowSelect} onDelete={onDelete}/>
      <Footer>
        <FooterButton name={'Excel'} accion={handleRowExportExcel}/>
        <FooterButton name={'PDF'} accion={handleRowExportPdf}/>
        <FooterButton name={'Nuevo'} accion={onRowSelect} />
        <FooterButton name={'Salir'} accion={handleGoBack} />
      </Footer>
      {showModal && (<ProductoForm data={productData} onShowModel={handleShowModel} />)}
      {showModalDelete ? <ProductoFormDelete onShowModel={handleShowModelDelete} data={dataModalDelete} /> :'' }
      <Toaster />
      </Main>
    </ContainerPageCustom>
  )
}
export default ProductoPage