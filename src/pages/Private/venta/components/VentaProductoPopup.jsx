import { useEffect, useState } from "react"
import { 
  ContainerPopupTableCustom, Footer, FooterButton, NoRegistros, TableBodyCustom, TableTd, TitleCustom 
} from "~components/common"
import { searchProducto } from "~services/producto"

export const VentaProductoPopup = ({onShowModel}) => {
  const headers =['Producto', 'Stock', 'Precio', 'Acciones']
  const [productoList, setProductoList] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  useEffect(()=> {
    getProductos()
  }, [])
  const getProductos = async() => {
    const productos = await searchProducto({name:'', estado:true})
    setProductoList( productos ) 
  }
  const handleCheckboxChange = (row) => {
    const isSelected = selectedRows.some((selectedRow) => selectedRow.productoId === row.productoId)
    if (isSelected) {
      const updatedRows = selectedRows.filter((selectedRow) => selectedRow.productoId !== row.productoId)
      return setSelectedRows(updatedRows)
    }
    row.cantidad=0,
    // row.precio=0,
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
        <TitleCustom titulo={'Lista de Productos'} />
      </div>
      <TableBodyCustom headers={headers}>
        {productoList ? (
          productoList.map((producto) => (
            <tr key={producto.productoId}>
              <TableTd hidden={true}>{producto.productoId} </TableTd>
              <TableTd>{producto.productoNombre}</TableTd>
              <TableTd>{producto.productoCantidad}</TableTd>
              <TableTd>{producto.productoPrecioVenta}</TableTd>
              <TableTd>
                <input
                type="checkbox"
                onChange={() => handleCheckboxChange(producto)}
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