import React from 'react'
import { FormatteDecimal } from '../../utils'

export const InputTextCustom = ({textValue, valueError='', placeholder='', readOnly=false,  onChange}) => {
  return (
    <input type='text' 
      className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 
        ${ valueError ? "border-red-500" : "" }
      `}
      name='query' placeholder={placeholder}
      value={textValue}
      readOnly = {readOnly}
      onChange={(e) => onChange(e.target.value) }
    />
  )
}
export const InputNumberCustom = ({textValue, valueError='', placeholder='', readOnly=false,  onChange}) => {
  return (
    <input type='text' 
      className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 
        ${ valueError ? "border-red-500" : "" }
      `}
      name='query' placeholder={placeholder}
      value={textValue}
      readOnly = {readOnly}
      onChange={(e) => onChange(parseInt(e.target.value) || '') }
    />
  )
}
export const InputDecimalCustom = ({textValue, valueError='', placeholder='', readOnly=false,  onChange}) => {
  const handleChange = (e) => {
    const inputValue = e.target.value
    if (/^\d*\.?\d{0,3}$/.test(inputValue)) 
      return onChange(inputValue)
  }
  return (
    <input type='text' 
      className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 
        ${ valueError ? "border-red-500" : "" }
      `}
      name='query' placeholder={placeholder}
      value={textValue}
      readOnly = {readOnly}
      onChange={handleChange}
    />
  )
}
