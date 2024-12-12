import React from 'react'

export const SectionFilter = ({children}) => {
  return (
    <div className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'>
		<form action="">
            <div className='grid grid-cols-1 md:grid-cols-5 gap-4 '>
            {children}
            </div>
        </form>
    </div>
  )
}
