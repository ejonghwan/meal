import React, { Fragment } from 'react'
import { Skeleton } from "@heroui/skeleton";

const CommentSkeleton = ({ len = 5 }: { len: number }) => {
   return (
      <>
         {Array(len).fill('1').map((_, idx) => (
            <Fragment key={idx}>
               <div className="flex flex-wrap items-center bg-[#18181b] h-[114px] rounded-[12px] p-[20px] mb-[5px]">
                  <Skeleton className='w-[35%] h-[10px] rounded-[20px]' />
                  <Skeleton className='w-[70%] h-[10px] rounded-[20px] mt-[13px]' />
                  <Skeleton className='w-[100%] h-[10px] rounded-[20px] mt-[3px]' />
               </div>
            </Fragment>
         ))}
      </>
   )
}

export default CommentSkeleton