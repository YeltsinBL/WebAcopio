
import { Edit, Trash2 } from "lucide-react"

export const AsignaTierraTable = ({AsignaTierra_DATA, onRowSelect, eliminarProducto}) => {
    return (
		<div className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-xl font-semibold text-gray-100'>Lista de Tierras Asignadas</h2>
			</div>

			<div className="overflow-auto max-h-[350px]">
				<table className="table-auto w-full divide-y divide-gray-700">
					<thead className="bg-gray-800  sticky top-0 z-10">
						<tr>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden'>
								ID
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								UC
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								UT
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Fecha
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Activo
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Acciones
							</th>
						</tr>
					</thead>

					<tbody className='divide-y divide-gray-700'>
						{AsignaTierra_DATA?.length > 0 ? (
							AsignaTierra_DATA.map((product) => (
							<tr key={product.id} >
								<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 gap-2 items-center hidden'>
									{product.id}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									{product.uc}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									{product.ut}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									{product.fecha.toLocaleDateString('es-PE')}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									{product.activo ? "Sí" : "No"}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-30 '>
									<button
										className="text-blue-500 hover:text-blue-700 px-3"
										onClick={() => onRowSelect(product)}
										>
										<Edit size={18} />
									</button>
									<button className='text-red-400 hover:text-red-300' 
										onClick={(e) => {
											e.preventDefault()
											eliminarProducto(product.id)}
										}>
										<Trash2 size={18} />
									</button>
								</td>
							</tr>
							))
						): (
							<tr>
							  <td colSpan={5} className="text-center py-4">
								No hay tierras registradas
							  </td>
							</tr>
						)
						
						}
					</tbody>
				</table>
			</div>
		</div>
	)
}
