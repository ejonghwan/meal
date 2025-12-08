"use client"
import React, { memo, useEffect } from 'react'
import { RadioGroup, Radio } from "@heroui/radio";
import CategoryItem from '@/src/components/common/category/category-item'
import { RestaurantData } from '@/src/types/data/restaurant'

interface CategoryItemType {
   description: string;
   value: string;
}
interface CategoryWrapProps {
   category: CategoryItemType[];
   initialCategory?: string;
   // defaultValue?: string;
   setRestaurant: React.Dispatch<React.SetStateAction<RestaurantData>>;
}


const CategoryWrap = ({ initialCategory, category, setRestaurant }: CategoryWrapProps) => {


   useEffect(() => {
      // setRestaurant()
   }, [])


   const handleChangeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log('카테고리?', e.target.value)

      setRestaurant(prev => ({ ...prev, category: e.target.value }))
      // type error
      // setRestaurant(prev => ({
      //    ...prev, 
      //    category: e.target.value
      // }))
   }

   return (
      <>
         <RadioGroup description=" " label=" " defaultValue={initialCategory}>
            <div className='flex gap-[5px] flex-wrap'>

               {category.map((item, idx) => {
                  return (
                     <CategoryItem key={idx} description={item.description} value={item.value} onChange={(e) => handleChangeCategory(e)}>
                        {item.value}
                     </CategoryItem>
                  )
               })}

            </div>
         </RadioGroup>
      </>
   )
}

export default memo(CategoryWrap)