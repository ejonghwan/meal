"use client"

import React from 'react'
import { Input, Textarea } from "@heroui/input"
// import Link from 'next/link';

interface Props {
   restaurant: any;
   setRestaurant: any;
}


const MapInfo = ({ restaurant, setRestaurant }: Props) => {

   const handleChangeRestaurantInfo = (e) => {
      setRestaurant(prev => ({
         ...prev,
         content: e.target.value
      }))

   }

   return (
      <ul>
         <li className='mt-[20px]'>
            <Input
               label="가게명"
               className="w-full input_text"
               defaultValue=""
               type="text"
               name='name'
               placeholder="검색 후 가게를 선택해주세요"
               isRequired
               disabled
               value={restaurant.mapInfo ? restaurant.mapInfo.name : ''}
               autoComplete='on'
            />

         </li>
         <li className='mt-[8px]'>
            <Input
               label="가게주소"
               className="w-full input_text"
               defaultValue=""
               type="text"
               name='name'
               placeholder="-"
               isRequired
               disabled
               value={restaurant.mapInfo ? restaurant.mapInfo.adress : ''}
               autoComplete='on'
            />
         </li>
         <li className='mt-[8px]'>
            <Input
               label="분류"
               className="w-full input_text"
               defaultValue=""
               type="text"
               name='name'
               placeholder="-"
               disabled
               value={restaurant.mapInfo.category}
               autoComplete='on'
            />
         </li>
         <li className='mt-[8px]'>
            <Input
               label="업종"
               className="w-full input_text"
               defaultValue=""
               type="text"
               name='name'
               placeholder="-"
               disabled
               value={restaurant.mapInfo.categoryName}
               autoComplete='on'
            />
         </li>
         <li className='mt-[8px]'>
            <Input
               label="전화번호"
               className="w-full input_text"
               defaultValue=""
               type="text"
               name='name'
               placeholder="-"
               disabled
               value={restaurant.mapInfo.phone}
               autoComplete='on'
            />
         </li>
         <li className='mt-[8px]'>
            <Textarea
               label="리뷰"
               isRequired
               className="w-full input_textarea"
               defaultValue=""
               type="text"
               name='content'
               placeholder="소감을 200자 이내로 입력해주세요"
               value={restaurant.content}
               onChange={handleChangeRestaurantInfo}
               autoComplete='on'
               maxLength={200}
            />
         </li>

         {/* <li>{restaurant.mapInfo.url}</li> */}
         {/* <li>{restaurant.mapInfo.y}</li> */}
         {/* <li>{restaurant.mapInfo.x}</li> */}
      </ul>
   )
}

export default MapInfo