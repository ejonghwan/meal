
"use client"

import React, { useEffect } from 'react'
import Main from '@/src/components/common/main'
import { useUserStore } from '@/src/store/front/user'
import RestaurantTable from '@/src/components/restaurant/restaurant-table'
import { useRestaurantListAll } from '@/src/store/queryies/restaurant/restaurantQueries'

const HomePage = () => {


   // const { userInfo, setUserLogout } = useUserStore()
   // // const { loading } = useRestaurantListAll()
   // useEffect(() => {
   // }, [userInfo])

   return (
      <>
         <Main>
            <RestaurantTable />
         </Main>
      </>
   )
}

export default HomePage