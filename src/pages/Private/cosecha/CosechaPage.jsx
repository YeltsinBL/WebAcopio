import { useEffect, useState } from "react"
import { 
  ContainerPageCustom, Footer, FooterButton, Header, Main 
} from "~components/common"
import { 
  cosechaGetById, searchCosecha 
} from "~services/cosecha"
import { 
  CosechaFilter, CosechaModel, CosechaTable 
} from "./components"
import { 
  obtenerFechaInicialMes, obtenerSoloFechaLocal 
} from "~utils/index"
import { useClosePage } from "~hooks/common"
import { CosechaAdapterList } from "./adapter/CosechaAdapter"
import { toast, Toaster } from "sonner"


const CosechaPage = () => {
  const handleGoBack = useClosePage()
  /* FILTRO */
	const [filteredProducts, setFilteredProducts] = useState([])
  /* Model */
  const [showModel, setShowModel] = useState(true)
  const [selectedRowData, setSelectedRowData] = useState(null)

  useEffect(()=> {
    getProducts({})
  }, [])
  const getProducts = async({
    fechaDesde = obtenerFechaInicialMes(),
    fechaHasta = obtenerSoloFechaLocal({date: new Date()}),
    uc='', ut='', tipoCosechaId='',
  }) => {
    const toastLoadingCustom = toast.loading('Cargando...')
    const cosechas = await searchCosecha({
      fechaDesde, fechaHasta, uc, ut, tipoCosechaId
    })
    if(cosechas.result === false)
      return toast.error(cosechas.message, {id: toastLoadingCustom, style: { color:'red' }})
    toast.success(cosechas.message, {id: toastLoadingCustom})
    setFilteredProducts(CosechaAdapterList(cosechas.data))
  }

  const handleDataFromChild = (data) => getProducts(data)

  // Funciones para manejar botones de la tabla
  const handleRowSelect = async(rowData) => {
    if(rowData.cosechaId != null){
      const toastLoadingCustom = toast.loading('Cargando...')
      const cosechaById = await cosechaGetById({id:rowData.cosechaId})
      if(cosechaById.result === false)
        return toast.error(cosechaById.message, {id: toastLoadingCustom, style: { color:'red' }})
      toast.success(cosechaById.message, {id: toastLoadingCustom})
      setSelectedRowData(cosechaById.data)
    } else setSelectedRowData(null)
    setShowModel(false)
  }
  const handleShowModel = (data) => {
    if(data.result) getProducts({})    
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
        <Toaster />
      </Main>
    </ContainerPageCustom>
  )
}
export default CosechaPage