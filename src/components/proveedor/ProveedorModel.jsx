import { useEffect, useState } from "react"
import { proveedorSave, proveedorUpdate } from "../../services/proveedor"
import { obtenerFechaLocal } from "../../utils"

export const ProveedorModel = ({ onShowModel, data }) => {
  const [id, setId] = useState('')
  const [ut, setUt] = useState('')
  const [dni, setDni] = useState('')
  const [nombre, setNombre] = useState('')
  const [apePat, setApePat] = useState('')
  const [apeMat, setApeMat] = useState('')
  const [activo, setActivo] = useState(true)
  const [errores, setErrores] = useState({})

  useEffect(() => {
    setId(data.id || 0)
    setUt(data.ut || '')
    setDni(data.dni || '')
    setNombre(data.nombre || '')
    setApePat(data.apellidoPaterno || '')
    setApeMat(data.apellidoMaterno || '')
    setActivo(data.activo || true)
  }, [data])

  const validarCampos = () => {
    const nuevosErrores = {}
    //if (!id) nuevosErrores.id = "El campo ID es obligatorio."
    if (!ut) nuevosErrores.ut = "El campo UT es obligatorio."
    if (!dni) nuevosErrores.dni = "El campo DNI es obligatorio."
    if (!nombre) nuevosErrores.nombre = "El campo Nombre es obligatorio."
    if (!apePat) nuevosErrores.apePat = "El campo Apellido Paterno es obligatorio."
    if (!apeMat) nuevosErrores.apeMat = "El campo Apellido Materno es obligatorio."
  
    setErrores(nuevosErrores)
  
    return Object.keys(nuevosErrores).length === 0 // Solo es válido si no hay errores
  }
  const handleGuardar = async(e) => {
    e.preventDefault()
    if (validarCampos()) {
      if(id > 0) {
        const proveedor = await proveedorUpdate({proveedorId:id, proveedorUT:ut, personDNI:dni,
          personName:nombre, personPaternalSurname:apePat,
          personMaternalSurname: apeMat, proveedorStatus:activo,
          userModifiedName:"ADMIN", userModifiedAt: obtenerFechaLocal({date: new Date()})
        })
        return onShowModel({id:proveedor.id, ut:ut, dni:dni,
          nombre:proveedor.nombre, activo:activo
        })
      }
      const proveedor = await proveedorSave({proveedorUT:ut, personDNI:dni,
        personName:nombre, personPaternalSurname:apePat,
        personMaternalSurname: apeMat, person_Type: 2, proveedorStatus:activo,
        userCreatedName:"ADMIN", userCreatedAt: obtenerFechaLocal({date: new Date()})
      })
      return onShowModel({id:proveedor.id, ut:ut, dni:dni,
        nombre:proveedor.nombre, activo:activo
      })
    }
  }
  const handleCancelar = (e) => {
    e.preventDefault()
    onShowModel({id:id, ut:ut, dni:dni,
        nombre:nombre + ' ' + apePat+ ' ' + apeMat, activo:activo
    }) // Llama a la función del padre con el valor
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
              <h3 className="text-3xl font-bold text-[#313395]">
                {data.id >0 ? 'Editar' : 'Registrar'} Proveedor
              </h3>
            </div>
            {/*body*/}
            <form action="" className="space-y-4 p-5">
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 '>
                <div className='space-y-2 hidden'>
                  <label htmlFor="ProveedorIdModal" className="text-black">ID</label>
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
                  <label htmlFor="ProveedorUTModal" className="text-black font-semibold">UT</label>
                  <input 
                      type='text' 
                      className={`bg-transparent focus:outline-none w-full text-black border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                      errores.ut ? "border-red-500" : ""
                    }`}
                      name='query' placeholder='Ingrese el código UT'
                      value={ut}
                      onChange={(e) => setUt(e.target.value)}
                  />
                  {errores.ut && <p className="text-red-500 text-sm">{errores.ut}</p>}
                </div>
                <div className='space-y-2'>
                    <label htmlFor="ProveedorDNIModal" className="text-black font-semibold">DNI</label>
                    <input type='text' className={`bg-transparent focus:outline-none w-full text-black border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                        errores.dni ? "border-red-500" : ""
                    }`}
                        name='query' placeholder='Ingrese el DNI'
                        value={dni}
                        onChange={(e) => setDni(e.target.value)}
                    />
                    {errores.dni && <p className="text-red-500 text-sm">{errores.dni}</p>}
                </div>
                <div className='w-full'>
                    <label htmlFor="ProveedorNombreModal" className="text-black font-semibold">Nombre</label>
                    <input type='text' className={`bg-transparent focus:outline-none w-full text-black border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                        errores.nombre ? "border-red-500" : ""
                    }`}
                        name='query' placeholder='Ingrese el nombre'
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                    {errores.nombre && <p className="text-red-500 text-sm">{errores.nombre}</p>}
                </div>
                <div className='space-y-2'>
                    <label htmlFor="ProveedorApePatModal" className="text-black font-semibold">Apellido Paterno</label>
                    <input type='text' className={`bg-transparent focus:outline-none w-full text-black border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                        errores.apePat ? "border-red-500" : ""
                    }`}
                        name='query' placeholder='Ingrese el apellido paterno' 
                        value={apePat}
                        onChange={(e) => setApePat(e.target.value)}
                    />
                    {errores.apePat && <p className="text-red-500 text-sm">{errores.apePat}</p>}
                </div>
                <div className='space-y-2'>
                    <label htmlFor="ProveedorApeMatModal" className="text-black font-semibold">Apellido Materno</label>
                    <input type='text' className={`bg-transparent focus:outline-none w-full text-black border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                        errores.apeMat ? "border-red-500" : ""
                    }`}
                        name='query' placeholder='Ingrese el apellido materno'
                        value={apeMat}
                        onChange={(e) => setApeMat(e.target.value)}
                    />
                    {errores.apeMat && <p className="text-red-500 text-sm">{errores.apeMat}</p>}
                </div>
                <div className='space-y-2'>
                    <label htmlFor="ProveedorActivoModal" className="text-black pr-3 font-semibold">Activo</label>
                    <input type="checkbox" id="activo" 
                    checked={activo}
                    onChange={(e) => setActivo(e.target.checked)}/>
                </div>
                {/* <button 
                    className='bg-black h-full p-5 px-10 rounded-[10px] text-white cursor-pointer hover:bg-gray-400'
                    onClick={sendDataToParent}>
                    Buscar
                </button> */}
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
