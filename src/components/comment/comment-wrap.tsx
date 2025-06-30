"use client"

import React, { useEffect } from 'react';
import { useLoadCommentList } from '@/src/store/queryies/comment/commentQueries'
import CommentItem from '@/src/components/comment/comment-item'

const CommentWrap = () => {

   const { data: commentData, isError: commentError, isSuccess: commentSuccess, isLoading: commentLoading } = useLoadCommentList(10)


   useEffect(() => {
      if (commentSuccess && commentData?.data) {
         console.log(commentData.data);
      }
   }, [commentSuccess, commentData]);


   return (
      <div>
         <CommentItem commentData={commentData} />
      </div>
   )
}

export default CommentWrap