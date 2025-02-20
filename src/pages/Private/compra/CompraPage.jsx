import { useEffect, useState } from "react"
import { toast, Toaster } from "sonner"
import { ContainerPageCustom, Footer, FooterButton, Header, Main } from "~components/common"
import { CompraFilter, CompraForm, CompraFormDelete, CompraTable } from "./components"
import { useClosePage } from "~hooks/common"
import { compraGetById, searchCompra } from "~services/compra"
import { compraAdapterGetData, compraAdapterList } from "./adapter/CompraAdapter"
import { obtenerFechaInicialMes, obtenerSoloFechaLocal } from "~utils/index"

const CompraPage = () => {
  const handleGoBack = useClosePage()
  const [showModel, setShowModel] = useState(true)
  const [selectedRowData, setSelectedRowData] = useState(null)
  const [showModalDelete, setShowModalDelete] = useState(false)
  const [modalDelete, setModalDelete] = useState({})
  
  const [compraList, setCompraList] = useState([])

  useEffect(() => {
    getCompra({
      fechaDesde: obtenerFechaInicialMes(),
      fechaHasta: obtenerSoloFechaLocal({date: new Date()}),
      tipoComprobanteId: '', numeroComprobante: '', estadoId: ''
    })
  }, [])
  const getCompra = async(filter) => {
    const compras = await searchCompra(filter)
    setCompraList(compraAdapterList(compras)|| [])
  }
  const handleDataFromChild = (data) => getCompra(data)

  // Obtener
  const handleRowSelect = async(rowData) => {
    if(rowData.compraId != null){
      const compra = await compraGetById({id:rowData.compraId})
      if(compra.result){
        setSelectedRowData(compraAdapterGetData(compra.data))
      }else return toast.error(compra.message)
    }else setSelectedRowData(null)  
    setShowModel(false)
  }
  // Guardar
  const handleShowModel = (data) => {
    if(data.result) getCompra()    
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
      getCompra()
    }
    setShowModalDelete(false)
  }
  return (
    <ContainerPageCustom>
      <Header title='Compra'/>
      <Main>
        {showModel ?
          <>
          <CompraFilter onFiltersValue={handleDataFromChild}/>
          <CompraTable data={compraList} onRowSelect={handleRowSelect} onDeleteSelect={eliminarTicket} />    
          <Footer>
              <FooterButton accion={handleRowSelect} name={"Nuevo"}/>
              <FooterButton accion={handleGoBack} name={"Salir"}/>
          </Footer>
          </>:
          <CompraForm onShowModel={handleShowModel} data={selectedRowData}/>        
        }       
        {showModalDelete ? <CompraFormDelete onShowModel={handleShowModelDelete} data={modalDelete}/> : ''}
        <Toaster />
      </Main>
    </ContainerPageCustom>
  )
}
export default CompraPage