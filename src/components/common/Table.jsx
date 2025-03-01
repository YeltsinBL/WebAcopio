import React from 'react'

export const Table = ({nameTitle, headers, children }) => {
  return (
    <div className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'>
	  <div className='flex justify-between items-center mb-6'>
	  	<h2 className='text-xl font-semibold text-gray-100'>{nameTitle}</h2>
	  </div>
	  <div className="overflow-auto h-[350px]">
	  	<table className="table-auto w-full divide-y divide-gray-700">
          <thead className="bg-gray-800  sticky top-0 z-10">
            <tr>
              { headers.map((header, index) => (
                <th key={index} className={`px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider ${header =='ID' ? 'hidden':''}`}>
	  		        {header}
	  		    </th>
              ))}
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-700'>
            {children}
          </tbody>
	  	</table>
	  </div>
	</div>
  )
}

export const TableContainerCustom = ({children}) => {
  return (
    <div className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'>
	  {children}
    </div>
  )
}
export const TableHeaderCustom = ({grid=false, children}) => {
  return (
    <div className={`grid grid-cols-1 ${grid? '':'gap-6 md:flex'} justify-between items-center mb-6`}>
      {children}
    </div>
  )
}
export const TableBodyCustom = ({headers, children}) => {
  return (
    <div className="overflow-auto h-[350px]">
      <table className="table-auto w-full divide-y divide-gray-700">
        <thead className="bg-gray-900  sticky top-0 z-10">
          <tr>
            { headers.map((header, index) => (
              <th key={index} className={`px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider ${header =='ID' ? 'hidden':''}`}>
	  		      {header}
	  		      </th>
            ))}
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-700'>
            {children}
          </tbody>
      </table>
    </div>
  )
}
export const TableFooterCustom = ({children}) => {
  return (
    <div className='grid grid-cols-1 pt-6 md:grid-cols-2 lg:grid-cols-4 gap-4 '>
    {children}
    </div>
  )
}
