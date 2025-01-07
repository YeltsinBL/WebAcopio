import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { Header, Main } from "../components/common"
import { proveedorGetById, searchProveedor } from "../services/proveedor"
import { 
  ProveedorFilter, ProveedorModel, ProveedorModelDelete, ProveedorTable 
} from "../components/proveedor"

const ProveedorPage = () => {
  const navigate = useNavigate()  // Usamos el hook useNavigate para redirigir

  const handleGoBack = () => {
    navigate('/') // Redirige a la vista principal (por lo general es la ruta '/')
  }
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
    const searchProveedores = await searchProveedor(search)
    setFilteredProducts(searchProveedores || [])
  }
  // Función que se pasará al hijo
  const handleDataFromChild = (data) => {
    const {ut, nombre, estado} = data
    console.log(ut=='' && nombre=='' && estado=='')
    if(ut=='' && nombre=='' && estado==='') return getProducts()
    getProducts(data)
  }
  const handleShowModel = (data) => {
    if(data.proveedorId > 0) getProducts()    
    setShowModal(false)
  }
  // Función para manejar la selección de una fila desde la tabla
  const handleRowSelect = async(rowData) => {
    if(rowData.proveedorId != null){
      const proveedorById = await proveedorGetById({id:rowData.proveedorId})
      setSelectedRowData(proveedorById)
    }else {
      setSelectedRowData(rowData)
    }
    setShowModal(true)
  }
  // Función para eliminar un producto
  const eliminarProducto = (id) => {
    setIdModalDelete(id)
    setShowModalDelete(true)
  }
  const handleShowModelDelete = (data) =>{
    if(data.id > 0)
      getProducts()
    setShowModalDelete(false)
  }
  return (
    <div className='flex-1 overflow-auto relative z-10'>
        <Header title='Proveedor'/>
        <Main>
          {!showModal ? 
          <>
          <ProveedorFilter onUTValue={handleDataFromChild} />
          <ProveedorTable PROVEEDOR_DATA={filteredProducts} onRowSelect={handleRowSelect} eliminarProducto={eliminarProducto}/>
          <div className="flex justify-end gap-2">
            <button className="bg-[#313395] text-white py-2 px-4 rounded hover:bg-gray-700"
            onClick={handleRowSelect}>
              Nuevo
            </button>
            <button className="bg-[#313395] text-white py-2 px-4 rounded hover:bg-gray-700"
            onClick={handleGoBack} >
              Salir
            </button>
          </div>
          </>:<ProveedorModel onShowModel={handleShowModel} data={selectedRowData} /> }
          {showModalDelete ? ( <ProveedorModelDelete onShowModel={handleShowModelDelete} data={idModalDelete}/>): null}
        </Main>
    </div>
  )
}
export default ProveedorPage