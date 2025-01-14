import { useEffect, useState } from "react";
import { ContainerPageCustom, Footer, FooterButton, Header, Main } from "../components/common";
import { useClosePage } from "../hooks/common";
import { convertirFechaDDMMYYYY } from "../utils";
import { liquidacionGetById, liquidacionSearch } from "../services/liquidacion";
import { ExportToExcel, ExportToPdf } from "../components/download";
import { 
  LiquidacionFilter, LiquidacionTable, LiquidacionModel,
  LiquidacionExcelFile, LiquidacionPdfFile,
 } from "../components/liquidacion";

function LiquidacionPage() {
  const handleGoBack = useClosePage()
  const [liquidacionList, setLiquidacionList] = useState([])
  const [selectedRowData, setSelectedRowData] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showModelDelete, setShowModelDelete] = useState(false)
  const [idModelDelete, setIdModelDelete] = useState(false)

  useEffect(()=>{
    getLiquidacion()
  }, [])
  const getLiquidacion = async(filters) =>{
    const liquidacionesList = await liquidacionSearch(filters)
    const formatteliquidaciones = liquidacionesList.map(liquidacion =>{
      return {...liquidacion, 
        liquidacionFechaInicio: convertirFechaDDMMYYYY(liquidacion.liquidacionFechaInicio),
        liquidacionFechaFin   : convertirFechaDDMMYYYY(liquidacion.liquidacionFechaFin)}
    })
    setLiquidacionList(formatteliquidaciones)
  }
  const handleDataFromChild = (data)=>{
    const {
      fechaDesdeFilter, fechaHastaFilter, utFilter, estadoFilter
    } = data
    if(fechaDesdeFilter=='' && fechaHastaFilter=='' && utFilter =='' && estadoFilter=='')
      return getLiquidacion()
    return getLiquidacion({fechaDesdeFilter, fechaHastaFilter, utFilter, estadoFilter})
  }
  const handleRowSelect = async(rowData) =>{
    if(rowData.liquidacionId){
      const servicio = await liquidacionGetById({id:rowData.liquidacionId})
      setSelectedRowData(servicio)
    }else setSelectedRowData(rowData)
    setShowModal(true)
  }  
  const handleSaveModel = (data) =>{
    if(data.liquidacionId>0){
      const existingIndex = liquidacionList.findIndex((item) => item.liquidacionId === data.liquidacionId)
      if (existingIndex >= 0) {
        const updatedList = [...liquidacionList]
        updatedList[existingIndex] = data
        setLiquidacionList(updatedList)
      } else setLiquidacionList([...liquidacionList, data])
    }
    setShowModal(false)
  }
  const handleRowDelete = (id) =>{
    setIdModelDelete(id)
    setShowModelDelete(true)
  }
  const handleShowModelDelete = (liquidacionId) =>{
    if(liquidacionId > 0) getLiquidacion()
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
          <LiquidacionTable data={liquidacionList} onRowSelect={handleRowSelect}
            exportExcel={handleRowExportExcel} exportPdf={handleRowExportPdf} />
          <Footer>
            <FooterButton name={'Nuevo'} accion={handleRowSelect}/>
            <FooterButton name={'Salir'} accion={handleGoBack}/>
          </Footer>
        </>:
        <LiquidacionModel onShowModel={handleSaveModel} data={selectedRowData} />}
      </Main>
    </ContainerPageCustom>
  )
}
export default LiquidacionPage