import { useEffect, useState } from 'react'
import { 
  AdapterServicioGetDataExport
} from '~/adapters/ServicioAdapter'
import { 
  Footer, FooterButton, NoRegistros, TableBodyCustom, TableTd, TitleCustom 
} from '~components/common'
import { 
  servicioPaleroGetServicioTransporte 
} from '~services/servicio'


export const ServicioTransportePopup = ({onShowModel}) => {
  const headers =['Fecha', 'Transportista', 'Trans. Precio', 'Total', 'Estado', 'Acciones']
  
  const [servicioTransporteList, setServicioTransporteList] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  useEffect(()=> {
    getTicketActive()
  }, [])
  const getTicketActive = async() => {
    const servicios = await servicioPaleroGetServicioTransporte()
    setServicioTransporteList(
      servicios.map(servicio =>AdapterServicioGetDataExport(servicio))) 
  }

  const handleCheckboxChange = (row) => {
    const isSelected = selectedRows.some((selectedRow) => selectedRow.servicioId === row.servicioId)
    if (isSelected) {
      // Si ya está seleccionado, eliminar de selectedRows
      const updatedRows = selectedRows.filter((selectedRow) => selectedRow.servicioId !== row.servicioId)
      return setSelectedRows(updatedRows)
    }
    // Si no está seleccionado, agregar al selectedRows
    setSelectedRows([...selectedRows, row])
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
            <TitleCustom titulo={'Lista de Servicio Transporte'} />
          </div>
          {/*body*/}
          <TableBodyCustom headers={headers}>
            {servicioTransporteList ? (
              servicioTransporteList.map((servicio) => (
                <tr key={servicio.servicioId}>
                  <TableTd hidden={true}>{servicio.servicioId} </TableTd>
                  <TableTd>{servicio.servicioFecha}</TableTd>
                  <TableTd>{servicio.carguilloTitular}</TableTd>
                  <TableTd> {servicio.servicioPrecio} </TableTd>
                  <TableTd> {servicio.servicioTotal} </TableTd>
                  <TableTd> {servicio.servicioEstadoDescripcion} </TableTd>
                  <TableTd>
                    <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange(servicio)}
                    />
                  </TableTd>
                </tr>
              ))
            ): ( <NoRegistros colSpan={headers.length} /> )}
          </TableBodyCustom>
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
