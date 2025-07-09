"use client"

import React, { Fragment, useEffect } from 'react';
import { useLoadCommentListInfinite } from '@/src/store/queryies/comment/commentQueries'
import { useUserStore } from '@/src/store/front/user'
import { Skeleton } from '@heroui/skeleton';
import { Button } from '@heroui/button';
import CommentItem from '@/src/components/comment/comment-item'
import CommentSkeleton from '@/src/components/comment/comment-skeleton';


const CommentWrap = ({ restaurantId, setHasMyComment }: { restaurantId: string; setHasMyComment: any }) => {

   const { userInfo } = useUserStore();
   // const { data: commentData, isError: commentError, isSuccess: commentSuccess, isLoading: commentLoading } = useLoadCommentList(restaurantId, 10, userInfo?.uid ? userInfo?.uid : null)
   // commentData?.pages.flatMap(page => page.data) ?? []

   const {
      data: commentData,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      isError: commentError,
      isLoading: commentLoading,
      isSuccess: commentSuccess
   } = useLoadCommentListInfinite(restaurantId, 5, userInfo?.uid ? userInfo?.uid : null);

   useEffect(() => {
      // console.log('commentData?.pages?', commentData?.pages)
      commentData?.pages.flatMap(item => {
         // console.log('item?', item)
         item?.data?.map(comment => {
            // console.log('comment?', comment)
            if (comment.hasMyComment) {
               // console.log('댓글있음')
               setHasMyComment(true)
            }
         })
      })
      // console.log('load setHasMyComment?', setHasMyComment)
   }, [commentSuccess])


   const handleClickNextComment = () => {
      fetchNextPage()
   }



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


         {commentData?.pages.flatMap(item => (
            item.data.map(comment => (
               <CommentItem key={comment.id} comment={comment} setHasMyComment={setHasMyComment} />
            ))
         ))}

         {hasNextPage && (
            <>
               <div className="mt-[30px] flex justify-center">
                  <Button type="button" variant="shadow" color="default" onPress={handleClickNextComment} isLoading={isFetchingNextPage} disabled={isFetchingNextPage}>더 보기</Button>
               </div>
               {isFetchingNextPage && <CommentSkeleton len={3} />}
            </>
         )}
      </div>
   )
}

export default CommentWrap