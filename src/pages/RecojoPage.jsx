import { useEffect, useState } from 'react'
import { ContainerPageCustom, Footer, FooterButton, Header, Main } from '../components/common'
import { RecojoFilter, RecojoModal, RecojoModalDelete, RecojoTable } from '../components/recojo'
import { useClosePage } from '../hooks/common'
import { recojoGetById, searchRecojos } from '../services/recojo'
import { convertirFechaDDMMYYYY } from '../utils'

export const RecojoPage = () => {
  const handleGoBack = useClosePage()
  const [recojoList, setRecojoList] = useState([])
  const [selectedRowData, setSelectedRowData] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showModelDelete, setShowModelDelete] = useState(false)
  const [idModelDelete, setIdModelDelete] = useState(false)
  
  
  useEffect(()=>{
    getRecojos()
  }, [])
  const getRecojos = async(filters) =>{
    const recojosList = await searchRecojos(filters)
    const formatteRecojos = recojosList.map(recojo =>{
      return {...recojo, 
        recojoFechaInicio: convertirFechaDDMMYYYY(recojo.recojoFechaInicio),
        recojoFechaFin   : convertirFechaDDMMYYYY(recojo.recojoFechaFin)}
    })
    setRecojoList(formatteRecojos)
  }

  const handleDataFromChild = (data) => {
    const {
        fechaDesdeFilter, fechaHastaFilter, estadoFilter
    } = data
    if(fechaDesdeFilter=='' && fechaHastaFilter=='' && estadoFilter==''){
      return getRecojos()
    }
    return getRecojos({fechaDesdeFilter, fechaHastaFilter, estadoFilter})
  }
  const handleRowSelect = async(rowData) =>{
    if(rowData.recojoId) {
      const recojo = await recojoGetById({id: rowData.recojoId})
      setSelectedRowData(recojo)
    } else setSelectedRowData(rowData)
    setShowModal(true)
  }
  const handleSaveModel = (data)=>{
    if(data.recojoId > 0) {
      const existingIndex = recojoList.findIndex((item) => item.recojoId === data.recojoId)
      if (existingIndex >= 0) {
        const updatedList = [...recojoList]
        updatedList[existingIndex] = data
        setRecojoList(updatedList)
      } else setRecojoList([...recojoList, data])
    }
    setShowModal(false)
  }
  const handleRowDelete = (id) =>{
    setIdModelDelete(id)
    setShowModelDelete(true)
  }
  const handleShowModelDelete = (recojoId) =>{
    if(recojoId > 0) setRecojoList(recojoList.filter(recojo =>
        recojo.recojoId !== recojoId
      ))
    setShowModelDelete(false)
  }
  return (
    <ContainerPageCustom>
      <Header title={'Recojo'} />
      <Main>
        {!showModal ?
          <>
            <RecojoFilter onFiltersValue={handleDataFromChild} />
            <RecojoTable data={recojoList} onRowSelect={handleRowSelect} onRowDelete={handleRowDelete}/>
            <Footer>
              <FooterButton name={'Nuevo'} accion={handleRowSelect} />
              <FooterButton name={'Salir'} accion={handleGoBack} />
            </Footer>
          </>:
          <RecojoModal onShowModel={handleSaveModel} data={selectedRowData}/>
        }
        {showModelDelete ? <RecojoModalDelete onShowModel={handleShowModelDelete} id={idModelDelete} /> :'' }
      </Main>
    </ContainerPageCustom>
  )
}
