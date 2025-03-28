import React from 'react'

const layout = ({ children }) => {
   return (
      <div>
         <div>hoho1</div>
         <div>{children}</div>
         <div>hoho2</div>
      </div>
   )
}

export default layout