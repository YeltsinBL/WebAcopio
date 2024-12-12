import React from 'react'

export const Footer = ({children}) => {
  return (
    <div className="grid grid-cols-1 md:flex justify-end gap-2 p-6">
        {children}
    </div>
  )
}
