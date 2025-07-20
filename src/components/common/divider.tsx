import React from 'react'

const Divider = ({ className }: { className?: string }) => {
   return (
      <div className={className ? className : 'bg-divider100 h-[5px] w-full'}></div>
   )
}

export default Divider