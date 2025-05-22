"use client"
import React, { memo } from 'react'
import { RadioGroup, Radio } from "@heroui/radio";
import CategoryItem from '@/src/components/common/category/category-item'

const CategoryWrap = () => {
   return (
      <>
         <RadioGroup description="카테고리를 골라주세요" label="카테고리">
            <div className='flex gap-[5px] flex-wrap'>
               <CategoryItem description="aa" value="전체">
                  전체
               </CategoryItem>
               <CategoryItem description="bb" value="치킨">
                  치킨
               </CategoryItem>
               <CategoryItem description="cc" value="한식">
                  한식
               </CategoryItem>
               <CategoryItem description="cc" value="카페/디저트">
                  카페/디저트
               </CategoryItem>
               <CategoryItem description="cc" value="중식">
                  중식
               </CategoryItem>
               <CategoryItem description="cc" value="분식">
                  분식
               </CategoryItem>
               <CategoryItem description="cc" value="샐러드">
                  샐러드
               </CategoryItem>
               <CategoryItem description="cc" value="일식">
                  일식
               </CategoryItem>
               <CategoryItem description="cc" value="햄버거">
                  햄버거
               </CategoryItem>
            </div>
         </RadioGroup>
      </>
   )
}

export default memo(CategoryWrap)