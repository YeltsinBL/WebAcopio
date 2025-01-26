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
    setTesoreriaList(TesoreriaAdapterList(tesorerias))
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
      setSelectedRowData(TesoreriaAdapterGetData(servicio))
    }else setSelectedRowData(null)
    setShowModal(true)
  }
  const handleSaveModel = (data) =>{
    if(data.result) {
      toast.success(data.errorMessage)
      getTesorerias()
    }
    setShowModal(false)
  }
  return (
    <ContainerPageCustom>
      <Header title={'Tesoreria'}/>
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