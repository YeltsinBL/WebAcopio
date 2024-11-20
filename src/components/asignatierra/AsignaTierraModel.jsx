import { useEffect, useState } from "react"
import { convertirFechaISOParaInput, PROVEEDOR_DATA, TIERRA_DATA } from "../mocks/DataList"

const AsignaTierraModel = ({ onShowModel, data }) => {
  const [id, setId] = useState('')
  const [ut, setUt] = useState('')
  const [uc, setUC] = useState('')
  const [fecha, setFecha] = useState('')
//   const [activo, setActivo] = useState(data.activo)
  useEffect(() => {
    if (data) {
      setId(data.id || 0);
      setUt(data.ut || "");
      setUC(data.uc || "");
      setFecha(data.fecha ? convertirFechaISOParaInput(data.fecha) : ""); // Convertir la fecha
    }
  }, [data]);

  const [errores, setErrores] = useState({})

  const validarCampos = () => {
    const nuevosErrores = {}
    if (!id) nuevosErrores.id = "El campo ID es obligatorio."
    if (!ut) nuevosErrores.ut = "El campo UT es obligatorio."
    if (!uc) nuevosErrores.uc = "El campo UC es obligatorio."
    if (!fecha) nuevosErrores.fecha = "El campo Fecha es obligatorio."
  
    setErrores(nuevosErrores)
  
    return Object.keys(nuevosErrores).length === 0 // Solo es válido si no hay errores
  }
  const handleGuardar = (e) => {
    e.preventDefault()
    if (validarCampos()) {
      sendDataDismissModel()
    }
  }
  const handleCancelar = (e) => {
    e.preventDefault()
    sendDataDismissModel(true)
  }
  const sendDataDismissModel = (cancel=false) => {
    onShowModel({id:cancel ? 0: id, ut:ut, uc:uc, fecha:fecha, activo:true })
  }
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
              <h3 className="text-3xl font-semibold text-black">
                {data.id >0 ? 'Editar' : 'Registrar'} Asignar Tierra
              </h3>
            </div>
            {/*body*/}
            <form action="" className="space-y-4 p-5">
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
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
                  <label htmlFor="AsignaTierraUCModal" className="text-black">UC/Tierra</label>
                  <select
                        id="tierra"
                        value={uc}
                        onChange={(e) => setUC(e.target.value)}
                        className={`bg-transparent focus:outline-none w-full text-black border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                            errores.uc ? "border-red-500" : ""
                          }`}>
                        <option value="">Selecciona la Tierra</option>
                        {TIERRA_DATA.map((tierra) => (
                            <option key={tierra.id} value={tierra.uc}>
                            {tierra.uc}
                            </option>
                        ))}
                        </select>
                  {errores.uc && <p className="text-red-500 text-sm">{errores.uc}</p>}
                </div>
                <div className='space-y-2'>
                  <label htmlFor="AsignaTierraUTModal" className="text-black">UT/Proveedor</label>
                  <select
                    id="proveedor"
                    value={ut}
                    onChange={(e) => setUt(e.target.value)}
                    className={`bg-transparent focus:outline-none w-full text-black border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                        errores.ut ? "border-red-500" : ""
                      }`}
                    >
                    <option value="">Selecciona al Proveedor</option>
                    {PROVEEDOR_DATA.map((proveedor) => (
                        <option key={proveedor.id} value={proveedor.ut}>
                        {proveedor.ut}
                        </option>
                    ))}
                    </select>
                  {errores.ut && <p className="text-red-500 text-sm">{errores.ut}</p>}
                </div>
                <div className='space-y-2'>
                    <label htmlFor="AsignaTierraFechaModal" className="text-black">Fecha</label>
                    <input type='date' className={`bg-transparent focus:outline-none w-full text-black border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                        errores.fecha ? "border-red-500" : ""
                    }`}
                        name='query' placeholder='Ejm: 20/11/2024'
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                    />
                    {errores.fecha && <p className="text-red-500 text-sm">{errores.fecha}</p>}
                </div>
              </div>
            </form>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="bg-black text-white active:bg-gray-700 font-bold uppercase text-sm px-6 py-3 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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

export default AsignaTierraModel