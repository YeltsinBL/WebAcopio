import { useEffect, useState } from "react"
import { 
  ContainerPopupTableCustom, Footer, FooterButton, NoRegistros, TableBodyCustom, TableTd, TitleCustom 
} from "~components/common"
import { searchProveedorPersona } from "~services/proveedor"

export const FacturaVentaPopupPersona = ({onShowModel, headers}) => {
  const [personaList, setPersonaList] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  useEffect(()=> {
    getProductos()
  }, [])
  const getProductos = async() => {
    const productos = await searchProveedorPersona({estado:true})
    setPersonaList( productos ) 
  }
  const handleCheckboxChange = (row) => {
    const isSelected = selectedRows.some((selectedRow) => selectedRow.personId === row.personId)
    if (isSelected) {
      const updatedRows = selectedRows.filter((selectedRow) => selectedRow.personId !== row.personId)
      return setSelectedRows(updatedRows)
    }
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
    <ContainerPopupTableCustom>
      <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
        <TitleCustom titulo={'Lista de Sembradores'} />
      </div>
      <TableBodyCustom headers={headers}>
        {personaList ? (
          personaList.map((detalle) => (
            <tr key={detalle.personId}>
              <TableTd hidden>{detalle.personId}</TableTd>
              <TableTd>{detalle.proveedorNombre}</TableTd>
              <TableTd>
                <input
                type="checkbox"
                onChange={() => handleCheckboxChange(detalle)}
                />
              </TableTd>
            </tr>
          ))
        ): ( <NoRegistros colSpan={headers.length} /> )}
      </TableBodyCustom>
      <Footer>
        <FooterButton name={'Agregar'} accion={handleAgregar}/>
        <FooterButton name={'Cancelar'} accion={handleCancelar}/>
      </Footer>
    </ContainerPopupTableCustom>
  )
}