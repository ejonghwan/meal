"use client"

import React, { useState, useEffect, useCallback, useMemo, useRef, useContext, useReducer } from 'react'

const Children = () => {

  console.log('여기는 자식1번')

  const [n, setN] = useState(1)

  const handleClick = () => {
    setN(prev => prev + 1)
  }


  return (
    <div className='border border-solid border-yellow-500 m-[50px]'>
      <h3>Children {n}</h3>
      <button type='button' onClick={handleClick}>++</button>
    </div>
  )
}

export default Children