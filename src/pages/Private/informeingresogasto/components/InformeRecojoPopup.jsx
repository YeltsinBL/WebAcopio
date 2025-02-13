import { useState } from "react"
import { useRecojo } from "../hooks/useRecojo"
import { ContainerPopupTableCustom, Footer, FooterButton, NoRegistros, TableBodyCustom,
  TableTd, TitleCustom 
} from "~components/common"

export const InformeRecojoPopup = ({onShowModel, headers}) => {
  const [selectedRows, setSelectedRows] = useState([])
  const {recojoList} = useRecojo()

  const handleCheckboxChange = (row) => {
    const isSelected = selectedRows.some((selectedRow) => selectedRow.recojoId === row.recojoId)
    if (isSelected) {
      // Si ya está seleccionado, eliminar de selectedRows
      const updatedRows = selectedRows.filter((selectedRow) => selectedRow.recojoId !== row.recojoId);
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
        <TitleCustom titulo={'Lista de Recojos'} />
      </div>
      <TableBodyCustom headers={headers}>
        {recojoList.length > 0 ? (
          recojoList.map((recojo) =>(
            <tr key={recojo.recojoId}>
              <TableTd hidden={true}>{recojo.recojoId}</TableTd>
              <TableTd> {recojo.recojoFechaInicio} </TableTd>
              <TableTd> {recojo.recojoFechaFin} </TableTd>
              <TableTd> {recojo.recojoCampo} </TableTd>
              <TableTd> {recojo.recojoDiasPrecio} </TableTd>
              <TableTd> {recojo.recojoCamionesPrecio} </TableTd>
              <TableTd> {recojo.recojoTotalPrecio} </TableTd>
              <TableTd>
                <input type="checkbox" onChange={() => handleCheckboxChange(recojo)} />
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