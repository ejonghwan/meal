"use client"
import React from 'react'
import SSRChildren from './SSR_children'

const CSRChildren = ({ children }) => {
  return (
    <div>
        <h2>CSR_children</h2>
        <button type='button' onClick={() => alert('hoho test')}>hoho test</button>


        {/*아래껀 무한호출되면서 워닝뜸  */}
        {/* <div>
            <h2>SSRChildren 호출!</h2>
            <SSRChildren />
        </div> */}

        {/* 아래껀 SSR로 잘 됨 */}
        <div>
            <h2>SSRChildren children으로 호출!</h2>
            {children}
        </div>
        
    </div>
  )
}

export default CSRChildren