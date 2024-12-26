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
  const handleChange = (e) => {
    const inputValue = e.target.value
    const enterosRegex = /^\d+$/
    if (e.target.value=='' || enterosRegex.test(inputValue)) 
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
export const InputDecimalCustom = ({textValue, decimales=3, valueError='', placeholder='', readOnly=false,  onChange}) => {
  const handleChange = (e) => {
    const inputValue = e.target.value
    const decimalRegex = new RegExp(`^\\d*\\.?\\d{0,${decimales}}$`)
    if (decimalRegex.test(inputValue)) 
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
