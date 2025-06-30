
"use client"

import React, { useEffect } from 'react'
import Main from '@/src/components/common/main'
import { useUserStore } from '@/src/store/front/user'
import RestaurantTable from '@/src/components/restaurant/restaurant-table'
import { useRestaurantList } from '@/src/store/queryies/restaurant/restaurantQueries'

const HomePage = () => {


   // const { userInfo, setUserLogout } = useUserStore()
   // // const { loading } = useRestaurantList()
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