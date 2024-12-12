import React, { useEffect, useState } from 'react'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import FooterButton from '../components/common/FooterButton'
import Main from '../components/common/Main'
import { useNavigate } from 'react-router-dom'
import { corteGetById, searchCortes } from '../services/corte'
import { 
  CorteFilter, CorteModel, CorteModelDelete, CorteTable 
} from '../components/corte'

export const CortePage = () => {
  const navigate = useNavigate()
  const [corteList, setCorteList] = useState([])
  const [showModel, setShowModel] = useState(false)
  const [selectedRowData, setSelectedRowData] = useState(null)
  const [showModelDelete, setShowModelDelete] = useState(false)
  const [idModelDelete, setIdModelDelete] = useState(false)
  const handleGoBack = () => {
    navigate('/')
  }
  useEffect(() => {
    getCortes()
  },[])
  const getCortes = async(filter) =>{
    const tickets = await searchCortes(filter)
    setCorteList(tickets || [])
  }
  const handleDataFromChild = (data) => {
    const {
      tierraId, fechaDesde, fechaHasta, estadoId
    } = data
    if(tierraId=='' && fechaDesde=='' && fechaHasta=='' && estadoId==''){
      return getCortes()
    }
    return getCortes({tierraId, fechaDesde, fechaHasta, estadoId})
  }
  const handleRowSelect = async(rowData) => {
    if(rowData.id != null){
      const resp = await corteGetById({id: rowData.id})
      setSelectedRowData(resp)
    }else setSelectedRowData(rowData)  
    setShowModel(true)
  }
  const handleShowModel = (data) => {
    if(data.id > 0){
      const existingIndex = corteList.findIndex((item) => item.id === data.id)
      if (existingIndex >= 0) {
        const updatedList = [...corteList]
        updatedList[existingIndex] = data
        setCorteList(updatedList)
      } else setCorteList([...corteList, data])      
    }
    setShowModel(false)
  }
  const handleRowDelete = (id) =>{
    setIdModelDelete(id)
    setShowModelDelete(true)
  }
  const handleShowModelDelete = (data) =>{
    if(data.id > 0) setCorteList(corteList.filter(corte => corte.id !== data.id))
    setShowModelDelete(false)
  }
  return (
    <div className='flex-1 overflow-auto relative z-10'>
        <Header title={'Corte'} />
        <Main>
          {!showModel ?
            <>
              <CorteFilter onFiltersValue={handleDataFromChild}/>
              <CorteTable CORTE_DATA={corteList} onRowSelect={handleRowSelect} onRowDelete={handleRowDelete} />
              <Footer>
                <FooterButton name={'Nuevo'} accion={handleRowSelect} /> 
                <FooterButton name={'Salir'} accion={handleGoBack} /> 
              </Footer>
            </>:
            <CorteModel onShowModel={handleShowModel} data={selectedRowData}/>
          }
          {showModelDelete ? <CorteModelDelete onShowModel={handleShowModelDelete} data={idModelDelete} /> :'' }
        </Main>
    </div>
  )
}
