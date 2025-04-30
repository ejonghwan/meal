
"use client"

import React from 'react'
import Main from '@/src/components/common/main'
import { useUserStore } from '@/src/store/front/user'

const HomePage = () => {


   const { setUserLogout } = useUserStore()

   return (
      <div>HomePage

         <Main>
            ahoho
            <button type='button' onClick={() => setUserLogout()}>로그아웃</button>
         </Main>

      </div>
   )
}

export default HomePage