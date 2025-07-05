"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Input } from '@heroui/input'
import { Button } from '@heroui/button';
import { Select, SelectItem } from "@heroui/select";
import { useCreatecomment } from '@/src/store/queryies/comment/commentQueries';
import { useUserStore } from '@/src/store/front/user';
import SelectWrap from '@/src/components/common/input/select';
import { PiStarFill } from 'react-icons/pi';
import { ratingSelectOPT } from '@/src/components/comment/comment-data'

interface Props {
   userId: string
   restaurantId: string
}


// 평점 댓글은 한번만 달 수 있게

const CommentCreate = ({ userId, restaurantId }: Props) => {


   const { mutate: createCommentMutate, isError: createCommentError, isSuccess: createCommentSuccess, isPending: createCommentPending } = useCreatecomment()
   const { userInfo } = useUserStore()
   const [isCommentBtn, setIsCommentBtn] = useState(false)
   const [ratingValue, setRatingValue] = useState(new Set([3]));
   const [commentData, setCommentData] = useState({
      userId: userInfo.uid,
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
      if (!createCommentPending) {

         console.log('실행되나?')
         setIsCommentBtn(false)
         setCommentData(prev => ({
            ...prev,
            rating: 3,
            content: ''
         }))
      }
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
   }

   useEffect(() => {
      console.log('rating change ?')
      setCommentData(prev => ({
         ...prev,
         rating: Number([...ratingValue][0]) //set 객체 이렇게 풀어도됨
      }))
   }, [ratingValue])


   useEffect(() => {
      if (createCommentSuccess) handleCommentClose();
   }, [createCommentSuccess])


   useEffect(() => { console.log(commentData) }, [commentData])


   return (
      <>
         <form onSubmit={handleCreateComment}>
            <div className='flex gap-[10px]'>
               <Input label="댓글" type="text" variant={'underlined'} ref={commentRef} onFocus={handleCommentHover} onChange={handleWriteComment} value={commentData.content} />
               <SelectWrap
                  defaultSelectedKeys={String(commentData.rating)}
                  className={'w-[75px] flex-auto flex-shrink-0 flex-grow-0'}
                  ico={<PiStarFill className='text-[#ebdf32] size-[36px]' />}
                  selectItem={ratingSelectOPT}
                  setSelectValue={setRatingValue}
                  placeholder='3'

               />
            </div>
            {isCommentBtn && (
               <div className='flex justify-end gap-[5px] mt-[8px]'>
                  <Button type="button" variant='light' onClick={handleCommentClose}>취소</Button>
                  <Button type='submit'
                     variant='shadow'
                     color={commentData.content ? 'primary' : 'default'}
                     disabled={!commentData.content}
                     isLoading={createCommentPending}
                  >
                     입력
                  </Button>
               </div>
            )}
         </form>
      </>

   )
}

export default CommentCreate