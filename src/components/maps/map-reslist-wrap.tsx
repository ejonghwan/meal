"use client"

import React, { useEffect, useState } from 'react'
import MapResList from '@/src/components/maps/map-reslist';
import Main from '@/src/components/common/main'
import { useUserStore } from '@/src/store/front/user'
import RestaurantTable from '@/src/components/restaurant/restaurant-table'
// import { useRestaurantList } from '@/src/store/queryies/restaurant/restaurantQueries'
import { useRestaurantListInfinite } from '@/src/store/queryies/restaurant/restaurantQueries'
import CategoryWrap from '@/src/components/category-list/category-list-wrap'
import { useSearchParams } from 'next/navigation'






const test = [
]

const MapResListWrap = () => {


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
    } = useRestaurantListInfinite(100);



    const [myRestaurantList, setMyRestaurantList] = useState([])


    // useEffect(() => {
    //     console.log('??restaurantData', restaurantData)
    // }, [restaurantData])



    return (
        <>
            {/* {test?.map((restaurant, index) => (
             <MapLoad 
                    key={index}
                    mapData={{
                        name: restaurant.name,
                        // rating: restaurant.totalRating || 0,
                        location: { lat: parseFloat(restaurant.y), lng: parseFloat(restaurant.x) }
                    }}
                    className='w-full h-[250px] border rounded-md mb-4'
                />
            ))} */}
            {/* {test?.map((restaurant, index) => (
                <MapSelect key={restaurant.id + index} keyword={restaurant.name} />
            ))} */}

            {restaurantData?.pages[0].data && <MapResList address={test} isAddressSearch={true} restaurant={restaurantData?.pages[0].data} setMyRestaurantList={setMyRestaurantList} className='w-[100vw] h-[100vh] !fixed top-0' />}
        </>
    )
}

export default MapResListWrap