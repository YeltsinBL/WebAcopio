import { useEffect, useState } from "react"
import { 
  AsignaTierraFilter, AsignaTierraForm, AsignaTierraFormDelete, AsignaTierraTable 
} from "./components"
import { 
  ContainerPageCustom, Footer, FooterButton, Header, Main 
} from "~components/common"
import { useClosePage } from "~hooks/common"
import { asignaTierraGetById, searchAsignaTierra } from "~services/asignartierra"
import { 
  obtenerFechaInicialMes, obtenerSoloFechaLocal 
} from "~utils/index"
import { AsignaTierraAdapterList } from "./adapter/AsignarTierraAdapter"

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
    getTierraAsignada({})
  }, [])
  const getTierraAsignada = async({
    uc='', ut='', fechaDesde=obtenerFechaInicialMes(), 
    fechaHasta=obtenerSoloFechaLocal({date: new Date()})
  }) => {
    const searchAsignaTierras = await searchAsignaTierra({
      uc, ut, fechaDesde, fechaHasta
    })
    setFilteredProducts(AsignaTierraAdapterList(searchAsignaTierras))
  }
  const handleDataFromChild = (data) => getTierraAsignada(data)
  // Funciones para manejar botones de la tabla
  const handleRowSelect = async(rowData) => {
    if(rowData.asignarTierraId != null) {
       const asignartierraId = await asignaTierraGetById({id:rowData.asignarTierraId})
       setSelectedRowData(asignartierraId)
    } else setSelectedRowData(null)
    setShowModal(true)
  }
  const eliminarAsigna = (data) => {
    setModalDelete(data)
    setShowModalDelete(true)
  }
  const handleShowModel = (data) => {
    if(data.asignarTierraId > 0) getTierraAsignada({})
    setShowModal(false)
  }
  const handleShowModelDelete = (data) =>{
    if(data.asignarTierraId > 0) getTierraAsignada({})
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