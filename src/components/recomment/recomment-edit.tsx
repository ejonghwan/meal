"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Input } from '@heroui/input'
import { Button } from '@heroui/button';
import RecommentCreate from '@/src/components/recomment/recomment-create'
import { PiStarFill, PiDotsThreeOutlineVerticalDuotone, PiGithubLogoDuotone, PiHeartDuotone, PiHeartBreakDuotone } from 'react-icons/pi';
import UserFirstName from '@/src/components/common/user-firstName';
import { useUserStore } from '@/src/store/front/user';
import { getRelativeTime, timeForToday } from '@/src/utillity/utils';
import { useEditRecomment } from '@/src/store/queryies/recomment/recommentQueries';
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

// useEditRecomment
// userId: string
//     restaurantId: string;
//     parentCommentId: string;
//     recommentId: string;
//     content: string;


const RecommentEdit = ({ recomment, isEditRecomment, setIsEditRecomment }) => {


   const { mutate: editCommentMutate, isError: editRecommentError, isSuccess: editRecommentSuccess, isPending: editRecommentPending } = useEditRecomment()

   const { userInfo } = useUserStore()
   // const [ratingValue, setRatingValue] = useState(new Set([recomment.rating]));


   const [isRecomment, setIsRecomment] = useState(false)
   const [editRecommentData, EditRecommentData] = useState({
      ...recomment,
      userId: userInfo.uid,
      parentCommentId: recomment.commentId,
      recommentId: recomment.id,
      restaurantId: recomment.restaurantId
   })

   // useEffect(() => {
   //    console.log('editRecommentSuccess:', editRecommentSuccess)
   //    console.log('editCommentError:', editCommentError)
   //    console.log('editRecommentPending:', editRecommentPending)
   // }, [editRecommentSuccess, editCommentError, editRecommentPending])


   const handleChangeRecomment = (e) => {
      EditRecommentData(prev => ({
         ...prev,
         content: e.target.value,
      }))
   }

   // 수정
   const handleEditRecommentSubmit = (e) => {
      e.preventDefault();
      editCommentMutate(editRecommentData)
   }


   // useEffect(() => {
   //    EditRecommentData(prev => ({
   //       ...prev,
   //       rating: Number([...ratingValue][0]) //set 객체 이렇게 풀어도됨
   //    }))
   // }, [ratingValue])

   useEffect(() => {
      if (editRecommentSuccess) setIsEditRecomment(false)
   }, [editRecommentSuccess])




   useEffect(() => { console.log('payload data?', editRecommentData) }, [editRecommentData])



   return (
      <>
         <form onSubmit={handleEditRecommentSubmit}>
            <div className='mt-[10px] mb-[5px]'>
               {/* 수정하기 */}
               <div className='flex flex-wrap items-center justify-between mb-[5px]'>

                  <Input label="댓글 수정" type="text" variant={'flat'} className='mb-[5px]' fullWidth value={editRecommentData.content} onChange={handleChangeRecomment} />

               </div>

               <div className='flex justify-end gap-[5px]'>
                  <Button type="button" variant='light' onPress={() => setIsEditRecomment(false)}>취소</Button>
                  <Button
                     type="submit"
                     variant='shadow'
                     color={editRecommentData.content !== recomment.content || editRecommentData.rating !== recomment.rating ? 'primary' : 'default'}
                     isLoading={editRecommentPending}
                  >
                     수정
                  </Button>
               </div>
            </div>
         </form>

      </>

   )
}

export default RecommentEdit