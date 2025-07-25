import React, { Fragment } from 'react'
import { Skeleton } from "@heroui/skeleton";

const RestaurantSkeleton = ({ len = 5 }: { len: number }) => {
   return (
      <>
         {Array(len).fill('1').map((_, idx) => (
            <Fragment key={idx}>
               <div className="flex flex-wrap items-center bg-[#18181b] h-[143px] rounded-[12px] p-[20px] mb-[5px]">
                  <Skeleton className='w-[35%] h-[13px] rounded-[20px]' />
                  <Skeleton className='w-[70%] h-[13px] rounded-[20px] mt-[13px]' />
                  <Skeleton className='w-[70%] h-[13px] rounded-[20px] mt-[3px]' />
                  <Skeleton className='w-[100%] h-[13px] rounded-[20px] mt-[3px]' />
               </div>
            </Fragment>
         ))}
      </>
   )
}

export default RestaurantSkeleton