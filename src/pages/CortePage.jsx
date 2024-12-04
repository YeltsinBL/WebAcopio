import React, { useEffect, useState } from 'react'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import FooterButton from '../components/common/FooterButton'
import Main from '../components/common/Main'
import CorteFilter from '../components/corte/CorteFilter'
import { CORTE_DATA } from '../components/mocks/DataList'
import CorteTable from '../components/corte/CorteTable'
import CorteModel from '../components/corte/CorteModel'
import { useNavigate } from 'react-router-dom'

const CortePage = () => {
  const navigate = useNavigate()
  const [corteList, setCorteList] = useState([])
  const [showModel, setShowModel] = useState(false)
  const [selectedRowData, setSelectedRowData] = useState(null)
  const handleGoBack = () => {
    navigate('/')
  }
  useEffect(() => {
    getCortes()
  },[])
  const getCortes = async(filter) =>{
    const tickets = CORTE_DATA
    setCorteList(tickets || [])
  }
  const handleDataFromChild = (data) => {
    const {
        uc, fechaDesde, fechaHasta, estado
    } = data
    if(uc=='' && fechaDesde=='' && fechaHasta=='' && estado==''){
      return getCortes()
    }
    return getCortes({uc, fechaDesde, fechaHasta, estado})
  }
  const handleRowSelect = async(rowData) => {
    setSelectedRowData(rowData)  
    setShowModel(true)
  }
  const handleShowModel = (data) => {
    if(data.id ==0) return setShowModel(false)
    console.log('handleShowModel',data)
    const existingIndex = corteList.findIndex((item) => item.id === data.id)
    
    console.log('handleShowModel',existingIndex)
    if (existingIndex >= 0) {
      const updatedList = [...corteList]
      updatedList[existingIndex] = data
      setCorteList(updatedList)
    } else setCorteList([...corteList, data])
    
    setShowModel(false)
  }
  return (
    <div className='flex-1 overflow-auto relative z-10'>
        <Header title={'Corte'} />
        <Main>
          {!showModel ?
            <>
              <CorteFilter onFiltersValue={handleDataFromChild}/>
              <CorteTable CORTE_DATA={corteList} />
              <Footer>
                <FooterButton name={'Nuevo'} accion={handleRowSelect} /> 
                <FooterButton name={'Salir'} accion={handleGoBack} /> 
              </Footer>
            </>:
            <CorteModel onShowModel={handleShowModel} data={selectedRowData}/>
          }
        </Main>
    </div>
  )
}

export default CortePage