import { useState } from "react"
import { 
  ContainerPopupTableCustom, Footer, FooterButton, NoRegistros, TableBodyCustom, TableTd, 
  TitleCustom 
} from "~components/common"
import { useServicio } from "../hooks/useServicio"

export const InformeServicioPopup = ({headers, transporte, titulo, onShowModel}) => {
  const [selectedRows, setSelectedRows] = useState([])
  const {servicioList} = useServicio(transporte)

  const handleCheckboxChange = (row) => {
    const isSelected = selectedRows.some((selectedRow) => selectedRow.servicioId === row.servicioId)
    if (isSelected) {
      // Si ya está seleccionado, eliminar de selectedRows
      const updatedRows = selectedRows.filter((selectedRow) => selectedRow.servicioId !== row.servicioId);
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
    <ContainerPopupTableCustom>
      <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
        <TitleCustom titulo={`Lista de Servicio ${titulo}`} />
      </div>
      <TableBodyCustom headers={headers}>
        {servicioList.length > 0 ? (
          servicioList.map((servicio) =>(
            <tr key={servicio.servicioId}>
              <TableTd hidden={true}>{servicio.servicioId} </TableTd>
              <TableTd>{servicio.servicioFecha}</TableTd>
              <TableTd>{servicio.servicioCarguilloTitular}</TableTd>
              <TableTd> {servicio.servicioPrecio} </TableTd>
              <TableTd> {servicio.servicioPesoBruto} </TableTd>
              <TableTd> {servicio.servicioTotal} </TableTd>
              <TableTd>
              <input type="checkbox" onChange={() => handleCheckboxChange(servicio)} />
              </TableTd>
            </tr>
          ))
        ):( <NoRegistros colSpan={headers.length} /> )}
      </TableBodyCustom>
      <Footer>
        <FooterButton name={'Agregar'} accion={handleAgregar}/>
        <FooterButton name={'Cancelar'} accion={handleCancelar}/>
      </Footer>
    </ContainerPopupTableCustom>
  )
}