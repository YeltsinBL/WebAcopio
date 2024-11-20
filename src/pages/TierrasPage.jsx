import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { TIERRA_DATA } from "../components/mocks/DataList"
import Header from "../components/common/Header"
import TierrasFilter from "../components/tierras/TierraFilter"
import TierrasTable from "../components/tierras/TierraTable"
import TierraModel from "../components/tierras/TierraModel"
import TierraModelDelete from "../components/tierras/TierraModelDelete"

const TierrasPage = () => {
  const navigate = useNavigate()  // Usamos el hook useNavigate para redirigir

  const handleGoBack = () => {
    navigate('/') // Redirige a la vista principal (por lo general es la ruta '/')
  }
  /* FILTRO */
	const [filteredTierras, setFilteredTierras] = useState([])
  /*Model */
  const [showModal, setShowModal] = useState(false)
  const [selectedRowData, setSelectedRowData] = useState(null)
  const [showModalDelete, setShowModalDelete] = useState(false)
  const [idModalDelete, setIdModalDelete] = useState(0)

  useEffect(()=> {
    getTierras()
  }, [])
  const getTierras = () => {
    setFilteredTierras(TIERRA_DATA)
  }
  const handleDataFromChild = (data) => {
    const {uc, campo, sector, valle} = data
    if(uc=='' & campo=='' & sector=='' & valle == ''){
      return getTierras()
    }
    const filtered = TIERRA_DATA.filter((product) => {
      const matchesUC = uc ? product.uc.toLowerCase().includes(uc.toLowerCase()) : true
      const matchesCampo = campo ? product.campo.toLowerCase().includes(campo.toLowerCase()) : true
      const matchesSector = sector ? product.sector.toLowerCase().includes(sector.toLowerCase()) : true
      const matchesValle = valle ? product.valle.toLowerCase().includes(valle.toLowerCase()) : true
  
      // Devuelve verdadero si el producto coincide con todos los filtros aplicados
      return matchesUC && matchesCampo && matchesSector && matchesValle
    })
    setFilteredTierras(filtered)
  }
  const handleShowModel = (data) => {
    if(data.id == undefined) {
      return setShowModal(false)
    }
    const existingIndex = filteredTierras.findIndex((item) => item.id === data.id)
    if (existingIndex >= 0) {
      // Reemplazar datos si el ID existe
      const updatedList = [...filteredTierras]
      updatedList[existingIndex] = data
      setFilteredTierras(updatedList)
    } else {
      setFilteredTierras([...filteredTierras, data])
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
    setFilteredTierras(filteredTierras.filter(producto => producto.id !== data.id))
    setShowModalDelete(false)
  }
  return (
    <div className='flex-1 overflow-auto relative z-10'>
        <Header title='Tierras'/>
        <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
          <TierrasFilter onFiltersValue={handleDataFromChild}/>
          <TierrasTable TIERRA_DATA={filteredTierras} onRowSelect={handleRowSelect} eliminarTierra={eliminarProducto}/>
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
          {showModal ? ( <TierraModel onShowModel={handleShowModel} data={selectedRowData} />  ) : null}
          {showModalDelete ? ( <TierraModelDelete onShowModel={handleShowModelDelete} data={idModalDelete}/>): null}
        </main>
    </div>
  )
}

export default TierrasPage