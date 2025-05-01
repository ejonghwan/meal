
"use client"

import React, { useEffect } from 'react'
import Main from '@/src/components/common/main'
import { useUserStore } from '@/src/store/front/user'

const HomePage = () => {


   const { userInfo, setUserLogout } = useUserStore()

   useEffect(() => {
   }, [userInfo])

   return (
      <div>HomePage

         <Main>
            메인
         </Main>

      </div>
   )
}

export default HomePage