import React from 'react'
import ModalDelete from '../common/ModalDelete'
import Footer from '../common/Footer'
import FooterButton from '../common/FooterButton'

const CorteModelDelete = ({onShowModel, data}) => {
  const handleGuardar =(e)=>{
    e.preventDefault()
    sendDataDismissModel(data)
  }
  const handleCancelar =(e)=>{
    e.preventDefault()
    sendDataDismissModel(0)
  }
  const sendDataDismissModel = (valor) => {
    onShowModel({id:valor})
  }
  return (
    <ModalDelete title={"Eliminar Ticker"} message={"¿Estás seguro(a) que deseas eliminar el ticket?"}>
      <Footer>
        <FooterButton accion={handleGuardar} name={"Eliminar"}/>
        <FooterButton accion={handleCancelar} name={"Cancelar"}/>
      </Footer>
    </ModalDelete> 
  )
}

export default CorteModelDelete