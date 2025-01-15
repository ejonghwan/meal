"use client"

import React, { useState, memo } from 'react'

const ChildrenHo = () => {

  console.log('여기는 자식2번')

  const [n, setN] = useState(1)

  const handleClick = () => {
    setN(prev => prev + 1)
  }

  return (
    <div className='border border-solid border-blue-500 m-[50px]'>
      <h3>ChildrenHo {n}</h3>
      <button type='button' onClick={handleClick}>++</button>
    </div>
  )
}

export default memo(ChildrenHo)