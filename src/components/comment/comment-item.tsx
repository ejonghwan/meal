"use client"

import React, { useState, useRef, useEffect, Fragment } from 'react'
import { Input } from '@heroui/input'
import { Button } from '@heroui/button';
import { PiStarFill, PiDotsThreeOutlineVerticalDuotone, PiGithubLogoDuotone, PiHeartDuotone, PiHeartBreakDuotone, PiDotsThreeVerticalBold } from 'react-icons/pi';
import UserFirstName from '@/src/components/common/user-firstName';
import { useUserStore } from '@/src/store/front/user';
import { getRelativeTime, timeForToday } from '@/src/utillity/utils';
import CommentEdit from '@/src/components/comment/comment-edit';
import { useDeleteComment, useLikeComment } from '@/src/store/queryies/comment/commentQueries';
import _ from 'lodash'
import { useRouter, useSearchParams } from 'next/navigation'
import {
   useDisclosure, Modal,
   ModalContent,
   ModalHeader,
   ModalBody,
   ModalFooter,
   useDraggable
} from '@heroui/modal';
import Like from '../like/like';
import RecommentWrap from '../recomment/recomment-wrap';


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
   const { mutate: likeCommentMutate, isError: likeCommentError, isSuccess: likeCommentSuccess, isPending: likeCommentPending } = useLikeComment();

   const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
   const targetRef = useRef(null);
   const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });
   const { userInfo } = useUserStore()
   const router = useRouter();
   const searchParams = useSearchParams()
   const category = searchParams.get('search') || '전체'

   const [isEditComment, setIsEditComment] = useState(false) // 코멘트 수정 상태
   const [isCreateRecommentView, setIsCreateRecommentView] = useState(false) // 리코멘트 인풋 보이고 안보이고 상태

   const handleEditCommentView = () => {
      setIsEditComment(true)
      onClose()
   }

   const handleDeleteComment = () => {
      confirm('정말로 삭제하시겠습니까?')
      deleteCommentMutate({ userId: comment.uid, commentId: comment.id, restaurantId: comment.restaurantId, rating: comment.rating })
      // onClose()

   }

   const handleCreateRecommentView = () => {
      if (!userInfo?.uid) {
         alert('로그인 후 가능합니다')
         router.push(`/login?prevpage=${category}`)
         return;
      }
      setIsCreateRecommentView(prev => !prev)
   }

   const handleEditPopOpen = () => {
      onOpen()
   }

   // 의존성 경고때문에  ref로 수정
   const debouncedLike = useRef(_.debounce((userId: string, commentId: string, restaurantId: string) => {
      likeCommentMutate({ userId, commentId, restaurantId });
   }, 500, { leading: true, trailing: false })).current;
   // { leading: true, trailing: false } 이 옵션없으면 1초 이후 마지막에.
   // { leading: true, trailing: false } 이 옵션있으면 처음 실행 1초동안 동시실행 안함



   useEffect(() => {
      if (deleteCommentSuccess) {
         onClose();
         if (deleteCommentSuccess && typeof setHasMyComment === 'function') setHasMyComment(false)
      }
   }, [deleteCommentSuccess])

   return (
      <>
         <div className='flex gap-[10px] mt-[25px] relative last:pb-[25px]'>

            {/* 유저 정보 */}
            {comment.user && (
               <UserFirstName
                  user={comment.user}
                  className={'rounded-[50%] bg-gray-700 text-white text-[13px] size-[30px] flex justify-center items-center p-[5px] basis-auto grow-[0] flex-shrink-[0] m-0'}
               />
            )}
            <div className='w-full text-[14px]'>

               {/* 아이디 */}
               <div className='flex items-center gap-[8px]'>
                  <span className='text-[12px]'>
                     @{comment.user.displayName}
                  </span>
                  <span className='text-[12px] text-[#999]'>
                     {timeForToday(comment.created_at)}{comment.updated_at && <span> (수정됨)</span>}
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
                     <div className="flex items-center mt-[10px]">
                        <PiStarFill className="size-[14px] text-[#ebdf32] mr-[4px]" />
                        <span className="text-[14px] text-[#999] flex items-center gap-[1px]">
                           <span className="text-[#ebdf32] font-medium">{Number(comment.rating).toFixed(1)}</span>
                           <span>/</span>5
                        </span>

                        <div className='flex items-center ml-[15px] gap-[4px]'>
                           <Like
                              likeLength={comment.like}
                              hasMyLike={comment.hasMyLike}
                              isPending={likeCommentPending}
                              isSuccess={likeCommentSuccess}
                              isError={likeCommentError}
                              handleLikeClick={() => debouncedLike(userInfo.uid, comment.id, comment.restaurantId)}
                              className='flex items-center mr-[15px]'
                              icoClassName='rounded-[50%] size-[18px] mr-[5px] p-[0px] min-w-0'
                           />
                        </div>
                        {/* <button type="button"><PiHeartBreakDuotone /></button> */}

                        {/* 대댓글 생성 */}
                        <div>
                           <Button type="button" variant="light" className='flex items-center gap-[5px] min-w-auto text-[12px] px-[10px] py-[4px] h-[20px]' onPress={handleCreateRecommentView}>
                              답글
                              <span aria-hidden="true" data-slot="indicator" data-open={isCreateRecommentView ? true : false} className="text-default-400 size-[14px] data-[open=true]:rotate-[90deg] rotate-[-90deg] ml-0">
                                 <svg aria-hidden="true" fill="none" focusable="false" height="14px" role="presentation" viewBox="0 0 24 24" width="14px" ><path d="M15.5 19l-7-7 7-7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
                                 </svg>
                              </span>
                           </Button>
                        </div>

                     </div>

                     {/* 대댓글 */}
                     <div>
                        <RecommentWrap
                           setIsCreateRecommentView={setIsCreateRecommentView}
                           isCreateRecommentView={isCreateRecommentView}
                           commentId={comment.id}
                           restaurantId={comment.restaurantId}
                           hasMyRecomment={false} //임시
                           childCommentLen={comment.recommentLen}
                        />
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
      </>

   )
}

export default CommentItem