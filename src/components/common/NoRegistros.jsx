import React from 'react'

export const NoRegistros = ({colSpan}) => {
  return (
    <tr>
	  <td colSpan={colSpan} className="text-center py-4">
		No hay registros
	  </td>
	</tr>
  )
}
