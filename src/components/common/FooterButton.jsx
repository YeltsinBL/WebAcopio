import React from 'react'

export const FooterButton = ({accion , name}) => {
  return (
    <button 
      className="bg-[#313395] text-white active:bg-gray-700 
        hover:bg-gray-500 font-bold uppercase text-sm px-4 py-2 rounded-lg"
      onClick={accion} >
      {name}
    </button>
  )
}
