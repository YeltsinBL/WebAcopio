import { useState } from "react"
import { 
  ContainerPopupTableCustom, Footer, FooterButton, NoRegistros, TableBodyCustom, 
  TableTd, TitleCustom 
} from "~components/common"
import { useLiquidacion } from "../hooks/useLiquidacion"

export const InformeLiquidacionPopup = ({headers, proveedorId, onShowModel}) => {
  const [selectedRows, setSelectedRows] = useState([])
  const { liquidacionList } = useLiquidacion(proveedorId)
  
  const handleCheckboxChange = (row) => {
      const isSelected = selectedRows.some((selectedRow) => selectedRow.liquidacionId === row.liquidacionId)
      if (isSelected) {
        // Si ya está seleccionado, eliminar de selectedRows
        const updatedRows = selectedRows.filter((selectedRow) => selectedRow.liquidacionId !== row.liquidacionId);
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
        <TitleCustom titulo={'Lista de Liquidaciones'} />
      </div>
      <TableBodyCustom headers={headers}>
        {liquidacionList.length > 0 ? (
          liquidacionList.map((liquidacion) =>(
            <tr key={liquidacion.liquidacionId}>
              <TableTd hidden={true}>{liquidacion.liquidacionId}</TableTd>
              <TableTd>{liquidacion.personaNombre}</TableTd>
              <TableTd>{liquidacion.tierraCampo}</TableTd>
              <TableTd>{liquidacion.proveedorUT}</TableTd>
              <TableTd>{liquidacion.liquidacionFechaInicio}</TableTd>
              <TableTd>{liquidacion.liquidacionFechaFin}</TableTd>
              <TableTd>{liquidacion.liquidacionPesoBruto}</TableTd>
              <TableTd>{liquidacion.liquidacionPesoNeto}</TableTd>
              <TableTd>{liquidacion.liquidacionToneladaPrecioCompra}</TableTd>
              <TableTd>{liquidacion.liquidacionToneladaTotal}</TableTd>
              <TableTd>
              <input type="checkbox" onChange={() => handleCheckboxChange(liquidacion)} />
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