
"use client"

import React, { useState, useEffect } from 'react'
import Main from '@/src/components/common/main'
import { useUserStore } from '@/src/store/front/user'
import RestaurantTable from '@/src/components/restaurant/restaurant-table'
// import { useRestaurantList } from '@/src/store/queryies/restaurant/restaurantQueries'
import { useRestaurantListInfinite } from '@/src/store/queryies/restaurant/restaurantQueries'
import CategoryWrap from '@/src/components/category-list/category-list-wrap'
import { useSearchParams } from 'next/navigation'




const HomePage = () => {

   const searchParams = useSearchParams()
   const category = searchParams.get('search') || '전체'
   // const { data: restaurantData, isError: restaurantError, isSuccess: restaurantSuccess, isLoading: restaurantLoading } = useRestaurantList(listLength, category)

   const {
      data: restaurantData,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      isError: restaurantError,
      isLoading: restaurantLoading,
      isSuccess: restaurantSuccess
   } = useRestaurantListInfinite(10, category);


   // useEffect(() => {
   //    console.log('???????????????', restaurantData, 'ohoho', restaurantData?.pages.flatMap(page => page.data) ?? [])
   // }, [restaurantData])


   // const { userInfo, setUserLogout } = useUserStore()
   // // const { loading } = useRestaurantList()
   // useEffect(() => {
   // }, [userInfo])

   return (
      <>
         <Main>
            <CategoryWrap />
            <RestaurantTable
               restaurantData={restaurantData?.pages.flatMap(page => page.data) ?? []}
               restaurantSuccess={restaurantSuccess}
               restaurantError={restaurantError}
               restaurantLoading={restaurantLoading}
               fetchNextPage={fetchNextPage}
               hasNextPage={hasNextPage}
               isFetchingNextPage={isFetchingNextPage}
            />
         </Main>

      </>
   )
}

export default HomePage