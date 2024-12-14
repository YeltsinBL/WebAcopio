export const TableButton = ({className, onRowSelect, children})=>{
  return (
    <button
      className={className}
      onClick={onRowSelect}
    >
      {children}
    </button>
  )
}