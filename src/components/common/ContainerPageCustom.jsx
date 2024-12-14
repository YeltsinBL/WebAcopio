import React from 'react'

export const ContainerPageCustom = ({children}) => {
  return (
    <div className='flex-1 overflow-auto relative z-10'>
      {children}
    </div>
  )
}
