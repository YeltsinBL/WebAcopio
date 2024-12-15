import React from 'react'

export const ContainerPopupCustom = ({children}) => {
  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative w-auto my-6 mx-auto w-3xl max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-800  ">
            {children}
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

export const SectionModelPopup =({title, children})=>{
  return(
    <>
      <div className="flex items-start justify-center p-5 border-b border-solid border-white rounded-t">
        <h3 className="text-3xl font-bold text-white">
          {title}
        </h3>
      </div>
      {children}
    </>
  )
}