import { useEffect, useState } from 'react'
import { ContainerPageCustom, Footer, FooterButton, Header, Main } from '../components/common'
import { useClosePage } from '../hooks/common'
import { ServicioTransporteFilter } from '../components/servicioTransporte/ServicioTransporteFilter'
import { ServicioTransporteTable } from '../components/servicioTransporte/ServicioTransporteTable'
import { servicioTransporteGetById, servicioTransporteSearch } from '../services/serviciotransporte'
import { convertirFechaDDMMYYYY } from '../utils'
import { ServicioTransporteModal } from '../components/servicioTransporte/ServicioTransporteModal'
import { ServicioTransporteModalDelete } from '../components/servicioTransporte/ServicioTransporteModalDelete'

export const ServicioTransportePage = () => {
  const handleGoBack = useClosePage()
  const [servicioList, setServicioList] = useState([])
  const [selectedRowData, setSelectedRowData] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showModelDelete, setShowModelDelete] = useState(false)
  const [idModelDelete, setIdModelDelete] = useState(false)
  
  useEffect(()=>{
    getServicios()
  },[])
  const getServicios = async(filters) =>{
    const servicios = await servicioTransporteSearch(filters)
    const formatteServicios = servicios.map(servicio =>{
      return {...servicio, 
        servicioTransporteFecha: convertirFechaDDMMYYYY(servicio.servicioTransporteFecha)}
    })
    setServicioList(formatteServicios)
  }
  const handleDataFromChild = (data)=>{
    const {
      fechaDesdeFilter, fechaHastaFilter, carguilloFilter, estadoFilter
    } = data
    if(fechaDesdeFilter=='' && fechaHastaFilter=='' && carguilloFilter =='' && estadoFilter=='')
      return getServicios()
    return getServicios({fechaDesdeFilter, fechaHastaFilter, carguilloFilter, estadoFilter})
  }
  const handleRowSelect = async(rowData) =>{
    if(rowData.servicioTransporteId){
      const servicio = await servicioTransporteGetById({id:rowData.servicioTransporteId})
      setSelectedRowData(servicio)
    }else setSelectedRowData(rowData)
    setShowModal(true)
  }  
  const handleSaveModel = (data) =>{
    if(data.servicioTransporteId>0){
      const existingIndex = servicioList.findIndex((item) => item.servicioTransporteId === data.servicioTransporteId)
      if (existingIndex >= 0) {
        const updatedList = [...servicioList]
        updatedList[existingIndex] = data
        setServicioList(updatedList)
      } else setServicioList([...servicioList, data])
    }
    setShowModal(false)
  }
  const handleRowDelete = (id) =>{
    setIdModelDelete(id)
    setShowModelDelete(true)
  }
  const handleShowModelDelete = (servicioId) =>{
    if(servicioId > 0) getServicios()
    setShowModelDelete(false)
  }
  return (
    <ContainerPageCustom>
      <Header title={'Servicio Transporte'}/>
      <Main>
          <ServicioTransporteFilter onFiltersValue={handleDataFromChild} />
          <ServicioTransporteTable data={servicioList} onRowSelect={handleRowSelect} onRowDelete={handleRowDelete} /> 
          <Footer>
            <FooterButton name={'Nuevo'} accion={handleRowSelect} />
            <FooterButton name={'Salir'} accion={handleGoBack} />
          </Footer>
        
        {showModal && <ServicioTransporteModal onShowModel={handleSaveModel} data={selectedRowData}/>}
        {showModelDelete && <ServicioTransporteModalDelete id={idModelDelete} onShowModel={handleShowModelDelete}/>}
      </Main>
    </ContainerPageCustom>
  )
}
