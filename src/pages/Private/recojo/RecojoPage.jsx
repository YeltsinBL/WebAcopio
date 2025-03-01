import { useEffect, useState } from 'react'
import { ContainerPageCustom, Footer, FooterButton, Header, Main } from '~components/common'
import { RecojoFilter, RecojoModal, RecojoModalDelete, RecojoTable } from './components'
import { useClosePage } from '~hooks/common'
import { recojoGetById, searchRecojos } from '~services/recojo'
import { RecojoAdapterList } from './adapter/RecojoAdapter'
import { obtenerFechaInicialMes, obtenerSoloFechaLocal } from '~utils/index'

const RecojoPage = () => {
  const handleGoBack = useClosePage()
  const [recojoList, setRecojoList] = useState([])
  const [selectedRowData, setSelectedRowData] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showModelDelete, setShowModelDelete] = useState(false)
  const [idModelDelete, setIdModelDelete] = useState(false)
  
  useEffect(()=>{
    getRecojos({})
  }, [])
  const getRecojos = async({
    fechaDesdeFilter= obtenerFechaInicialMes(), 
    fechaHastaFilter = obtenerSoloFechaLocal({date: new Date()}), 
    estadoFilter=''}) =>{
    const recojosList = await searchRecojos({
      fechaDesdeFilter, fechaHastaFilter, estadoFilter
    })
    setRecojoList(RecojoAdapterList(recojosList))
  }

  const handleDataFromChild = (data) => getRecojos(data)

  const handleRowSelect = async(rowData) =>{
    if(rowData.recojoId) {
      const recojo = await recojoGetById({id: rowData.recojoId})
      setSelectedRowData(recojo)
    } else setSelectedRowData(null)
    setShowModal(true)
  }
  const handleSaveModel = (data)=>{
    if(data.recojoId > 0) getRecojos({})
    setShowModal(false)
  }
  const handleRowDelete = (id) =>{
    setIdModelDelete(id)
    setShowModelDelete(true)
  }
  const handleShowModelDelete = (recojoId) =>{
    if(recojoId > 0) getRecojos({})
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
export default RecojoPage