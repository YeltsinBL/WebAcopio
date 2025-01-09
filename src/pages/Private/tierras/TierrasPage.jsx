import { useEffect, useState } from "react"
import { 
  ContainerPageCustom, Footer, FooterButton, Header,
  Main
} from "../../../components/common"
import { 
  searchTierras, tierraGetById
} from "../../../services/tierra"
import { useClosePage } from "../../../hooks/common"
import { 
  TierraFilter, TierraForm, TierraFormDelete, TierrasTable 
} from "./components"

const TierrasPage = () => {
  const handleGoBack = useClosePage()
  /* FILTRO */
	const [filteredTierras, setFilteredTierras] = useState([])
  /*Model */
  const [showModal, setShowModal] = useState(false)
  const [selectedRowData, setSelectedRowData] = useState(null)
  const [showModalDelete, setShowModalDelete] = useState(false)
  const [dataModalDelete, setModalDelete] = useState({})

  useEffect(()=> {
    getTierras()
  }, [])
  const getTierras = async (search= null) => {
    const searchTierra = await searchTierras(search)
    setFilteredTierras(searchTierra)
  }
  const handleDataFromChild = (data) => {
    const {uc, campo, sector, valle} = data
    if(uc=='' && campo=='' && sector=='' && valle == '')
      return getTierras()    
    getTierras(data)
  }
  const handleShowModel = (data) => {
    if(data.tierraId > 0) getTierras()
    setShowModal(false)
  }
  // Función para manejar la selección de una fila desde la tabla
  const handleRowSelect = async(rowData) => {
    if(rowData.tierraId != null){
      const tierraById = await tierraGetById({id:rowData.tierraId})
      setSelectedRowData(tierraById)
    }else 
      setSelectedRowData(null)
    setShowModal(true)
  }
  // Función para eliminar un producto
  const eliminarProducto = (data) => {
    setModalDelete(data)
    setShowModalDelete(true)
  }
  const handleShowModelDelete = (data) =>{
    if(data.tierraId > 0) getTierras()
    setShowModalDelete(false)
  }
  return (
    <ContainerPageCustom>
      <Header title='Tierras'/>
      <Main>
        <TierraFilter onFiltersValue={handleDataFromChild}/>
        <TierrasTable TIERRA_DATA={filteredTierras} onRowSelect={handleRowSelect} eliminarTierra={eliminarProducto}/>
        <Footer>
          <FooterButton name={'Nuevo'} accion={handleRowSelect} />
          <FooterButton name={'Salir'} accion={handleGoBack} />
        </Footer>
        {showModal ? ( <TierraForm onShowModel={handleShowModel} data={selectedRowData} />  ) : null}
        {showModalDelete ? ( <TierraFormDelete onShowModel={handleShowModelDelete} data={dataModalDelete}/>): null}
      </Main>
    </ContainerPageCustom>
  )
}
export default TierrasPage