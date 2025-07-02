"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Input } from '@heroui/input'
import { Button } from '@heroui/button';
import { useCreatecomment } from '@/src/store/queryies/comment/commentQueries';

interface Props {
   userId: string
   restaurantId: string
}

const CommentCreate = ({ userId, restaurantId }: Props) => {

   const { mutate: createCommentMutate, isError: createCommentError, isSuccess: createCommentSuccess, isPending: createCommentPending } = useCreatecomment()

   const [isCommentBtn, setIsCommentBtn] = useState(false)
   const [commentData, setCommentData] = useState({
      userId: userId,
      restaurantId: restaurantId,
      parentCommentId: null,
      content: '',
      rating: 3,
   })

   const commentRef = useRef();
   const handleCommentHover = () => {
      setIsCommentBtn(true)
   }

   const handleCommentClose = () => {
      setIsCommentBtn(false)
      setCommentData(prev => ({
         ...prev,
         rating: 3,
         content: ''
      }))
   }

   const handleWriteComment = (e) => {
      setCommentData(prev => ({
         ...prev,
         content: e.target.value
      }))
   }

   const handleCreateComment = (e) => {
      e.preventDefault();
      // const savedToken = localStorage.getItem('x-acc-token');
      createCommentMutate({ ...commentData })
      console.log('asdasdasd?', commentData)
   }

   useEffect(() => {
      console.log('isComment?', isCommentBtn, commentData)
   }, [isCommentBtn, commentData])


   return (
      <>
         <form onSubmit={handleCreateComment}>
            <Input label="댓글" type="text" variant={'underlined'} ref={commentRef} onFocus={handleCommentHover} onChange={handleWriteComment} value={commentData.content} />
            {isCommentBtn && (
               <>
                  <Button type="button" onClick={handleCommentClose}>취소</Button>
                  <Button type='submit' color={commentData.content ? 'primary' : 'default'} disabled={!commentData.content}>입력</Button>
               </>
            )}
         </form>
      </>

   )
}

export default CommentCreate