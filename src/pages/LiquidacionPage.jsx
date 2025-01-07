import { useEffect, useState } from "react";
import { ContainerPageCustom, Footer, FooterButton, Header, Main } from "../components/common";
import { useClosePage } from "../hooks/common";
import { convertirFechaDDMMYYYY } from "../utils";
import { liquidacionGetById, liquidacionSearch } from "../services/liquidacion";
import { LiquidacionModel } from "../components/liquidacion/LiquidacionModel";
import { LiquidacionFilter } from "../components/liquidacion/LiquidacionFilter";
import { LiquidacionTable } from "../components/liquidacion/LiquidacionTable";

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
    console.log(formatteliquidaciones)
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
  return (
    <ContainerPageCustom>
      <Header title={'Liquidación'}/>
      <Main>
        {!showModal ?
        <>
          <LiquidacionFilter onFiltersValue={handleDataFromChild} />
          <LiquidacionTable data={liquidacionList} onRowSelect={handleRowSelect} />
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