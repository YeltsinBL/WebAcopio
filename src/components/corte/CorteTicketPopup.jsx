import React, { useEffect, useState } from 'react'
import { NoRegistros } from '../common/NoRegistros'
import { TICKET_DATA } from '../mocks/DataList'
import Footer from '../common/Footer'
import FooterButton from '../common/FooterButton'
import CorteTicketPopupTable from './CorteTicketPopupTable'

const CorteTicketPopup = ({onShowModel, headers}) => {
  const [ticketList, setTICKET_DATA] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  useEffect(()=> {
    setTICKET_DATA(TICKET_DATA)
  }, [])
  const handleCheckboxChange = (row) => {
    const isSelected = selectedRows.some((selectedRow) => selectedRow.id === row.id)
    if (isSelected) {
      // Si ya está seleccionado, eliminar de selectedRows
      const updatedRows = selectedRows.filter((selectedRow) => selectedRow.id !== row.id);
      setSelectedRows(updatedRows);
    } else {
      // Si no está seleccionado, lo agregamos
      setSelectedRows([...selectedRows, row]);
    }
  }
  const handleAgregar = (e) => {
    e.preventDefault()
    console.log(selectedRows)
    onShowModel(selectedRows)
  }
  const handleCancelar = (e) => {
    e.preventDefault()
    onShowModel([])
  }
  return (
    <>
      <div
        className="justify-center items-center md:flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
      <div className="relative w-auto my-6 mx-auto md:max-w-3xl lg:max-w-6xl">
        {/*content*/}
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-800 outline-none focus:outline-none">
          {/*header*/}
          <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 className="text-3xl font-bold text-gray-100">
              Lista de Tickets Activos
            </h3>
          </div>
          {/*body*/}
          <CorteTicketPopupTable headers={headers} ticketList={ticketList} selectedRows={selectedRows} handleCheckboxChange={handleCheckboxChange} />
          {/*footer*/}
          <Footer>
            <FooterButton name={'Agregar'} accion={handleAgregar}/>
            <FooterButton name={'Cancelar'} accion={handleCancelar}/>
          </Footer>
        </div>
      </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

export default CorteTicketPopup