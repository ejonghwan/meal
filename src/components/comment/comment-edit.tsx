"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Input } from '@heroui/input'
import { Button } from '@heroui/button';
import RecommentCreate from '@/src/components/recomment/recomment-create'
import { PiStarFill, PiDotsThreeOutlineVerticalDuotone, PiGithubLogoDuotone, PiHeartDuotone, PiHeartBreakDuotone } from 'react-icons/pi';
import UserFirstName from '@/src/components/common/user-firstName';
import { useUserStore } from '@/src/store/front/user';
import { getRelativeTime, timeForToday } from '@/src/utillity/utils';
import { useEditComment } from '@/src/store/queryies/comment/commentQueries';
import {
   useDisclosure, Modal,
   ModalContent,
   ModalHeader,
   ModalBody,
   ModalFooter,
   useDraggable
} from '@heroui/modal';
import SelectWrap from '../common/input/select';
import { ratingSelectOPT } from '@/src/components/comment/comment-data'


/*
   restaurantId,
   userId: decoded.uid,
   content,
   createdAt: serverTimestamp(),

*/


const CommentEdit = ({ comment, isEditComment, setIsEditComment }) => {


   const { mutate: editCommentMutate, isError: editCommentError, isSuccess: editCommentSuccess, isPending: editCommentPending } = useEditComment()

   const { userInfo } = useUserStore()
   const [ratingValue, setRatingValue] = useState(new Set([comment.rating]));


   const [isRecomment, setIsRecomment] = useState(false)
   const [editCommentData, EditCommentData] = useState({
      ...comment,
      commentId: comment.id,
      prevRating: comment.rating,
      restaurantId: comment.restaurantId
   })


   const handleChangeComment = (e) => {
      EditCommentData(prev => ({
         ...prev,
         content: e.target.value,
      }))
   }

   // 수정
   const handleEditCommentSubmit = (e) => {
      e.preventDefault();
      editCommentMutate(editCommentData)
   }

   // 대댓
   const handleRecommentView = () => {
      setIsRecomment(true)
   }


   useEffect(() => {
      EditCommentData(prev => ({
         ...prev,
         rating: Number([...ratingValue][0]) //set 객체 이렇게 풀어도됨
      }))
   }, [ratingValue])

   useEffect(() => {
      if (editCommentSuccess) setIsEditComment(false)
   }, [editCommentSuccess])




   useEffect(() => { console.log('payload data?', editCommentData) }, [editCommentData])



   return (
      <>
         <form onSubmit={handleEditCommentSubmit}>
            <div className='mt-[10px] mb-[5px]'>
               {/* 수정하기 */}
               <div className='flex flex-wrap items-center justify-between mb-[5px]'>
                  <SelectWrap
                     defaultSelectedKeys={String(editCommentData.rating)}
                     className={'w-[75px] flex-auto flex-shrink-0 flex-grow-0 mb-[5px]'}
                     ico={<PiStarFill className='text-[#ebdf32] size-[36px]' />}
                     selectItem={ratingSelectOPT}
                     setSelectValue={setRatingValue}
                  />
                  <Input label="댓글 수정" type="text" variant={'flat'} className='mb-[5px]' fullWidth value={editCommentData.content} onChange={handleChangeComment} />

               </div>
               <div className='flex justify-end gap-[5px]'>
                  <Button type="button" variant='light' onPress={() => setIsEditComment(false)}>취소</Button>
                  <Button
                     type="submit"
                     variant='shadow'
                     color={editCommentData.content !== comment.content || editCommentData.rating !== comment.rating ? 'primary' : 'default'}
                     disabled={editCommentData === comment && editCommentData.rating === comment.rating}
                     isLoading={editCommentPending}
                  >
                     수정
                  </Button>
               </div>
            </div>
         </form>

      </>

   )
}

export default CommentEdit