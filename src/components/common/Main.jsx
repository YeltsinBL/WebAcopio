import React from 'react'

const Main = ({children}) => {
  return (
    <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        {children}
    </main>
  )
}

export default Main