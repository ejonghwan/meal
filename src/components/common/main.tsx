"use client"

import React, { useEffect } from 'react'
import { useLoad } from '@/src/hooks/use-userLoad';

const Main = ({ children }) => {

   const { userInfo } = useLoad();
   
   useEffect(() => {
      
      userInfo() && console.log('userInfo', userInfo)

   }, [])

   return (
      <main>
         {children}
      </main>
   )
}

export default Main