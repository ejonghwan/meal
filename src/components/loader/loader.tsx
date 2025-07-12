

import React from 'react'
import '@/src/styles/common/loader.css'

interface Props {
   className?: 'loader--type1' | 'loader--type2'
}

// class = loader--type1 loader--type2
const Loader = ({ className }: Props) => {
   return (
      <div className={`${className ? className : 'loader--type1'}`}></div>
   )
}

export default Loader