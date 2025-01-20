import { useClosePage } from "~hooks/common"
import { 
  ReporteMasivoFilter, ReporteMasivoTable 
} from "./components"
import { 
  ContainerPageCustom, Footer, FooterButton, Header, Main 
} from "~components/common"
import { ReporteMasivoAdapterList } from "./adapters/ReporteMasivoAdapter"
import { useEffect, useState } from "react"
import { liquidacionSearch } from "~services/liquidacion"
import { ExportToExcel, ExportToPdf } from "~components/download"
import { ReporteMasivoExcel } from "./reports/ReporteMasivoExcel"
import { ReporteMasivoPdf } from "./reports/ReporteMasivoPdf"

const ReporteMasivoPage = () => {
  const handleGoBack = useClosePage()
  const [liquidacionList, setLiquidacionList] = useState([])

  useEffect(()=>{
    getLiquidacion()
  }, [])
  const getLiquidacion = async(filters) =>{
    const liquidacionesList = await liquidacionSearch(filters)
    setLiquidacionList(ReporteMasivoAdapterList(liquidacionesList))
  }
  const handleDataFromChild = (data)=>{
    const {
      fechaDesdeFilter, fechaHastaFilter, utFilter, estadoFilter
    } = data
    if(fechaDesdeFilter=='' && fechaHastaFilter=='' && utFilter =='' && estadoFilter=='')
      return getLiquidacion()
    return getLiquidacion({fechaDesdeFilter, fechaHastaFilter, utFilter, estadoFilter})
  }
  const handleRowExportExcel = async() =>{
    await ExportToExcel(ReporteMasivoExcel(liquidacionList), 'ReporteMasivo')
  }
  const handleRowExportPdf = () =>{
    ExportToPdf(ReporteMasivoPdf(liquidacionList), 'ReporteMasivo')
  }
  return (
    <ContainerPageCustom>
      <Header title={'Reporte Masivo'}/>
      <Main>
        <ReporteMasivoFilter onFiltersValue={handleDataFromChild} />
        <ReporteMasivoTable data={liquidacionList} />
        <Footer>
          <FooterButton name={'Excel'} accion={handleRowExportExcel}/>
          <FooterButton name={'PDF'} accion={handleRowExportPdf}/>
          <FooterButton name={'Salir'} accion={handleGoBack}/>
        </Footer>
      </Main>
    </ContainerPageCustom>
  )
}
export default ReporteMasivoPage