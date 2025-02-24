import { useEffect, useState } from "react"
import { toast, Toaster } from "sonner"
import { 
  ContainerPageCustom, Footer, FooterButton, Header, Main 
} from "~components/common"
import { useClosePage } from "~hooks/common"
import { searchTesoreria, tesoreriaGetById } from "~services/tesoreria"
import { TesoreriaFilter } from "./components/TesoreriaFilter"
import { TesoreriaTable } from "./components/TesoreriaTable"
import { TesoreriaForm } from "./components/TesoreriaForm"
import { TesoreriaAdapterGetData, TesoreriaAdapterList } from "./adapters/TesoreriaAdapter"
import { obtenerFechaInicialMes, obtenerSoloFechaLocal } from "~utils/index"

function TesoreriaPage() {
  const handleGoBack = useClosePage()
  const [tesoreriaList, setTesoreriaList] = useState([])
  const [selectedRowData, setSelectedRowData] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(()=>{
    getTesorerias({
      fechaDesde: obtenerFechaInicialMes(), 
      fechaHasta: obtenerSoloFechaLocal({date: new Date()}),
      personaId:''
    })
  },[])
  const getTesorerias = async({fechaDesde= obtenerFechaInicialMes(), 
    fechaHasta= obtenerSoloFechaLocal({date: new Date()}),
    personaId=''}) =>{
    const tesorerias = await searchTesoreria({fechaDesde, fechaHasta, personaId})
    setTesoreriaList(TesoreriaAdapterList(tesorerias))
  }
  const handleDataFromChild = (data)=>{
    const {
      fechaDesde, fechaHasta, personaId
    } = data
    if(fechaDesde=='' && fechaHasta=='' && personaId =='')
      return getTesorerias({})
    return getTesorerias({fechaDesde, fechaHasta, personaId})
  }
  const handleRowSelect = async(rowData) =>{
    if(rowData.tesoreriaId){
      
      const servicio = await tesoreriaGetById({id:rowData.tesoreriaId})
      setSelectedRowData(TesoreriaAdapterGetData(servicio))
    }else setSelectedRowData(null)
    setShowModal(true)
  }
  const handleSaveModel = (data) =>{
    if(data.result) getTesorerias({})    
    setShowModal(false)
  }
  return (
    <ContainerPageCustom>
      <Header title={'Liquidación Pago'}/>
      <Main>
        { !showModal ?
        <>
          <TesoreriaFilter onFiltersValue={handleDataFromChild} />
          <TesoreriaTable data={tesoreriaList} onRowSelect={handleRowSelect} />
          <Footer>
            <FooterButton name={'Nuevo'} accion={handleRowSelect} />
            <FooterButton name={'Salir'} accion={handleGoBack} />
          </Footer>
        </>:<TesoreriaForm data={selectedRowData} onShowModel={handleSaveModel} />}
        <Toaster />
      </Main>
    </ContainerPageCustom>
  )
}
export default TesoreriaPage