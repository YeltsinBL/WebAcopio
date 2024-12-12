import { useEffect, useState } from "react"
import { asignaTierraSave, asignaTierraUpdate } from "../../services/asignartierra"
import { searchTierrasAvailable } from "../../services/tierra"
import { searchProveedorAvailable } from "../../services/proveedor"
import { ComboBoxCustom, formatterDataCombo, obtenerFechaLocal } from "../common"

export const AsignaTierraModel = ({ onShowModel, data }) => {
  const [id, setId] = useState('')
  const [ut, setUt] = useState('')
  const [uc, setUC] = useState(null)
  const [fecha, setFecha] = useState('')
  const [tierras, setTierras] = useState([])
  const [provedores, setProveedores] = useState([])
 
  const [errores, setErrores] = useState({})
  const seleccionProveedor = data.proveedorId ? {id: data.proveedorId, nombre: data.ut } : null
  const seleccionTierra = data.tierraId ? {id: data.tierraId, nombre: data.uc } : null
  useEffect(() => {
    if (data) {
      fetchOptionsTierras()
      fetchOptionsProveedor()
      setId(data.id || 0);
      setUt(data.proveedorId || 0)
      setUC(data.tierraId || 0)
      setFecha(data.fecha || obtenerFechaLocal({date: new Date()}).split('T')[0]);
    }
  }, []);
  const fetchOptionsTierras = async () => {
    try {
      const responseTierra = await searchTierrasAvailable()
      // Combina la opción seleccionada actual con los datos de la API (si no existe en la lista)
      const updatedOptions = seleccionTierra ?
      [seleccionTierra, ...responseTierra.filter((option) => option.id !== seleccionTierra.id)]
      : responseTierra
      const formatter = updatedOptions?.map(tipo =>(formatterDataCombo(tipo.id,tipo.uc)))
      setTierras(formatter)
    } catch (error) {
      console.error('Error al cargar las opciones:', error);
    }
  }
  const fetchOptionsProveedor = async () => {
    try {
      const responseProveedor = await searchProveedorAvailable()
      const updatedProveedor =  seleccionProveedor ?
      [seleccionProveedor, ...responseProveedor.filter((option) => option.id !== seleccionProveedor.id)]
      : responseProveedor
      const formatter = updatedProveedor?.map(tipo =>(formatterDataCombo(tipo.id,tipo.ut)))
      setProveedores(formatter)
    } catch (error) {
      console.error('Error al cargar las opciones:', error);
    }
  }

  const validarCampos = () => {
    const nuevosErrores = {}
    if (!ut) nuevosErrores.ut = "El campo UT es obligatorio."
    if (!uc) nuevosErrores.uc = "El campo UC es obligatorio."
    if (!fecha) nuevosErrores.fecha = "El campo Fecha es obligatorio."
  
    setErrores(nuevosErrores)
  
    return Object.keys(nuevosErrores).length === 0 // Solo es válido si no hay errores
  }
  const handleGuardar = async(e) => {
    e.preventDefault()
    if (validarCampos()) {
      if(id > 0){
        const asigna = await asignaTierraUpdate({
          asignarTierraId: id,
          asignarTierraProveedorId: ut,
          asignarTierraTierraId: uc,
          asignarTierraFecha: fecha,
          userModifiedName: "ADMIN",
          userModifiedAt: obtenerFechaLocal({date: new Date()})
        })
        return retorna(asigna)
      }
      const asigna = await asignaTierraSave({
        asignarTierraProveedorId: ut,
        asignarTierraTierraId: uc,
        asignarTierraFecha: fecha,
        userCreatedName: "ADMIN",
        userCreatedAt: obtenerFechaLocal({date: new Date()}).split('T')[0]
      })
      return retorna(asigna)
    }
  }
  const handleCancelar = (e) => {
    e.preventDefault()
    onShowModel({id:0, ut:ut, uc:uc, fecha:fecha, activo:true })
  }
  const retorna = (asigna) => {
    return onShowModel({id:asigna.id, ut:asigna.ut, 
      uc:asigna.uc, fecha:fecha, activo:asigna.activo })
  }
  const handleSelectionChangeProveedor = (option) => {
    setUt(option)
  };
  const handleSelectionChangeTierra = (option) => {
    setUC(option)
  };
  return (
    <>
      <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-bold text-[#313395]">
                {data.id >0 ? 'Editar' : 'Registrar'} Asignar Tierra
              </h3>
            </div>
            {/*body*/}
            <form action="" className="space-y-4 p-5">
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className='space-y-2 hidden'>
                  <label htmlFor="AsignaTierraIdModal" className="text-black">ID</label>
                  <input
                      type="text"
                      className={`bg-transparent focus:outline-none w-full text-black border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                      errores.id ? "border-red-500" : ""
                    }`}
                      name="query"
                      placeholder="Ingrese el Id"
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                  />
                  {errores.id && <p className="text-red-500 text-sm">{errores.id}</p>}
                </div>
                <div className='space-y-2'>
                    <label htmlFor="AsignaTierraFechaModal" className="text-black font-semibold">Fecha</label>
                    <input type='date' className={`bg-transparent focus:outline-none w-full text-black border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                        errores.fecha ? "border-red-500" : ""
                    }`}
                        name='query' placeholder='Ejm: 20/11/2024'
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                    />
                    {errores.fecha && <p className="text-red-500 text-sm">{errores.fecha}</p>}
                </div>
                <div className='space-y-2'>
                  <label htmlFor="AsignaTierraUTModal" className="text-black font-semibold">UT/Proveedor</label>
                  <ComboBoxCustom initialOptions={provedores} selectedOption={seleccionProveedor} 
                    onSelectionChange={handleSelectionChangeProveedor}
                    className={`bg-transparent focus:outline-none w-full text-black border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                      errores.ut ? "border-red-500" : ""
                  }`}
                  />
                  {errores.ut && <p className="text-red-500 text-sm">{errores.ut}</p>}
                </div>
                <div className='space-y-2'>
                  <label htmlFor="AsignaTierraUTModal" className="text-black font-semibold">UC/Tierra</label>
                  <ComboBoxCustom initialOptions={tierras} selectedOption={seleccionTierra} 
                    onSelectionChange={handleSelectionChangeTierra}
                    className={`bg-transparent focus:outline-none w-full text-black border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                      errores.uc ? "border-red-500" : ""
                  }`}
                  />
                  {errores.uc && <p className="text-red-500 text-sm">{errores.uc}</p>}
                </div>
              </div>
            </form>
            {/*footer*/}
            <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="bg-[#313395] text-white active:bg-gray-700 font-bold uppercase text-sm px-6 py-3 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={ handleGuardar}
                >
                  Guardar
                </button>
                <button
                  className="bg-gray-500 text-white active:bg-gray-300 font-bold uppercase text-sm px-6 py-3 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={handleCancelar}
                >
                  Cancelar
                </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}
