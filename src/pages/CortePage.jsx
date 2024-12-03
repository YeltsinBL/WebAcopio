import React, { useEffect, useState } from 'react'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import FooterButton from '../components/common/FooterButton'
import Main from '../components/common/Main'
import CorteFilter from '../components/corte/CorteFilter'
import { CORTE_DATA } from '../components/mocks/DataList'
import CorteTable from '../components/corte/CorteTable'

const CortePage = () => {
  const [corteList, setCorteList] = useState([])
    
  useEffect(() => {
    getCortes()
  })
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

  return (
    <div className='flex-1 overflow-auto relative z-10'>
        <Header title={'Corte'} />
        <Main>
            <CorteFilter onFiltersValue={handleDataFromChild}/>
            <CorteTable CORTE_DATA={corteList} />
            <Footer>
                <FooterButton name={'Nuevo'} accion={()=>{}} /> 
                <FooterButton name={'Salir'} accion={()=>{}} /> 
            </Footer>
        </Main>
    </div>
  )
}

export default CortePage