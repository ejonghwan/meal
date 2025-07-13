import React, { Fragment } from 'react'
import { Skeleton } from "@heroui/skeleton";

const RecommentSkeleton = ({ len = 5 }: { len: number }) => {
   return (
      <>
         {Array(len).fill('1').map((_, idx) => (
            <Fragment key={idx}>
               <div className="flex gap-[10px] items-start bg-[#18181b] h-[63px] rounded-[12px] mb-[5px] mt-[10px]">
                  <div>
                     <Skeleton className='size-[25px] rounded-[50%]' />
                  </div>
                  <div className='w-full'>
                     <Skeleton className='w-[35%] h-[10px] rounded-[20px]' />
                     <Skeleton className='w-[70%] h-[10px] rounded-[20px] mt-[10px]' />
                     <Skeleton className='w-[100%] h-[10px] rounded-[20px] mt-[10px]' />
                  </div>
               </div>
            </Fragment>
         ))}
      </>
   )
}

export default RecommentSkeleton