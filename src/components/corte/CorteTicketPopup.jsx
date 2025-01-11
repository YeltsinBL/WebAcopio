import { useEffect, useState } from 'react'
import CorteTicketPopupTable from './CorteTicketPopupTable'
import { searchTickets, searchTicketsByProveedor } from '../../services/ticket'
import { Footer, FooterButton } from '../common'

const CorteTicketPopup = ({onShowModel, headers, proveedorId= null}) => {
  const [ticketList, setTICKET_DATA] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  useEffect(()=> {
    getTicketActive()
  }, [])
  const getTicketActive = async() => {
    if(proveedorId == null) {
      const tickets = await searchTickets(
        {ingenio:'', transportista:'', viaje:'', fechaDesde:'', fechaHasta:'',estado:1}
      )
      setTICKET_DATA(tickets)
    }else{const tickets = await searchTicketsByProveedor(proveedorId)
      setTICKET_DATA(tickets)
    }
  }

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