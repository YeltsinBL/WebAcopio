import { useState } from "react"

const TierraModel = ({ onShowModel, data }) => {
  const [id, setId] = useState(data.id)
  const [uc, setUc] = useState(data.uc)
  const [campo, setCampo] = useState(data.campo)
  const [sector, setSector] = useState(data.sector)
  const [valle, setValle] = useState(data.valle)
  const [ha, setHA] = useState(data.ha)
  const [activo, setActivo] = useState(data.activo)
  const [errores, setErrores] = useState({})

  const validarCampos = () => {
    const nuevosErrores = {}
    if (!id) nuevosErrores.id = "El campo ID es obligatorio."
    if (!uc) nuevosErrores.uc = "El campo UC es obligatorio."
    if (!campo) nuevosErrores.campo = "El campo Campo es obligatorio."
    if (!sector) nuevosErrores.sector = "El campo Sector es obligatorio."
    if (!valle) nuevosErrores.valle = "El campo Valle es obligatorio."
    if (!ha) nuevosErrores.ha = "El campo H.A. es obligatorio."
  
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
    sendDataDismissModel()
  }
  const sendDataDismissModel = () => {
    onShowModel({id:id, uc:uc, campo:campo,
        sector:sector, valle:valle,
        ha: ha, activo:activo
    })
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
                {data.id >0 ? 'Editar' : 'Registrar'} Tierra
              </h3>
            </div>
            {/*body*/}
            <form action="" className="space-y-4 p-5">
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <label htmlFor="TierraIdModal" className="text-black">ID</label>
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
                  <label htmlFor="TierraUCModal" className="text-black">UT</label>
                  <input 
                      type='text' 
                      className={`bg-transparent focus:outline-none w-full text-black border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                      errores.uc ? "border-red-500" : ""
                    }`}
                      name='query' placeholder='Ingrese el código UC'
                      value={uc}
                      onChange={(e) => setUc(e.target.value)}
                  />
                  {errores.uc && <p className="text-red-500 text-sm">{errores.uc}</p>}
                </div>
                <div className='space-y-2'>
                    <label htmlFor="TierraCampoModal" className="text-black">Campo</label>
                    <input type='text' className={`bg-transparent focus:outline-none w-full text-black border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                        errores.campo ? "border-red-500" : ""
                    }`}
                        name='query' placeholder='Ingrese el Campo'
                        value={campo}
                        onChange={(e) => setCampo(e.target.value)}
                    />
                    {errores.campo && <p className="text-red-500 text-sm">{errores.campo}</p>}
                </div>
                <div className='w-full'>
                    <label htmlFor="TierraSectorModal" className="text-black">Sector</label>
                    <input type='text' className={`bg-transparent focus:outline-none w-full text-black border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                        errores.sector ? "border-red-500" : ""
                    }`}
                        name='query' placeholder='Ingrese el sector'
                        value={sector}
                        onChange={(e) => setSector(e.target.value)}
                    />
                    {errores.sector && <p className="text-red-500 text-sm">{errores.sector}</p>}
                </div>
                <div className='space-y-2'>
                    <label htmlFor="TierraValleModal" className="text-black">Valle</label>
                    <input type='text' className={`bg-transparent focus:outline-none w-full text-black border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                        errores.valle ? "border-red-500" : ""
                    }`}
                        name='query' placeholder='Ingrese el apellido paterno' 
                        value={valle}
                        onChange={(e) => setValle(e.target.value)}
                    />
                    {errores.valle && <p className="text-red-500 text-sm">{errores.valle}</p>}
                </div>
                <div className='space-y-2'>
                    <label htmlFor="TierraHAModal" className="text-black">H.A.</label>
                    <input type='text' className={`bg-transparent focus:outline-none w-full text-black border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                        errores.ha ? "border-red-500" : ""
                    }`}
                        name='query' placeholder='Ingrese el apellido materno'
                        value={ha}
                        onChange={(e) => setHA(e.target.value)}
                    />
                    {errores.ha && <p className="text-red-500 text-sm">{errores.ha}</p>}
                </div>
                <div className='space-y-2'>
                    <label htmlFor="TierraActivoModal" className="text-black pr-3">Activo</label>
                    <input type="checkbox" id="activo" 
                    checked={activo}
                    onChange={(e) => setActivo(e.target.checked)}/>
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

export default TierraModel