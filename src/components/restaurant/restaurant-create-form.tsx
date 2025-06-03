"use client"

import React, { useState, useEffect } from 'react'
import { Input, Textarea } from "@heroui/input"
import { Button } from "@heroui/button";
import { RestaurantData } from '@/src/types/data/restaurant'
import { Slider } from "@heroui/slider";
import { PiStarFill } from "react-icons/pi";
import '@/src/styles/common/range.css'
import CategoryWrap from '../common/category/category-wrap';
import { categorys } from '@/src/components/restaurant/restaurant-data'

// userId
// title: string;
// content: string;
// rating: number;
// address: string;
// category: string;
// isEdit?: boolean;
// restaurantId?: string;


const RestaurantCreateForm = () => {


   const [restaurant, setRestaurant] = useState<RestaurantData>({
      userId: "",
      title: "",
      content: "",
      rating: 3,
      address: "",
      category: "",
      isEdit: false,
      // restaurantId: "",

   });

   const handleCreateRestaurant = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      createRestaurantMutation(restaurant)
      console.log('view?', restaurant)
   }

   const handleChangeRestaurantInfo = (e) => {
      e.preventDefault()
      setRestaurant({
         ...restaurant,
         userId: userInfo?.uid,
         [e.target.name]: e.target.value
      })
   }

   const handleChangeRating = (v) => {
      console.log('??? rating', v)
      setRestaurant({
         ...restaurant,
         rating: v
      })
   }

   useEffect(() => {
      console.log('restaurant?', restaurant, userInfo?.uid)

   }, [restaurant])


   return (
      <>
         <form onSubmit={handleCreateRestaurant}>

            <div className='flex flex-col gap-2 mt-[20px]'>

               <article>
                  <div className='flex items-center'>
                     <strong>별점</strong>
                     <div><PiStarFill className='text-yellow-200' /></div>
                     <div>{restaurant.rating}</div>
                  </div>
                  <Slider
                     onChange={handleChangeRating}
                     // className="max-w-md"
                     // color="warning"
                     defaultValue={restaurant.rating}
                     // label="별점"
                     aria-label='별점'
                     maxValue={5}
                     minValue={1}
                     showSteps={true}
                     size="md"
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
               </article>


               <article>
                  <strong>asd</strong>
                  <Input
                     label="가게명"
                     isRequired
                     className="w-full input_text"
                     defaultValue=""
                     type="text"
                     name='title'
                     placeholder="가게명은 정확하게 입력해주세요"
                     value={restaurant.title}
                     onChange={handleChangeRestaurantInfo}
                  />
               </article>

               <article>
                  <strong>asd</strong>
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
                     maxLength={10}
                  />
               </article>

               <article>
                  <strong>asd</strong>
                  <Input
                     label="주소"
                     className="w-full input_text"
                     defaultValue=""
                     type="text"
                     name='address'
                     // placeholder="password"
                     value={restaurant.address}
                     onChange={handleChangeRestaurantInfo}
                     autoComplete='on'
                  />
               </article>


               <article>
                  {/* 카테고리는 한종류로 해야되고, 먹은 메뉴는 또 다른 카테고리로 해야겠네 ;; */}
                  <strong>asd</strong>
                  <div className="flex flex-col gap-1 w-full">
                     <CategoryWrap category={categorys} setRestaurant={setRestaurant} />
                  </div>
               </article>



               <Button className='w-full' type='submit' color="primary">글 생성</Button>
            </div>

         </form>
      </>
   )
}

export default RestaurantCreateForm