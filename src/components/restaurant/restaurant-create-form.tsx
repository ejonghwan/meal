"use client"

import React, { useState, useEffect } from 'react'
import { Input, Textarea } from "@heroui/input"
import { Button } from "@heroui/button";
import { restaurantData } from '@/src/types/data/restaurant'
import { Slider } from "@heroui/slider";

// title: string;
//     content: string;
//     rating: number;
//     address: string;
//     category: string;
//     isEdit?: boolean;
//     restaurantId?: string;


const RestaurantCreateForm = () => {


   const [restaurant, setRestaurant] = useState<restaurantData>({
      title: "",
      content: "",
      rating: 0,
      address: "",
      category: "",
      isEdit: false,
      restaurantId: "",

   });

   const handleCreateRestaurant = (e) => {
      e.preventDefault()
   }

   const handleChangeRestaurantInfo = (e) => {
      e.preventDefault()
      setRestaurant({
         ...restaurant,
         [e.target.name]: e.target.value
      })
   }

   useEffect(() => {
      console.log('restaurant?', restaurant)
   }, [restaurant])


   return (
      <>
         <form onSubmit={handleCreateRestaurant}>

            <div className='flex flex-col gap-2 zz mt-[20px]'>
               <Input
                  label="title"
                  isRequired
                  className="w-full input_text"
                  defaultValue=""
                  type="text"
                  name='title'
                  // placeholder="email"
                  value={restaurant.title}
                  onChange={handleChangeRestaurantInfo}
               />

               <Textarea
                  label="content"
                  isRequired
                  className="w-full input_textarea"
                  defaultValue=""
                  type="text"
                  name='content'
                  // placeholder="password"
                  value={restaurant.content}
                  onChange={handleChangeRestaurantInfo}
                  autoComplete='on'
               />

               <Input
                  label="address"
                  className="w-full input_text"
                  defaultValue=""
                  type="text"
                  name='address'
                  // placeholder="password"
                  value={restaurant.address}
                  onChange={handleChangeRestaurantInfo}
                  autoComplete='on'
               />


               <Slider
                  className="max-w-md"
                  color="warning"
                  defaultValue={2.5}
                  label="Temperature"
                  maxValue={5}
                  minValue={0}
                  showSteps={true}
                  size="lg"
                  step={1}
               // classNames={'label'}
               />
               <Button className='w-full' type='submit' color="primary">글 생성</Button>
            </div>

         </form>
      </>
   )
}

export default RestaurantCreateForm