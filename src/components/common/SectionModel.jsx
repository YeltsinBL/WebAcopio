import React from 'react'

const SectionModel = ({title, children}) => {
  return (
    <div className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 pt-3 border border-gray-700 mb-8'>
	  <div className="flex items-start justify-between rounded-t">
        <h3 className="text-3xl font-semibold text-white">
          {title}
        </h3>
      </div>
      {children}
    </div>
  )
}

export default SectionModel