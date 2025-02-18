import { useEffect, useState } from "react"
import { ContainerPageCustom, Footer, FooterButton, Header, Main } from "~components/common"
import { useClosePage } from "~hooks/common"
import { FacturaVentaFilter, FacturaVentaForm, FacturaVentaTable } from "./components"
import { obtenerFechaInicialMes, obtenerSoloFechaLocal } from "~utils/index"
import { FacturaVentaGetById, FacturaVentaSearch } from "~services/facturaventa"
import { 
  FacturaVentaAdapterGetData, FacturaVentaAdapterList 
} from "./adapter/FacturaVentaAdapter"
import { toast, Toaster } from "sonner"

const FacturaVentaPage = () => {
  const handleGoBack = useClosePage()
  const [informeList, setInformeList] = useState([])
  const [showModel, setShowModel] = useState(true)
  const [selectedRowData, setSelectedRowData] = useState(null)
  useEffect(()=>{
    getFactura({
      fechaDesde: obtenerFechaInicialMes(), 
      fechaHasta: obtenerSoloFechaLocal({date: new Date()}), 
      numero: '', estadoId: ''})
  },[])
  const getFactura = async (filters) => {
    const facturas = await FacturaVentaSearch(filters)
    setInformeList(FacturaVentaAdapterList(facturas))
  }
  const handleDataFilter = (data) => {
    console.log(data)
    getFactura(data)
  }

  const handleRowSelect = async(rowData) => {
    if(rowData.facturaVentaId != null){
      const informe = await FacturaVentaGetById({id:rowData.facturaVentaId})
      if(informe.result){
        setSelectedRowData(FacturaVentaAdapterGetData(informe.data))
      }else return toast.error(informe.message)
    }else setSelectedRowData(null)  
    setShowModel(false)
  }
  
  const handleSaveModel = (data) => {
    if(data.result) getFactura({})    
    setShowModel(true)
  }
  const onDelete = (data) => {
   
  }
  return (
    <ContainerPageCustom>
      <Header title={'Facturación Venta'} />
      <Main>
        { showModel ?
          <>
          <FacturaVentaFilter onInformeFilters={handleDataFilter} />
          <FacturaVentaTable data={informeList} onRowSelect={handleRowSelect} onDeleteSelect={onDelete} />
          <Footer>
            <FooterButton name={'Nuevo'} accion={handleRowSelect}/>
            <FooterButton name={'Salir'} accion={handleGoBack} />
          </Footer>
          </>:
          <FacturaVentaForm onShowModel={handleSaveModel} data={selectedRowData}/>
        }
        <Toaster />
      </Main>
    </ContainerPageCustom>
  )
}
export default FacturaVentaPage