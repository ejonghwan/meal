"use client"

import React, { useEffect } from 'react'

const Test = () => {
    


    console.log('win out?', window )
    useEffect(() => {
        console.log('win in?', window )
    }, [])
    
  return (
    <div>Test</div>
  )
}

export default Test