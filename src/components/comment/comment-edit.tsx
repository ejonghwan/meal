"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Input } from '@heroui/input'
import { Button } from '@heroui/button';
import RecommentCreate from '@/src/components/recomment/recomment-create'
import { PiStarFill, PiDotsThreeOutlineVerticalDuotone, PiGithubLogoDuotone, PiHeartDuotone, PiHeartBreakDuotone } from 'react-icons/pi';
import UserFirstName from '@/src/components/common/user-firstName';
import { useUserStore } from '@/src/store/front/user';
import { getRelativeTime, timeForToday } from '@/src/utillity/utils';
import { useEditCommentId } from '@/src/store/queryies/comment/commentQueries';
import {
   useDisclosure, Modal,
   ModalContent,
   ModalHeader,
   ModalBody,
   ModalFooter,
   useDraggable
} from '@heroui/modal';
import SelectWrap from '../common/input/select';


/*
   restaurantId,
   userId: decoded.uid,
   content,
   createdAt: serverTimestamp(),

*/


const CommentEdit = ({ comment }) => {


   const { mutate: editCommentMutate, isError: editCommentError, isSuccess: editCommentSuccess, isPending: editCommentPending } = useEditCommentId()
   const { isOpen, onOpen, onOpenChange } = useDisclosure();
   const targetRef = useRef(null);
   const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });
   const { userInfo } = useUserStore()
   const [ratingValue, setRatingValue] = useState(new Set([]));


   const [isEditComment, setIsEditComment] = useState(false)
   const [isRecomment, setIsRecomment] = useState(false)
   const [editCommentData, EditCommentData] = useState({ 
      ...comment
      })


   const handleEditCommentView = () => {
      setIsEditComment(true)
   }
   const handleRecommentView = () => {
      setIsRecomment(true)
   }

   const handleEditComment = (e) => {
      EditCommentData(prev => ({
         ...prev,
         content: e.target.value,
      }))
   }

   const handleEditCommentSubmit = (e) => {
      e.preventDefault();
      editCommentMutate(editCommentData)
   }

   useEffect(() => {
      EditCommentData(prev => ({
         ...prev,
         rating: Number([...ratingValue][0]) //set 객체 이렇게 풀어도됨
      }))
   }, [ratingValue])

   useEffect(() => { console.log('payload data?' ,editCommentData) }, [editCommentData])


   const rating = [
      { key: "5", label: "5" },
      { key: "4", label: "4" },
      { key: "3", label: "3" },
      { key: "2", label: "2" },
      { key: "1", label: "1" },
   ];


   return (
      <>
         <form onSubmit={handleEditCommentSubmit}>
            <div className='mt-[10px] mb-[5px]'>
               {/* 수정하기 */}
               <div className='flex items-center justify-between mb-[5px]'>
                  
                  <Input label="댓글 수정" type="text" variant={'flat'} className='mb-[5px]' fullWidth value={editCommentData.content} onChange={handleEditComment}/>
                  <SelectWrap
                     defaultSelectedKeys={'3'}
                     className={'w-[75px] flex-auto flex-shrink-0 flex-grow-0'}
                     ico={<PiStarFill className='text-[#ebdf32] size-[36px]' />}
                     selectItem={rating}
                     setSelectValue={setRatingValue}
                  />
               </div>
               <div className='flex justify-end gap-[5px]'>
                  <Button type="button" variant='light'>취소</Button>
                  <Button
                     type="submit"
                     variant='shadow'
                  // color={commentData.content ? 'primary' : 'default'}
                  // disabled={!commentData.content}
                  // isLoading={createCommentPending}
                  >
                     수정
                  </Button>
               </div>
            </div>
         </form>
                  
         <Modal ref={targetRef} isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
               {(onClose) => (
                  <>
                     <ModalHeader {...moveProps} className="flex flex-col gap-1">
                        삭제 / 수정
                     </ModalHeader>
                     <ModalBody>
                        <p>한번 수정 및 삭제 시 복구할 수 없습니다<br />그래도 변경하시겠습니까?</p>
                     </ModalBody>
                     <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                           삭제
                        </Button>
                        <Button color="primary" onPress={handleEditCommentView}>
                           수정
                        </Button>
                     </ModalFooter>
                  </>
               )}
            </ModalContent>
         </Modal>




      </>

   )
}

export default CommentEdit