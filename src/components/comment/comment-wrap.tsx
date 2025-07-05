"use client"

import React, { useEffect } from 'react';
import { useLoadCommentList } from '@/src/store/queryies/comment/commentQueries'
import CommentItem from '@/src/components/comment/comment-item'
import { useUserStore } from '@/src/store/front/user'


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
         {commentData?.data?.map(item => (
            <CommentItem key={item.id} comment={item} setHasMyComment={setHasMyComment} />
         ))}
      </div>
   )
}

export default CommentWrap