"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Input } from '@heroui/input'
import { Button } from '@heroui/button';
import RecommentCreate from '@/src/components/recomment/recomment-create'
import { PiStarFill, PiDotsThreeOutlineVerticalDuotone, PiGithubLogoDuotone, PiHeartDuotone, PiHeartBreakDuotone, PiDotsThreeVerticalBold } from 'react-icons/pi';
import UserFirstName from '@/src/components/common/user-firstName';
import { useUserStore } from '@/src/store/front/user';
import { getRelativeTime, timeForToday } from '@/src/utillity/utils';
import CommentEdit from '@/src/components/comment/comment-edit';
import { useDeleteComment } from '@/src/store/queryies/comment/commentQueries';
import {
   useDisclosure, Modal,
   ModalContent,
   ModalHeader,
   ModalBody,
   ModalFooter,
   useDraggable
} from '@heroui/modal';


/*
   restaurantId,
   userId: decoded.uid,
   content,
   createdAt: serverTimestamp(),

*/


// # 기본 골격 
// 댓글 몇개인지 
// 코멘트 구조는 댓글과 대댓글로 구성
// 1뎁스에서 대댓글은 해당 댓글의 아이디를 표기함 @아이디
// 어떤 댓글의 답글을 달아도 가장 하단에 표기
// 수정 시 수정됐다고 표기. 몇분 전 수정

// # 기본 기능
// 사진/아이디/며칠전/내용/좋아요/싫어요/답글/수정/삭제/별점 구성
// 소팅기능은 할지 말지 ? 결정
// 무한 스크롤링

// # 유아이 기능
// 사진/인풋만 표시.  인풋 클릭하면 커서이동 후 취소 / 댓글 버튼 표시

// # 별점 기능
// 대댓글에는 남길 수 없고 댓글에만 별점을 매길 수 있게?  
// 댓글에 평점을 남기면 글 평점과 계산해서 평점 업데이트 해야함.




// type Props = {
//    comment: any;
//    setHasMyComment: (val: boolean) => void;
// };

interface Props {
   comment: any;
   setHasMyComment: (val: boolean) => void;
}

const CommentItem = ({ comment, setHasMyComment }: Props) => {


   const { mutate: deleteCommentMutate, isError: deleteCommentError, isSuccess: deleteCommentSuccess, isPending: deleteCommentPending } = useDeleteComment()

   const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
   const targetRef = useRef(null);
   const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });
   const { userInfo } = useUserStore()


   const [isEditComment, setIsEditComment] = useState(false)
   const [isRecomment, setIsRecomment] = useState(false)

   const handleEditCommentView = () => {
      setIsEditComment(true)
      onClose()
   }

   const handleDeleteComment = () => {
      confirm('정말로 삭제하시겠습니까?')
      deleteCommentMutate({ userId: comment.uid, commentId: comment.id, restaurantId: comment.restaurantId, rating: comment.rating })
      // onClose()

   }

   const handleRecommentView = () => {
      setIsRecomment(true)
   }

   const handleEditPopOpen = () => {
      onOpen()
   }


   useEffect(() => {
      if (deleteCommentSuccess) {
         onClose();
         if (deleteCommentSuccess && typeof setHasMyComment === 'function') setHasMyComment(false)
      }
   }, [deleteCommentSuccess])

   return (
      <>
         <div>
            {/* 데이터 */}
            <div className='flex gap-[10px] mt-[25px] relative'>
               {comment.user && (
                  <UserFirstName
                     user={comment.user}
                     className={'rounded-[50%] bg-gray-700 text-white text-[14px] size-[35px] p-[5px] basis-auto grow-[0] flex-shrink-[0] m-0'}
                  />
               )}
               <div className='w-full text-[14px]'>

                  {/* 아이디 */}
                  <div className='flex items-center gap-[8px]'>
                     <span className='text-[12px]'>
                        @{comment.user.displayName}
                     </span>
                     <span className='text-[12px] text-[#999]'>
                        {timeForToday(comment.created_at)}
                     </span>
                  </div>

                  {/* 댓글 */}
                  {isEditComment ? (
                     <CommentEdit
                        comment={comment}
                        isEditComment={isEditComment}
                        setIsEditComment={setIsEditComment}
                     />
                  ) : (
                     <>
                        {/* 내용 */}
                        <div className='mt-[2px]'>{comment.content}</div>

                        {/* 평점 + 좋아요 */}
                        <div className="flex items-center mt-[5px]">
                           <PiStarFill className="size-[14px] text-[#ebdf32] mr-[4px]" />
                           <span className="text-[14px] text-[#999] flex items-center gap-[1px]">
                              <span className="text-[#ebdf32] font-bold">{Number(comment.rating).toFixed(1)}</span>
                              <span>/</span>5
                           </span>

                           <div className='flex items-center ml-[15px] gap-[4px]'>
                              <button type="button">
                                 <PiHeartDuotone className='size-[18px]' />
                              </button>
                              <span>33</span>
                           </div>
                           {/* <button type="button"><PiHeartBreakDuotone /></button> */}

                           {/* 대댓글 */}
                           <div>
                              <Button type="button" variant="light" className='text-[12px] px-[5px] py-[2px] !w-[20px] h-[20px]' onPress={handleRecommentView}>답글</Button>
                              {isRecomment && <RecommentCreate />}
                           </div>
                        </div>
                     </>

                  )}





               </div>



               {/* 자기 댓글이면 */}
               {comment?.user?.uid === userInfo?.uid && (
                  <div className='absolute right-0 top-0'>
                     <button type='button' className='' onClick={handleEditPopOpen}>
                        <PiDotsThreeVerticalBold className='size-[20px]' />
                        {/* <PiGithubLogoDuotone className='size-[20px]' /> */}
                     </button>
                  </div>
               )}
            </div>


            <div>
               {/* 아코디언 */}
               {/* <Button type="button">답글 뷰</Button> */}
            </div>




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
                           <Button
                              color="danger"
                              variant="light"
                              onPress={handleDeleteComment}
                              isLoading={deleteCommentPending}
                           >
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

         </div>


      </>

   )
}

export default CommentItem