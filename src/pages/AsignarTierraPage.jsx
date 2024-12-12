import { useEffect, useState } from "react"
import { Header } from "../components/common"
import { useNavigate } from "react-router-dom"
import { asignaTierraGetById, searchAsignaTierra } from "../services/asignartierra"
import { 
  AsignaTierraFilter, AsignaTierraModel, AsignaTierraModelDelete, AsignaTierraTable 
} from "../components/asignatierra"

export const AsignarTierraPage = () => {

  const navigate = useNavigate()  // Usamos el hook useNavigate para redirigir

  const handleGoBack = () => {
    navigate('/')
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
  const getProducts = async() => {
    const searchAsignaTierras = await searchAsignaTierra({})
    setFilteredProducts(searchAsignaTierras)
  }
  const handleDataFromChild = (data) => {
    const {ut, uc, fechaDesde, fechaHasta} = data
    if(ut=='' & uc=='' & fechaDesde=='' & fechaHasta==''){
      return getProducts()
    }
    const filtered = filteredProducts.filter((product) => {
      const matchesUC = uc ? product.uc.toLowerCase().includes(uc.toLowerCase()) : true
      const matchesUT = ut ? product.ut.toLowerCase().includes(ut.toLowerCase()) : true
      const matchesFechaDesde = fechaDesde ? product.fecha >= new Date(fechaDesde) : true
      const matchesFechaHasta = fechaHasta ? product.fecha <= new Date(fechaHasta) : true
      // Devuelve verdadero si el producto coincide con todos los filtros aplicados
      return matchesUC && matchesUT && matchesFechaDesde && matchesFechaHasta
    })
    setFilteredProducts(filtered)
  }
  // Funciones para manejar botones de la tabla
  const handleRowSelect = async(rowData) => {
    if(rowData.id != null) {
       const asignartierraId = await asignaTierraGetById({id:rowData.id})
       setSelectedRowData(asignartierraId)
    } else setSelectedRowData(rowData)
    setShowModal(true)
  }
  const eliminarProducto = (id) => {
    setIdModalDelete(id)
    setShowModalDelete(true)
  }
  const handleShowModel = (data) => {
    if(data.id == undefined || data.id==0) {
      return setShowModal(false)
    }
    data.fecha = new Date(`${data.fecha}T00:00:00`) // Formatear Fecha
    const existingIndex = filteredProducts.findIndex((item) => item.id === data.id)
    if (existingIndex >= 0) {
      // Reemplazar datos si el ID existe
      const updatedList = [...filteredProducts]
      updatedList[existingIndex] = data
      setFilteredProducts(updatedList)
    } else {
      setFilteredProducts([...filteredProducts, data])
    }
    setShowModal(false)
  }
  const handleShowModelDelete = (data) =>{
    if(data.id > 0) getProducts()
    setShowModalDelete(false)
  }
  return (
    <div className='flex-1 overflow-auto relative z-10'>
        <Header title='Asignar Tierras'/>
        <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
          <AsignaTierraFilter onFiltersValue={handleDataFromChild}/>
          <AsignaTierraTable AsignaTierra_DATA={filteredProducts} onRowSelect={handleRowSelect} eliminarProducto={eliminarProducto} />
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
          {showModal ? ( <AsignaTierraModel onShowModel={handleShowModel} data={selectedRowData} />  ) : null}
          {showModalDelete ? ( <AsignaTierraModelDelete onShowModel={handleShowModelDelete} data={idModalDelete}/>): null}
        </main>
    </div>
  )
}
