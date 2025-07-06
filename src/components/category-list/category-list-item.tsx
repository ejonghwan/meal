import React from 'react'

const categoryItem = ({ category, clickIndex }) => {
   return (
      <span className={`category__list--name w-auto ${category.id === clickIndex ? 'active' : ''}`} >
         {category.value}
      </span>
   )
}

export default categoryItem