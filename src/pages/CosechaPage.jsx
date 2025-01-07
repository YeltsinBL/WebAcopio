import { useEffect, useState } from "react"
import { Header } from "../components/common"
import { useNavigate } from "react-router-dom"
import { cosechaGetById, searchCosecha } from "../services/cosecha"
import { 
  CosechaFilter, CosechaModel, CosechaTable
} from "../components/cosecha"

const CosechaPage = () => {
  const navigate = useNavigate()  // Usamos el hook useNavigate para redirigir


  const handleGoBack = () => {
    navigate('/')
  }
  /* FILTRO */
	const [filteredProducts, setFilteredProducts] = useState([])
  /* Model */
  const [showModel, setShowModel] = useState(true)
  const [selectedRowData, setSelectedRowData] = useState(null)

  useEffect(()=> {
    getProducts()
  }, [])
  const getProducts = async() => {
    const cosechas = await searchCosecha({})
    setFilteredProducts(cosechas)
  }

  const handleDataFromChild = (data) => {
    const {ut, uc, fechaDesde, fechaHasta, cosecha} = data
    if(ut=='' & uc=='' & fechaDesde=='' & fechaHasta=='' & (cosecha=='' || isNaN(data.cosecha))){
      return getProducts()
    }
    const filtered = filteredProducts.filter((product) => {
      const matchesUC = uc ? product.uc.toLowerCase().includes(uc.toLowerCase()) : true
      const matchesUT = ut ? product.ut.toLowerCase().includes(ut.toLowerCase()) : true
      const matchesFechaDesde = fechaDesde ? product.fecha >= new Date(fechaDesde) : true
      const matchesFechaHasta = fechaHasta ? product.fecha <= new Date(fechaHasta) : true
      const matchesCosecha = cosecha ? product.tipoCosechaId == cosecha : true
      // Devuelve verdadero si el producto coincide con todos los filtros aplicados
      return matchesUC && matchesUT && matchesFechaDesde && matchesFechaHasta && matchesCosecha
    })
    setFilteredProducts(filtered)
  }
  // Funciones para manejar botones de la tabla
  const handleRowSelect = async(rowData) => {
    if(rowData.id != null){
      const cosechaById = await cosechaGetById({id:rowData.id})
      setSelectedRowData(cosechaById)
    } else setSelectedRowData(rowData)
    setShowModel(false)
  }
  const handleShowModel = (data) => {
    if(data.id==0) {
      return setShowModel(true)
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
    setShowModel(true)
  }
  return (
    <div className='flex-1 overflow-auto relative z-10'>
        <Header title='Cosecha'/>
        <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
          {showModel ? 
          <>
            <CosechaFilter onFiltersValue={handleDataFromChild} />
            <CosechaTable Cosecha_DATA={filteredProducts} onRowSelect={handleRowSelect} />
            <div className="flex justify-end gap-2">
              <button className="bg-[#313395] text-white py-2 px-4 rounded hover:bg-gray-700"
              onClick={handleRowSelect}
              >
                Nuevo
              </button>
              <button className="bg-[#313395] text-white py-2 px-4 rounded hover:bg-gray-700"
              onClick={handleGoBack} >
                Salir
              </button>
            </div>
          </> : 
          <>
            <CosechaModel onShowModel={handleShowModel} data={selectedRowData} />
          </> }
        </main>
    </div>
  )
}
export default CosechaPage