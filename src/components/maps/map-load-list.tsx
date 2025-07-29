"use client"

import React from 'react'
import MapSelect from '@/src/components/maps/map-select';


const test = ["서울 중구 명동2가 3-3", "서울 중구 다동 155", "서울 도봉구 창동 13", "대구 북구 산격동 1309-5", "경기 광주시 경안동 20-20"]

const MapLoadList = () => {
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
           
                <MapSelect keyword={test} isAddressSearch={true}/>
            
        </>
  )
}

export default MapLoadList