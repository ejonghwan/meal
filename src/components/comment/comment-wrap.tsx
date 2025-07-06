"use client"

import React, { Fragment, useEffect } from 'react';
import { useLoadCommentList } from '@/src/store/queryies/comment/commentQueries'
import CommentItem from '@/src/components/comment/comment-item'
import { useUserStore } from '@/src/store/front/user'
import { Skeleton } from '@heroui/skeleton';


const CommentWrap = ({ restaurantId, setHasMyComment }: { restaurantId: string; setHasMyComment: any }) => {

   const { userInfo } = useUserStore();
   const { data: commentData, isError: commentError, isSuccess: commentSuccess, isLoading: commentLoading } = useLoadCommentList(restaurantId, 10, userInfo?.uid ? userInfo?.uid : null)


   useEffect(() => {
      commentData?.data?.map(item => {
         // console.log('item?', item.hasMyComment)
         if (item.hasMyComment) {
            // console.log('댓글있음')
            setHasMyComment(true)
         }
      })

      // console.log('load setHasMyComment?', setHasMyComment)
   }, [commentSuccess])



   return (
      <div>
         {/* 로딩중 */}
         {commentLoading && (
            <>
               {Array(10).fill('1').map((_, idx) => (
                  <Fragment key={idx}>
                     <div className="flex flex-wrap items-center bg-[#18181b] h-[88x] rounded-[12px] p-[5px] mb-[5px]">
                        <Skeleton className='w-[35%] h-[10px] rounded-[20px]' />
                        <Skeleton className='w-[70%] h-[10px] rounded-[20px] mt-[13px]' />
                        <Skeleton className='w-[100%] h-[10px] rounded-[20px] mt-[3px]' />
                     </div>
                  </Fragment>
               ))}
            </>
         )}

         {/* 에러 발생 */}
         {commentError && <div>에러 발생</div>}


         {commentData?.data?.map(item => (
            <CommentItem key={item.id} comment={item} setHasMyComment={setHasMyComment} />
         ))}
      </div>
   )
}

export default CommentWrap