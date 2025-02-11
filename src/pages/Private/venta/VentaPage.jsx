import { useEffect, useState } from "react"
import { toast, Toaster } from "sonner"
import { 
  ContainerPageCustom, Footer, FooterButton, Header, Main 
} from "~components/common"
import { 
  VentaFilter, VentaForm, VentaFormDelete, VentaTable 
} from "./components"
import { searchVenta, ventaGetById } from "~services/venta"
import { 
  ventaAdapterGetData, ventaAdapterList 
} from "./adapter/VentaAdapter"
import { useClosePage } from "~hooks/common"
import { ExportToExcel, ExportToPdf } from "~components/download"
import { VentaExcelFile, VentaPdfFile } from "./reports"

const VentaPage = () => {
  const handleGoBack = useClosePage()
  const [showModel, setShowModel] = useState(true)
  const [selectedRowData, setSelectedRowData] = useState(null)
  const [showModalDelete, setShowModalDelete] = useState(false)
  const [modalDelete, setModalDelete] = useState({})
  
  const [ventaList, setVentaList] = useState([])

  useEffect(() => {
    getventa()
  }, [])
  const getventa = async(filter) => {
    const ventas = await searchVenta(filter)
    setVentaList(ventaAdapterList(ventas)|| [])
  }
  const handleDataFromChild = (data) => {
    const { 
      fechaDesde, fechaHasta, tipoVentaId, numeroComprobante, estadoId 
    } = data
    if(fechaDesde=='' && fechaHasta=='' && tipoVentaId=='' && numeroComprobante=='' && estadoId=='' ){
      return getventa()
    }
    return getventa({fechaDesde, fechaHasta, tipoVentaId, numeroComprobante, estadoId})
  }
  // Obtener
  const handleRowSelect = async(rowData) => {
    if(rowData.ventaId != null){
      const venta = await ventaGetById({id:rowData.ventaId})
      if(venta.result){
        setSelectedRowData(ventaAdapterGetData(venta.data))
      }else return toast.error(venta.message)
    }else setSelectedRowData(null)  
    setShowModel(false)
  }
  // Guardar
  const handleShowModel = (data) => {
    if(data.result){ 
      toast.success(data.message)
      getventa()
    }
    setShowModel(true)
  }
  // Eliminar
  const eliminarTicket = (data) => {
    setModalDelete(data)
    setShowModalDelete(true)
  }
  const handleShowModelDelete = (data) =>{
    if(data.result){ 
      toast.success(data.message)
      getventa()
    }
    setShowModalDelete(false)
  }
  const handleRowExportExcel = async(ventaId) =>{
    const venta = await ventaGetById({id: ventaId})
    await ExportToExcel(
      VentaExcelFile(ventaAdapterGetData(venta.data)),
      'VentaReporte'
    )
  }
  const handleRowExportPdf = async(ventaId) =>{
    const venta = await ventaGetById({id: ventaId})
    ExportToPdf(
      VentaPdfFile(ventaAdapterGetData(venta.data)), 
      'VentaReporte'
    )
  }
  return (
    <ContainerPageCustom>
      <Header title='Venta'/>
      <Main>
        {showModel ?
          <>
          <VentaFilter onFiltersValue={handleDataFromChild}/>
          <VentaTable data={ventaList} onRowSelect={handleRowSelect} onDeleteSelect={eliminarTicket} 
            exportExcel={handleRowExportExcel} exportPdf={handleRowExportPdf} />    
          <Footer>
              <FooterButton accion={handleRowSelect} name={"Nuevo"}/>
              <FooterButton accion={handleGoBack} name={"Salir"}/>
          </Footer>
          </>:
          <VentaForm onShowModel={handleShowModel} data={selectedRowData}/>        
        }       
        {showModalDelete ? <VentaFormDelete onShowModel={handleShowModelDelete} data={modalDelete}/> : ''}
        <Toaster />
      </Main>
    </ContainerPageCustom>
  )
}
export default VentaPage