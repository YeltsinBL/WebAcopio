import { useEffect, useState } from "react"
import { searchProveedorPersona } from "~services/proveedor"
import { formatterDataCombo } from "~utils/index"

export const useSembrador = () => {
  const [sembradorList, setSembradorList] = useState([])
  const [proveedoresALiquidarList, setProveedorALiquidarList] = useState([])

  useEffect(() => {
    getSembrador()
  }, [])

  const getSembrador = async () => {
    const proveedores = await searchProveedorPersona()
    setProveedorALiquidarList(proveedores)
    const formatter = proveedores?.map((ut) =>
      formatterDataCombo(ut.personId, ut.proveedorNombre)
    )
    setSembradorList(formatter)
  }
  return { proveedoresALiquidarList, sembradorList }
}