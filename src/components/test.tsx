"use client"

import React, { useEffect, useState } from 'react'

const Test = () => {
    
  const [dd, setDd] = useState([])

    // console.log('win out?', window )
    // useEffect(() => {
    //     console.log('win in?', window )
    // }, [])
    
    const handleLcick = () => {
      setDd(prev => [...prev, 'dd'])
      console.log('dd?', dd)
    }

    const handleSubmit = () => {
      console.log(dd)
    }

  return (
    <div>
      <button type='button' onClick={handleSubmit}>suyb</button>
      <button type='button' onClick={handleLcick}>zz</button>
    </div>
  )
}

export default Test