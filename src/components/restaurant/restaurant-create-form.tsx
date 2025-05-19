"use client"

import React, { useState, useEffect } from 'react'
import { Input, Textarea } from "@heroui/input"
import { Button } from "@heroui/button";
import { restaurantData } from '@/src/types/data/restaurant'
import { Slider } from "@heroui/slider";
import '@/src/styles/common/range.css'

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

   const handleChangeRating = (v) => {
      console.log('??? rating', v)
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
                  onChange={handleChangeRating}
                  // className="max-w-md"
                  // color="warning"
                  defaultValue={3}
                  label="asdasd"
                  maxValue={5}
                  minValue={0}
                  showSteps={true}
                  size="lg"
                  step={1}
                  // classNames={'label'}
                  classNames={{
                     base: "max-w-md",
                     // filler: "bg-gradient-to-r from-primary-500 to-secondary-400",

                     labelWrapper: "mb-2",
                     label: "font-medium text-default-700 text-medium",
                     // value: "font-medium text-default-500 text-small",
                     thumb: [
                        "transition-size",
                        "bg-gradient-to-r from-secondary-400 to-primary-500",
                        "data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20",
                        "data-[dragging=true]:w-7 data-[dragging=true]:h-7 data-[dragging=true]:after:h-6 data-[dragging=true]:after:w-6",
                     ],
                     // step: "data-[in-range=true]:bg-black/30 dark:data-[in-range=true]:bg-white/50",
                     // thumb: "bg-white p-[0px] rounded-[0] border-0",
                     step: "bg-[yellow]",
                     track: "bg-gray-800 ",
                     mark: 'bg-red-500 ',
                     filler: "bg-[yellow]",

                  }}

                  // formatOptions={{ style: "currency", currency: "USD" }}
                  // showOutline={true}
                  // showTooltip={true}
                  tooltipProps={{
                     offset: 10,
                     placement: "bottom",
                     classNames: {
                        base: [
                           // arrow color
                           "before:bg-[yellow]",
                        ],
                        content: [
                           "py-2 shadow-xl",
                           "bg-[yellow]",
                           "text-red-500"
                        ],
                     },
                  }}
                  tooltipValueFormatOptions={{ style: "decimal", maximumFractionDigits: 0 }}


               />



               <Button className='w-full' type='submit' color="primary">글 생성</Button>
            </div>

         </form>
      </>
   )
}

export default RestaurantCreateForm