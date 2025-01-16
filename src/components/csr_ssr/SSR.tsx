import React from 'react'

const SSR = ({ data }) => {
   return (
      <div>
         <h2>SSR</h2>
         <ul>
            {data.map((item: any, idx: number) => {
               return (
                  <li key={idx}>{item.title}</li>
               )
            })}
         </ul>
      </div>
   )
}

export default SSR