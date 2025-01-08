import { useEffect, useState } from "react";
import { ContainerPageCustom, Footer, FooterButton, Header, Main } from "../../../components/common";
import { useClosePage } from "../../../hooks/common";
import { searchTesoreria, tesoreriaGetById } from "../../../services/tesoreria";
import { convertirFechaDDMMYYYY } from "../../../utils";
import { TesoreriaFilter } from "./components/TesoreriaFilter";
import { TesoreriaTable } from "./components/TesoreriaTable";
import { TesoreriaForm } from "./components/TesoreriaForm";

function TesoreriaPage() {
  const handleGoBack = useClosePage()
  const [tesoreriaList, setTesoreriaList] = useState([])
  const [selectedRowData, setSelectedRowData] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(()=>{
    getTesorerias()
  },[])
  const getTesorerias = async(filters) =>{
    const tesorerias = await searchTesoreria(filters)
    const formattetesorerias = tesorerias.map(tesoreria =>{
      return {...tesoreria, 
        tesoreriaFecha: convertirFechaDDMMYYYY(tesoreria.tesoreriaFecha)}
    })
    setTesoreriaList(formattetesorerias)
  }
  const handleDataFromChild = (data)=>{
    const {
      fechaDesde, fechaHasta, proveedorId
    } = data
    if(fechaDesde=='' && fechaHasta=='' && proveedorId =='')
      return getTesorerias()
    return getTesorerias({fechaDesde, fechaHasta, proveedorId})
  }
  const handleRowSelect = async(rowData) =>{
    if(rowData.tesoreriaId){
      const servicio = await tesoreriaGetById({id:rowData.tesoreriaId})
      setSelectedRowData(servicio)
    }else setSelectedRowData(null)
    setShowModal(true)
  }
  const handleSaveModel = (data) =>{
    if(data.tesoreriaId>0) getTesorerias()     
    setShowModal(false)
  }
  return (
    <ContainerPageCustom>
      <Header title={'Tesorería'}/>
      <Main>        
        <>
          <TesoreriaFilter onFiltersValue={handleDataFromChild} />
          <TesoreriaTable data={tesoreriaList} onRowSelect={handleRowSelect} />
          <Footer>
            <FooterButton name={'Nuevo'} accion={handleRowSelect} />
            <FooterButton name={'Salir'} accion={handleGoBack} />
          </Footer>
        </>
        { showModal && <TesoreriaForm data={selectedRowData} onShowModel={handleSaveModel} />}
      </Main>
    </ContainerPageCustom>
  )
}
export default TesoreriaPage