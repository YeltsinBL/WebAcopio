import { useState } from "react"


const TierrasFilter = ({onFiltersValue}) => {
    const [ucFilter, setUcFilter] = useState('')
    const [campoFilter, setCampoFilter] = useState('')
    const [sectorFilter, setSectorFilter] = useState('')
    const [valleFilter, setValleFilter] = useState('')

    const handleSearch = (e) => {
        e.preventDefault()
        onFiltersValue({uc:ucFilter, campo:campoFilter, sector:sectorFilter, valle: valleFilter})
    }

  return (
    <div className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'>
		<form action="">
            <div className='firstDiv flex justify-between items-center '>
                <div className='flex flex-col gap-1 w-1/8'>
                    <label htmlFor="TierraUC" className="text-white">UC</label>
                    <input type='text' className='bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500'
                        name='query' placeholder='Ingrese el código UC'
                        value={ucFilter}
                        onChange={(e) => setUcFilter(e.target.value)}
                    />
                </div>
                <div className='flex flex-col gap-1 w-1/8'>
                    <label htmlFor="TierraCampo" className="text-white">Campo</label>
                    <input type='text' className='bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500'
                        name='query' placeholder='Ejm: Guayaquil'
                        value={campoFilter}
                        onChange={(e) => setCampoFilter(e.target.value)}
                    />
                </div>
                <div className='flex flex-col gap-1 w-1/8'>
                    <label htmlFor="TierraSector" className="text-white">Sector</label>
                    <input type='text' className='bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500'
                        name='query' placeholder='Ejm: Molino Larco'
                        value={sectorFilter}
                        onChange={(e) => setSectorFilter(e.target.value)}
                    />
                </div>
                <div className='flex flex-col gap-1 w-1/8'>
                    <label htmlFor="TierraValle" className="text-white">Valle</label>
                    <input type='text' className='bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500'
                        name='query' placeholder='Ejm: Chicama'
                        value={valleFilter}
                        onChange={(e) => setValleFilter(e.target.value)}
                    />
                </div>
                <button 
                    className="bg-[#313395] text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    onClick={handleSearch}>
                    Buscar
                </button>
            </div>
        </form>
	</div>
  )
}

export default TierrasFilter