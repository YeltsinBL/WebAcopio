import { useEffect, useState } from "react"
import { 
  ContainerPageCustom, Footer, FooterButton, Header, Main
} from "../../../components/common"
import { 
  cosechaGetById, searchCosecha
} from "../../../services/cosecha"
import { 
  CosechaFilter, CosechaModel, CosechaTable
} from "./components"
import { convertirFechaDDMMYYYY } from "../../../utils"
import { useClosePage } from "../../../hooks/common"

const CosechaPage = () => {
  const handleGoBack = useClosePage()
  /* FILTRO */
	const [filteredProducts, setFilteredProducts] = useState([])
  /* Model */
  const [showModel, setShowModel] = useState(true)
  const [selectedRowData, setSelectedRowData] = useState(null)

  useEffect(()=> {
    getProducts()
  }, [])
  const getProducts = async(search=null) => {
    const cosechas = await searchCosecha(search)
    const formatteCosecha = cosechas.map(cosecha =>{
      return {...cosecha, 
        cosechaFecha: convertirFechaDDMMYYYY(cosecha.cosechaFecha)}
    })
    setFilteredProducts(formatteCosecha)
  }

  const handleDataFromChild = (data) => {
    const {ut, uc, fechaDesde, fechaHasta, tipoCosechaId} = data
    if(ut=='' && uc=='' && fechaDesde=='' && fechaHasta=='' && tipoCosechaId=='')
      return getProducts()
    return getProducts(data)
  }
  // Funciones para manejar botones de la tabla
  const handleRowSelect = async(rowData) => {
    console.log(rowData)
    if(rowData.cosechaId != null){
      const cosechaById = await cosechaGetById({id:rowData.cosechaId})
      setSelectedRowData(cosechaById)
    } else setSelectedRowData(rowData)
    setShowModel(false)
  }
  const handleShowModel = (data) => {
    if(data.id>0) getProducts()    
    setShowModel(true)
  }
  return (
    <ContainerPageCustom>
      <Header title='Cosecha'/>
      <Main>
        {showModel ? 
        <>
          <CosechaFilter onFiltersValue={handleDataFromChild} />
          <CosechaTable Cosecha_DATA={filteredProducts} onRowSelect={handleRowSelect} />
          <Footer>
            <FooterButton name={'Nuevo'} accion={handleRowSelect} />
            <FooterButton name={'Salir'} accion={handleGoBack} />
          </Footer>
        </> : 
        <CosechaModel onShowModel={handleShowModel} data={selectedRowData} />
        }
      </Main>
    </ContainerPageCustom>
  )
}
export default CosechaPage