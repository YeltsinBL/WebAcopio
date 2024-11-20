import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import Header from "../components/common/Header"
import ProveedorFilter from "../components/proveedor/ProveedorFilter"
import ProveedorTable from "../components/proveedor/ProveedorTable"
import ProveedorModel from "../components/proveedor/ProveedorModel"
import ProveedorModelDelete from "../components/proveedor/ProveedorModelDelete"


const PRODUCT_DATA = [
  { id: 1, ut: "UT123", dni: "12345678", nombre: "Juan", apellidoPaterno:'Pérez',apellidoMaterno:'Leon', activo: true },
  { id: 2, ut: "UT456", dni: "87654320", nombre: "María", apellidoPaterno:'Gómez',apellidoMaterno:'Gómez', activo: false },
  { id: 3, ut: "UT125", dni: "12345671", nombre: "Juan", apellidoPaterno:'Pérez',apellidoMaterno:'Leon', activo: true },
  { id: 4, ut: "UT455", dni: "87654322", nombre: "María", apellidoPaterno:'Gómez',apellidoMaterno:'Gómez', activo: false },
  { id: 5, ut: "UT126", dni: "12345673", nombre: "Juan", apellidoPaterno:'Pérez',apellidoMaterno:'Leon', activo: true },
  { id: 6, ut: "UT457", dni: "87654324", nombre: "María", apellidoPaterno:'Gómez',apellidoMaterno:'Gómez', activo: false },
  { id: 7, ut: "UT128", dni: "12345675", nombre: "Juan", apellidoPaterno:'Pérez',apellidoMaterno:'Leon', activo: true },
  { id: 8, ut: "UT459", dni: "87654326", nombre: "María", apellidoPaterno:'Gómez',apellidoMaterno:'Gómez', activo: false },
  { id: 9, ut: "UT121", dni: "12345677", nombre: "Juan", apellidoPaterno:'Pérez',apellidoMaterno:'Leon', activo: true },
  { id: 10, ut: "UT452", dni: "87654329", nombre: "María", apellidoPaterno:'Gómez',apellidoMaterno:'Gómez', activo: false },
]

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
  const getProducts = () => {
    setFilteredProducts(PRODUCT_DATA)
  }
  // Función que se pasará al hijo
  const handleDataFromChild = (data) => {
    const {ut, dni, nombre} = data
    if(ut=='' & dni=='' & nombre==''){
      return getProducts()
    }
    const filtered = PRODUCT_DATA.filter((product) => {
      const matchesUT = ut ? product.ut.toLowerCase().includes(ut.toLowerCase()) : true
      const matchesDNI = dni ? product.dni.toLowerCase().includes(dni.toLowerCase()) : true
      const matchesNombre = nombre
        ? product.nombre.toLowerCase().includes(nombre.toLowerCase()) ||
          product.apellidoPaterno.toLowerCase().includes(nombre.toLowerCase()) ||
          product.apellidoMaterno.toLowerCase().includes(nombre.toLowerCase())
        : true
  
      // Devuelve verdadero si el producto coincide con todos los filtros aplicados
      return matchesUT && matchesDNI && matchesNombre
    })
    setFilteredProducts(filtered)
  }
  const handleShowModel = (data) => {
    if(data.id == undefined) {
      return setShowModal(false)
    }
    const existingIndex = filteredProducts.findIndex((item) => item.id === data.id)
    if (existingIndex >= 0) {
      // Reemplazar datos si el ID existe
      const updatedList = [...filteredProducts]
      updatedList[existingIndex] = data
      setFilteredProducts(updatedList)
    } else {
      // PRODUCT_DATA.push(data)
      setFilteredProducts([...filteredProducts, data])
    }
    setShowModal(false)
  }
  // Función para manejar la selección de una fila desde la tabla
  const handleRowSelect = (rowData) => {
    setSelectedRowData(rowData)
    setShowModal(true)
  }
  // Función para eliminar un producto
  const eliminarProducto = (id) => {
    setIdModalDelete(id)
    setShowModalDelete(true)
  }
  const handleShowModelDelete = (data) =>{
    if(data.id == 0) return setShowModalDelete(false)
    setFilteredProducts(filteredProducts.filter(producto => producto.id !== data.id))
    setShowModalDelete(false)
  }
  return (
    <div className='flex-1 overflow-auto relative z-10'>
        <Header title='Proveedor'/>
        <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
          <ProveedorFilter onUTValue={handleDataFromChild} />
          <ProveedorTable PRODUCT_DATA={filteredProducts} onRowSelect={handleRowSelect} eliminarProducto={eliminarProducto}/>
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
          {showModal ? ( <ProveedorModel onShowModel={handleShowModel} data={selectedRowData} />  ) : null}
          {showModalDelete ? ( <ProveedorModelDelete onShowModel={handleShowModelDelete} data={idModalDelete}/>): null}
        </main>
    </div>
  )
}

export default ProveedorPage