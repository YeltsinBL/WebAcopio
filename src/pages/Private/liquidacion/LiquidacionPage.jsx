import { useEffect, useState } from "react"
import { Toaster } from "sonner"
import { 
  ContainerPageCustom, Footer, FooterButton, Header, Main 
} from "~components/common"
import { useClosePage } from "~hooks/common"
import { obtenerFechaInicialMes, obtenerSoloFechaLocal } from "~utils/index"
import { liquidacionGetById, liquidacionSearch } from "~services/liquidacion"
import { ExportToExcel, ExportToPdf } from "~components/download"
import { 
  LiquidacionAdapterList
} from "./adapter/LiquidacionAdapter"
import { LiquidacionFilter, LiquidacionModel, LiquidacionTable, 
  LiquidacionModelDelete 
} from "./components"
import { LiquidacionExcelFile, LiquidacionPdfFile } from "./reports"

function LiquidacionPage() {
  const handleGoBack = useClosePage()
  const [liquidacionList, setLiquidacionList] = useState([])
  const [selectedRowData, setSelectedRowData] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showModelDelete, setShowModelDelete] = useState(false)
  const [modelDataDelete, setModelDataDelete] = useState(false)

  useEffect(()=>{
    getLiquidacion({})
  }, [])
  const getLiquidacion = async({
    fechaDesdeFilter=obtenerFechaInicialMes(),
    fechaHastaFilter=obtenerSoloFechaLocal({date: new Date()}),
    utFilter='', estadoFilter='',
  }) =>{
    const liquidacionesList = await liquidacionSearch({
      fechaDesdeFilter, fechaHastaFilter, utFilter, estadoFilter})
    setLiquidacionList(LiquidacionAdapterList(liquidacionesList))
  }
  const handleDataFromChild = (data)=> getLiquidacion(data)

  const handleRowSelect = async(rowData) =>{
    if(rowData.liquidacionId){
      const servicio = await liquidacionGetById({id:rowData.liquidacionId})
      setSelectedRowData(servicio)
    }else setSelectedRowData(null)
    setShowModal(true)
  }  
  const handleSaveModel = (data) =>{
    if(data.result) getLiquidacion({})    
    setShowModal(false)
  }
  const handleRowDelete = (data) =>{
    setModelDataDelete(data)
    setShowModelDelete(true)
  }
  const handleShowModelDelete = (data) =>{
    if(data.result) getLiquidacion({})    
    setShowModelDelete(false)
  }
  const handleRowExportExcel = async(liquidacionId) =>{
    const liquidacion = await liquidacionGetById({id: liquidacionId})
    await ExportToExcel(LiquidacionExcelFile(liquidacion), 'LiquidaciónReporte')
  }
  const handleRowExportPdf = async(liquidacionId) =>{
    const liquidacion = await liquidacionGetById({id: liquidacionId})
    ExportToPdf(LiquidacionPdfFile(liquidacion), 'LiquidaciónReporte')
  }
  return (
    <ContainerPageCustom>
      <Header title={'Liquidación'}/>
      <Main>
        {!showModal ?
        <>
          <LiquidacionFilter onFiltersValue={handleDataFromChild} />
          <LiquidacionTable data={liquidacionList} onRowSelect={handleRowSelect} onRowDelete={handleRowDelete}
            exportExcel={handleRowExportExcel} exportPdf={handleRowExportPdf} />
          <Footer>
            <FooterButton name={'Nuevo'} accion={handleRowSelect}/>
            <FooterButton name={'Salir'} accion={handleGoBack}/>
          </Footer>
        </>:
        <LiquidacionModel onShowModel={handleSaveModel} data={selectedRowData} />}
        {showModelDelete ? ( <LiquidacionModelDelete onShowModel={handleShowModelDelete} data={modelDataDelete}/>): null }
        <Toaster />
      </Main>
    </ContainerPageCustom>
  )
}
export default LiquidacionPage