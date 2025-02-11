import { 
  ContainerPageCustom, Footer, FooterButton, Header, Main 
} from "~components/common"
import { useClosePage } from "~hooks/common"
import { 
  ProductoFilter, ProductoFormDelete, ProductoTable 
} from "./components"
import { useEffect, useState } from "react"
import { searchProducto } from "~services/producto"
import { toast, Toaster } from "sonner"
import { ExportToExcel, ExportToPdf } from "~components/download"
import { ProductoExcel } from "./reports/ProductoExcel"
import { ProductoPdf } from "./reports/ProductoPdf"

const ProductoPage = () => {
  const handleGoBack = useClosePage()
  const [filteredUsers, setFilteredUsers] = useState([])
  const [showModalDelete, setShowModalDelete] = useState(null)
  const [dataModalDelete, setDataModalDelete] = useState(0)
  
  useEffect(()=>{
    getProductos()
  },[])
  const getProductos = async (search=null) => {
    const users = await searchProducto(search)
    setFilteredUsers(users || [])
  }
  const handleDataFromChild = (data) => {
    const {name, estado, stock} = data
    if(name=='' && estado==='' && stock ==='') return getProductos()
    getProductos(data)
  }
  const handleSaveModel = (data) => {
    if(data.result) {
      toast.success(data.message)
      getProductos()
    }
  }
  const onDelete = (data) => {
    setDataModalDelete(data)
    setShowModalDelete(true)
  }
  const handleShowModelDelete = (data) =>{
    if(data.result) {
      toast.success(data.message)
      getProductos()
    }
    setShowModalDelete(false)
  }
  const handleRowExportExcel = async() =>{
    await ExportToExcel(ProductoExcel(filteredUsers), 'Producto')
  }
  const handleRowExportPdf = () =>{
    ExportToPdf(ProductoPdf(filteredUsers), 'Producto')
  }
  return (
    <ContainerPageCustom>
      <Header title={'Producto'} />
      <Main>
      <ProductoFilter onProductFilters={handleDataFromChild} />
      <ProductoTable data={filteredUsers} onSave={handleSaveModel} onDelete={onDelete}/>
      <Footer>
      <FooterButton name={'Excel'} accion={handleRowExportExcel}/>
      <FooterButton name={'PDF'} accion={handleRowExportPdf}/>
        <FooterButton name={'Salir'} accion={handleGoBack} />
      </Footer>
      {showModalDelete ? <ProductoFormDelete onShowModel={handleShowModelDelete} data={dataModalDelete} /> :'' }
      <Toaster />
      </Main>
    </ContainerPageCustom>
  )
}
export default ProductoPage