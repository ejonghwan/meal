
"use client"

import React, { useEffect } from 'react'
import Main from '@/src/components/common/main'
import { useUserStore } from '@/src/store/front/user'
import RestaurantTable from '@/src/components/restaurant/restaurant-table'
import { useRestaurantListAll } from '@/src/store/queryies/restaurant/restaurantQueries'

const HomePage = () => {


   const { userInfo, setUserLogout } = useUserStore()
   // const { loading } = useRestaurantListAll()
   useEffect(() => {
   }, [userInfo])

   return (
      <div>HomePage

         <Main>
            메인
            <RestaurantTable todos={[{ id: "a", is_done: false, title: "a title", created_at: "24" }]} />
         </Main>

      </div>
   )
}

export default HomePage