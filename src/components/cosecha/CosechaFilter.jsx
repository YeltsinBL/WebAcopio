import { useEffect, useState } from "react"
import { searchCosechaTipo } from "../../services/cosecha"
import ComboBoxCustom from "../common/ComboBoxCustom"
import { formatterDataCombo } from "../common/FormatteData"

const CosechaFilter = ({onFiltersValue}) => {
    const [ucFilter, setUCFilter] = useState('')
    const [utFilter, setUTFilter] = useState('')
    const [fechaDesdeFilter, setFechaDesdeFilter] = useState('')
    const [fechaHastaFilter, setFechaHastaFilter] = useState('')
    const [cosechaFilter, setCosechaFilter] = useState('')
    const [cosechaTipo, setCosechaTipo] = useState([])

    useEffect(() => {
        fetchOptionCosechaTipo()
    }, [])
    const sendDataToParent = (event) => {
        event.preventDefault()
        onFiltersValue({uc:ucFilter, ut:utFilter, 
            fechaDesde:fechaDesdeFilter, fechaHasta: fechaHastaFilter,
            cosecha:cosechaFilter
        })
    }
    const fetchOptionCosechaTipo = async() => {
      try {
        const responseTipo = await searchCosechaTipo()
        const formatter= responseTipo?.map(tipo =>(
          formatterDataCombo(tipo.cosechaTipoId, tipo.descripcion)))
        setCosechaTipo(formatter)
      } catch (error) {
        console.error('Error al cargar fetchOptionCosechaTipo:', error);
      }
    }
    const handleSelectionChangeCosechaTipo = (option) => {
      setCosechaFilter(option)
    };
  return (
    <div className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'>
		<form action="">
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4'>
                <div className='flex flex-col gap-1 w-1/8'>
                    <label htmlFor="CosechaUC" className="text-white">UC</label>
                    <input type='text' className='bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500'
                        name='query' placeholder='Ingrese el código UC'
                        value={ucFilter}
                        onChange={(e) => setUCFilter(e.target.value)}
                    />
                </div>
                <div className='flex flex-col gap-1 w-1/8'>
                    <label htmlFor="CosechaUT" className="text-white">UT</label>
                    <input type='text' className='bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500'
                        name='query' placeholder='Ingrese el código UT'
                        value={utFilter}
                        onChange={(e) => setUTFilter(e.target.value)}
                    />
                </div>
                <div className='flex flex-col gap-1 w-1/8'>
                    <label htmlFor="CosechaFechaDesde" className="text-white">Fecha Desde</label>
                    <input type='date' className='bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500'
                        name='query' placeholder='Ejm: 20/11/2024'
                        value={fechaDesdeFilter}
                        onChange={(e) => setFechaDesdeFilter(e.target.value)}
                    />
                </div>
                <div className='flex flex-col gap-1 w-1/8'>
                    <label htmlFor="CosechaFechaHasta" className="text-white">Fecha Hasta</label>
                    <input type='date' className='bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500'
                        name='query' placeholder='Ejm: 20/11/2024'
                        value={fechaHastaFilter}
                        onChange={(e) => setFechaHastaFilter(e.target.value)}
                    />
                </div>
                <div className='flex flex-col gap-1 w-1/8'>
                    <label htmlFor="CosechaTipo" className="text-white">Cosecha</label>
                    <ComboBoxCustom initialOptions={cosechaTipo} disabled={false}
                      onSelectionChange={handleSelectionChangeCosechaTipo}
                      className={'bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 '}
                      colorOptions={"text-black"}
                    />
                </div>
                
                <button 
                    className="bg-[#313395] text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded-lg shadow hover:shadow-lg outline-none 
                    focus:outline-none mr-1 mt-6 md:w-28 ease-linear transition-all duration-150 "
                    onClick={sendDataToParent}>
                    Buscar
                </button>
            </div>
        </form>
	</div>
  )
}

export default CosechaFilter