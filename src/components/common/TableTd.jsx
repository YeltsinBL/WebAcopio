export const TableTd =({hidden=false, children}) =>{
  return (
    <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-300
     ${hidden ? 'hidden':''}`}>
      {children}
    </td>
  )
}