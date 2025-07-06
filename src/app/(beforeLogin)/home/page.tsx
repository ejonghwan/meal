
"use client"

import React, { useEffect } from 'react'
import Main from '@/src/components/common/main'
import { useUserStore } from '@/src/store/front/user'
import RestaurantTable from '@/src/components/restaurant/restaurant-table'
import { useRestaurantList } from '@/src/store/queryies/restaurant/restaurantQueries'
import CategoryWrap from '@/src/components/category-list/category-list-wrap'
import { useSearchParams } from 'next/navigation'




const HomePage = () => {

   const searchParams = useSearchParams()
   const category = searchParams.get('search') || '전체'
   const { data: restaurantData, isError: restaurantError, isSuccess: restaurantSuccess, isLoading: restaurantLoading } = useRestaurantList(10, category)

   // const { userInfo, setUserLogout } = useUserStore()
   // // const { loading } = useRestaurantList()
   // useEffect(() => {
   // }, [userInfo])

   return (
      <>
         <Main>
            <CategoryWrap />
            <RestaurantTable
               restaurantData={restaurantData}
               restaurantSuccess={restaurantSuccess}
               restaurantError={restaurantError}
               restaurantLoading={restaurantLoading}
            />
         </Main>

      </>
   )
}

export default HomePage