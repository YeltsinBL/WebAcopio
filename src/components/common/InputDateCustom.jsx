import React from 'react'

export const InputDateCustom = ({fechaValue, valueError= false, setFechaValue, readOnly = false}) => {
  return (
    <input type='date' 
      className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
        valueError ? "border-red-500" : ""
      }`}
      name='query' placeholder='Ejm: 20/11/2024'
      value={fechaValue}
      onChange={(e) => {setFechaValue(e.target.value)}}
      readOnly = {readOnly}
    />
  )
}
