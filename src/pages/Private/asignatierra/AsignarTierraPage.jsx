import { useEffect, useState } from "react"
import { 
  AsignaTierraFilter, AsignaTierraForm, AsignaTierraFormDelete, AsignaTierraTable 
} from "./components"
import { 
  ContainerPageCustom, Footer, FooterButton, Header, Main
} from "../../../components/common"
import { useClosePage } from "../../../hooks/common"
import { asignaTierraGetById, searchAsignaTierra } from "../../../services/asignartierra"
import { convertirFechaDDMMYYYY } from "../../../utils"

const AsignarTierraPage = () => {
  const handleGoBack = useClosePage()
  /* FILTRO */
	const [filteredProducts, setFilteredProducts] = useState([])
  /*Model */
  const [showModal, setShowModal] = useState(false)
  const [selectedRowData, setSelectedRowData] = useState(null)
  const [showModalDelete, setShowModalDelete] = useState(false)
  const [modalDelete, setModalDelete] = useState(0)

  useEffect(()=> {
    getProducts()
  }, [])
  const getProducts = async(search = null) => {
    const searchAsignaTierras = await searchAsignaTierra(search)
    const formattetesorerias = searchAsignaTierras.map(asigna =>{
      return {...asigna, 
        asignarTierraFecha: convertirFechaDDMMYYYY(asigna.asignarTierraFecha)}
    })
    setFilteredProducts(formattetesorerias)
  }
  const handleDataFromChild = (data) => {
    const {ut, uc, fechaDesde, fechaHasta} = data
    if(ut=='' & uc=='' & fechaDesde=='' & fechaHasta=='')
      return getProducts()    
    getProducts(data)
  }
  // Funciones para manejar botones de la tabla
  const handleRowSelect = async(rowData) => {
    if(rowData.asignarTierraId != null) {
       const asignartierraId = await asignaTierraGetById({id:rowData.asignarTierraId})
       setSelectedRowData(asignartierraId)
    } else setSelectedRowData(rowData)
    setShowModal(true)
  }
  const eliminarAsigna = (data) => {
    setModalDelete(data)
    setShowModalDelete(true)
  }
  const handleShowModel = (data) => {
    if(data.asignarTierraId > 0) getProducts()
    setShowModal(false)
  }
  const handleShowModelDelete = (data) =>{
    if(data.asignarTierraId > 0) getProducts()
    setShowModalDelete(false)
  }
  return (
    <ContainerPageCustom>
      <Header title='Asignar Tierras'/>
      <Main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        <AsignaTierraFilter onFiltersValue={handleDataFromChild}/>
        <AsignaTierraTable AsignaTierra_DATA={filteredProducts} onRowSelect={handleRowSelect} eliminarAsigna={eliminarAsigna} />
        <Footer>
          <FooterButton name={'Nuevo'} accion={handleRowSelect} />
          <FooterButton name={'Salir'} accion={handleGoBack} />
        </Footer>
        {showModal ? ( <AsignaTierraForm onShowModel={handleShowModel} data={selectedRowData} />  ) : null}
        {showModalDelete ? ( <AsignaTierraFormDelete onShowModel={handleShowModelDelete} data={modalDelete}/>): null}
      </Main>
    </ContainerPageCustom>
  )
}
export default AsignarTierraPage