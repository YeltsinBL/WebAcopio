import React from 'react'

const FilterOption = ({htmlFor, name, type, placeholder, value, onChange, children}) => {
  return (
    <div className='flex flex-col gap-1 w-1/8'>
      <label htmlFor={htmlFor} className="text-white">{name}</label>
      {children ? 
        children:
        <input type={type} className='bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500'
          name='query' placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      }
    </div>
  )
}

export default FilterOption