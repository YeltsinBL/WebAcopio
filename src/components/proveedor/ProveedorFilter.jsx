import { useState } from "react"

const ProveedorFilter = ({onUTValue}) => {
    const [utFilter, setUTFilter] = useState('')
    const [dniFilter, setDNIFilter] = useState('')
    const [nombreFilter, setNombreFilter] = useState('')

    const sendDataToParent = (event) => {
        event.preventDefault()
        onUTValue({ut:utFilter, dni:dniFilter, nombre:nombreFilter}) // Llama a la función del padre con el valor
    }

  return (
    <div className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'>
		<form action="">
            <div className='firstDiv flex justify-between items-center '>
                <div className='flex flex-col gap-1 w-1/8'>
                    <label htmlFor="ProveedorUT" className="text-white">UT</label>
                    <input type='text' className='bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500'
                        name='query' placeholder='Ingrese el código UT'
                        value={utFilter}
                        onChange={(e) => setUTFilter(e.target.value)}
                    />
                </div>
                <div className='flex flex-col gap-1 w-1/8'>
                    <label htmlFor="ProveedorDNI" className="text-white">DNI</label>
                    <input type='text' className='bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500'
                        name='query' placeholder='Ingrese el DNI'
                        value={dniFilter}
                        onChange={(e) => setDNIFilter(e.target.value)}
                    />
                </div>
                <div className='flex flex-col gap-1 w-1/4'>
                    <label htmlFor="ProveedorNombre" className="text-white">Nombre</label>
                    <input type='text' className='bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500'
                        name='query' placeholder='Ingrese nombre y/o apellido'
                        value={nombreFilter}
                        onChange={(e) => setNombreFilter(e.target.value)}
                    />
                </div>
                <button 
                    className="bg-[#313395] text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    onClick={sendDataToParent}>
                    Buscar
                </button>
            </div>
        </form>
	</div>
  )
}

export default ProveedorFilter