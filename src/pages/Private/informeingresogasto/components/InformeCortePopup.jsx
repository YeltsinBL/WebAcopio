import { useState } from "react"
import { useCorte } from "../hooks"
import { ContainerPopupTableCustom, Footer, FooterButton, NoRegistros, TableBodyCustom,
  TableTd, TitleCustom 
} from "~components/common"

export const InformeCortePopup = ({onShowModel, headers, tierraId}) => {
  const [selectedRows, setSelectedRows] = useState([])
  const {corteList} = useCorte(tierraId)

  const handleCheckboxChange = (row) => {
    const isSelected = selectedRows.some((selectedRow) => selectedRow.corteId === row.corteId)
    if (isSelected) {
      // Si ya está seleccionado, eliminar de selectedRows
      const updatedRows = selectedRows.filter((selectedRow) => selectedRow.corteId !== row.corteId);
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
        <TitleCustom titulo={'Lista de Cortes'} />
      </div>
      <TableBodyCustom headers={headers}>
        {corteList.length > 0 ? (
          corteList.map((corte) =>(
            <tr key={corte.corteId}>
              <TableTd hidden={true}>{corte.corteId}</TableTd>
              <TableTd> {corte.corteFecha} </TableTd>
              <TableTd> {corte.tierraUC} </TableTd>
              <TableTd> {corte.tierraCampo} </TableTd>
              <TableTd> {corte.cortePrecio} </TableTd>
              <TableTd> {corte.cortePesoBrutoTotal} </TableTd>
              <TableTd> {corte.corteTotal} </TableTd>
              <TableTd>
                <input type="checkbox" onChange={() => handleCheckboxChange(corte)} />
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