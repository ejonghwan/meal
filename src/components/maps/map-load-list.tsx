"use client"

import React from 'react'
import MapSelect from '@/src/components/maps/map-select';


const test = ["곰국시집 명동점", "전설의우대갈비 서울시청직영점", "이디야커피 창동역점", "컴포즈커피 경북대점", "잔치집", "광주원조감자탕"]

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
           
                <MapSelect keyword={test[0]} />
            
        </>
  )
}

export default MapLoadList