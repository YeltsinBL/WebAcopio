import { toast, Toaster } from "sonner"
import { ContainerPageCustom, Footer, FooterButton, Header, Main } from "~components/common"
import { useClosePage } from "~hooks/common"
import { 
  InformeIngresoGastoFilter, InformeIngresoGastoTable 
} from "./components"
import { useEffect, useState } from "react"
import { InformeIngresoGastoForm } from "./components/InformeIngresoGastoForm"
import { informeGetById, InformeIngresoGastoSearch } from "~services/informe"
import { InformeIngresoGastoAdapterGetData, InformeIngresoGastoAdapterList } from "./adapter/InformeIngresoGastoAdapter"
import { obtenerFechaInicialMes, obtenerSoloFechaLocal } from "~utils/index"
import { InformeIngresoGastoExcel, InformeIngresoGastoPdf } from "./reports"
import { ExportToExcel, ExportToPdf } from "~components/download"
import { InformeIngresoGastoFormDelete } from "./components/InformeIngresoGastoFormDelete"

const InformeIngresoGastoPage = () => {
  const handleGoBack = useClosePage()
  const [informeList, setInformeList] = useState([])
  const [showModel, setShowModel] = useState(true)
  const [selectedRowData, setSelectedRowData] = useState(null)
  const [showModalDelete, setShowModalDelete] = useState(false)
  const [dataModalDelete, setDataModalDelete] = useState({})
  
  useEffect(()=>{
    getInformes({})
  },[])
  const getInformes = async ({
    fechaDesde= obtenerFechaInicialMes(), 
    fechaHasta= obtenerSoloFechaLocal({date: new Date()}), 
    sembradorId= '', estadoId= ''}) => {
    const informes = await InformeIngresoGastoSearch({
      fechaDesde, fechaHasta, sembradorId, estadoId
    })
    setInformeList(InformeIngresoGastoAdapterList(informes))
  }
  const handleDataFilter = (data) => getInformes(data)

  const handleRowSelect = async(rowData) => {
    if(rowData.informeId != null){
      const informe = await informeGetById({id:rowData.informeId})
      if(informe.result){
        setSelectedRowData(InformeIngresoGastoAdapterGetData(informe.data))
      }else return toast.error(informe.message)
    }else setSelectedRowData(null)  
    setShowModel(false)
  }
  
  const handleSaveModel = (data) => {
    if(data.result) getInformes({})
    
    setShowModel(true)
  }
  const onDelete = (data) => {
    setDataModalDelete(data)
    setShowModalDelete(true)
  }
  const handleShowModelDelete = (data) =>{
    if(data.result) getInformes({})    
    setShowModalDelete(false)
  }
  const handleRowExportExcel = async(informeId) =>{
    const toastLoadingCustom = toast.loading('Cargando...')
    const informe = await informeGetById({id: informeId})
    await ExportToExcel(InformeIngresoGastoExcel(
      InformeIngresoGastoAdapterGetData(informe.data)),
     'ReporteInformeIngersoGasto')
    toast.success("Reporte Generado",{id: toastLoadingCustom})
  }
  const handleRowExportPdf = async(informeId) =>{    
    const toastLoadingCustom = toast.loading('Cargando...')
    const informe = await informeGetById({id: informeId})
    ExportToPdf(InformeIngresoGastoPdf(
      InformeIngresoGastoAdapterGetData(informe.data)),
      'ReporteInformeIngersoGasto'
    )
    toast.success("Reporte Generado",{id: toastLoadingCustom})
  }
  return (
    <ContainerPageCustom>
      <Header title={'Informe Ingresos y Gastos'} />
      <Main>
        { showModel ?
          <>
          <InformeIngresoGastoFilter onInformeFilters={handleDataFilter} />
          <InformeIngresoGastoTable data={informeList} onRowSelect={handleRowSelect} onDeleteSelect={onDelete} 
              exportExcel={handleRowExportExcel} exportPdf={handleRowExportPdf}/>
          <Footer>
            <FooterButton name={'Nuevo'} accion={handleRowSelect}/>
            <FooterButton name={'Salir'} accion={handleGoBack} />
          </Footer>
          </>:
          <InformeIngresoGastoForm onShowModel={handleSaveModel} data={selectedRowData}/>
        }
        {showModalDelete ? <InformeIngresoGastoFormDelete onShowModel={handleShowModelDelete} data={dataModalDelete} /> :'' }
        <Toaster />
      </Main>
    </ContainerPageCustom>
  )
}
export default InformeIngresoGastoPage