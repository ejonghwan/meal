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

   // useEffect(() => {
   // commentData?.pages.flatMap(item => {
   //    // console.log('item?', item)
   //    item?.data?.map(comment => {
   //       // console.log('comment?', comment)
   //       if (comment.hasMyComment) {
   //          // console.log('댓글있음')
   //          setHasMyComment(true)
   //       }
   //    })
   // })

   // }, [commentSuccess])


   const handleClickNextComment = () => {
      fetchNextPage()
   }



   return (
      <div>
         {/* 로딩중 */}
         {commentLoading && (<CommentSkeleton len={3} />)}

         {/* 에러 발생 */}
         {commentError && <div>에러 발생</div>}

         {/* 목록 */}
         {commentData?.pages.flatMap(item => (
            item.data.map(comment => (
               <CommentItem key={comment.id} comment={comment} setHasMyComment={setHasMyComment} />
            ))
         ))}

         {/* 더보기 버튼 */}
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