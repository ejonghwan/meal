"use client"

import React, { useEffect } from 'react';
import { useLoadCommentList } from '@/src/store/queryies/comment/commentQueries'
import CommentItem from '@/src/components/comment/comment-item'

const CommentWrap = ({ restaurantId }: { restaurantId: string }) => {

   const { data: commentData, isError: commentError, isSuccess: commentSuccess, isLoading: commentLoading } = useLoadCommentList(restaurantId, 10)


   useEffect(() => {
      if (commentSuccess && commentData?.data) {
         console.log(commentData);
      }
   }, [commentSuccess, commentData]);


   return (
      <div>
         {commentData?.data?.map(item => (
            <CommentItem key={item.id} comment={item} />
         ))}
      </div>
   )
}

export default CommentWrap