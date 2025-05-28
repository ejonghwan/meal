"use client"
import React from 'react'
import { RadioGroup, Radio } from "@heroui/radio";

const CategoryItem = ({ children, value, ...props }) => {
   return (
      <>
         <Radio
            {...props}
            value={value}
            classNames={{
               base:
                  "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between  cursor-pointer rounded-[20px] gap-[2px] px-[10px] border-2 border-transparent data-[selected=true]:border-primary",
            }}
         >
            {children}
         </Radio>
      </>
   )
}

export default CategoryItem