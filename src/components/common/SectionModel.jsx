import React from 'react'

const SectionModel = ({title, children}) => {
  return (
    <div className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'>
	  <div className="flex items-start justify-between py-5 rounded-t">
        <h3 className="text-3xl font-semibold text-white">
          {title}
        </h3>
      </div>
      {children}
    </div>
  )
}

export default SectionModel