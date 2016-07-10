import React from 'react'

const LayoutPage = ({children}) => {
  return (
    <div className='LayoutPage'>
      <h1>Página de secuencia de videos !!!!!</h1>
      <div className='LayoutPage-container'>{children}</div>
    </div>
  )
}

LayoutPage.displayName = 'LayoutPage'
export default LayoutPage
