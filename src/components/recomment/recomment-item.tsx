"use client"

import React, { useState, useRef, useEffect } from 'react'
import Loader from '../loader/loader'
import UserFirstName from '../common/user-firstName'
import { useUserStore } from '@/src/store/front/user'
import { Button } from '@heroui/button'
import { timeForToday } from '@/src/utillity/utils'
import Like from '../like/like'
import RecommentCreate from './recomment-create'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, useDraggable } from '@heroui/modal'
import { PiDotsThreeVerticalBold } from 'react-icons/pi'
import RecommentEdit from './recomment-edit'
import { useDeleteRecomment, useLikeRecomment } from '@/src/store/queryies/recomment/recommentQueries'
import { useRouter, useSearchParams } from 'next/navigation'



const RecommentItem = ({ recomment }) => {

   const { mutate: deleteRecommentMutate, isError: deleteRecommentError, isSuccess: deleteRecommentSuccess, isPending: deleteRecommentPending } = useDeleteRecomment()
   const { mutate: likeRecommentMutate, isError: likeRecommentError, isSuccess: likeRecommentSuccess, isPending: likeRecommentPending } = useLikeRecomment();


   const { userInfo } = useUserStore()
   const [createRecomment, setCreateRecomment] = useState(false)
   const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
   const targetRef = useRef(null);
   const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });
   const [isEditComment, setIsEditComment] = useState(false)
   const router = useRouter()
   const searchParams = useSearchParams()
   const category = searchParams.get('search') || '전체'

   const handleRecommentView = () => {
      if (!userInfo?.uid) {
         alert('로그인 후 가능합니다')
         router.push(`/login?prevpage=${category}`)
         return;
      }
      // setIsRecomment(true)
      setCreateRecomment(true)
   }

   // 의존성 경고때문에  ref로 수정
   const debouncedLike = useRef(_.debounce((userId: string, restaurantId: string, parentCommentId: string, recommentId: string) => {
      likeRecommentMutate({ userId, restaurantId, parentCommentId, recommentId });
   }, 1200)).current;


   const handleEditPopOpen = () => {
      onOpen()
   }

   const handleDeleteRecomment = () => {
      confirm('정말로 삭제하시겠습니까?')
      deleteRecommentMutate({ userId: recomment.uid, recommentId: recomment.id, restaurantId: recomment.restaurantId, parentCommentId: recomment.parentCommentId })
      // onClose()

   }

   const handleEditCommentView = () => {
      setIsEditComment(true)
      onClose()
   }


   // useEffect(() => {
   //    console.log('recomment?', recomment)
   //    console.log('userInfo?', userInfo)
   // }, [userInfo, recomment])


   return (
      // first:mt-0
      <div className='flex flex-wrap items-start gap-[10px] mt-[12px] first:mt-[10px] relative'>

         {isEditComment ? (
            <RecommentEdit
               recomment={recomment}
               isEditComment={isEditComment}
               setIsEditComment={setIsEditComment}
            />
         ) : (
            <>
               {/* 대댓 좌측 */}
               <div className='flex-shrink-0 flex-grow-0'>
                  {recomment?.user && (
                     <UserFirstName
                        user={recomment?.user}
                        className={'rounded-[50%] flex items-center justify-center bg-gray-700 text-white text-[11px] size-[25px] p-[5px] basis-auto grow-[0] flex-shrink-[0] m-0'}
                     />
                  )}
               </div>

               {/* 대댓 우측 */}
               <div className=''>
                  <div>
                     <Button variant='light' className='min-w-[auto] px-[0px] py-[0px] h-auto'>
                        @{recomment?.user.displayName}
                     </Button>
                     <span className='text-[12px] text-[#999] pl-[7px]'>
                        {timeForToday(recomment.created_at)}{recomment.updated_at && <span> (수정됨)</span>}
                     </span>
                  </div>
                  <div> {recomment.content}</div>

                  {/* 좋아요 + 댓글 */}
                  <div className='flex flex-wrap'>
                     <Like
                        likeLength={recomment.like}
                        hasMyLike={recomment.hasMyLike}
                        isPending={likeRecommentPending}
                        isSuccess={likeRecommentSuccess}
                        isError={likeRecommentError}
                        handleLikeClick={() => debouncedLike(userInfo.uid, recomment.restaurantId, recomment.parentCommentId, recomment.id)}
                        className='flex items-center mr-[15px]'
                        icoClassName='rounded-[50%] size-[18px] mr-[5px] p-[0px] min-w-0'
                     />

                     {/* 답글 */}
                     <div>
                        <Button type="button" variant="light" className='text-[12px] px-[5px] py-[2px] !w-[20px] h-[20px] min-w-[50px] ml-[auto]' onPress={handleRecommentView}>답글</Button>
                     </div>

                  </div>

                  {/* 대댓글에 답글 */}
                  <div>
                     {/* {createRecomment &&
                  <RecommentCreate
                     handleRecommentView={handleRecommentView}
                     hasMyRecomment={hasMyRecomment}
                     restaurantId={restaurantId}
                     commentId={commentId}
                  />} */}
                  </div>

                  {/* 자기 댓글이면 */}
                  {recomment?.user?.uid === userInfo?.uid && (
                     <div className='absolute right-0 top-0'>
                        <button type='button' className='' onClick={handleEditPopOpen}>
                           <PiDotsThreeVerticalBold className='size-[20px]' />
                           {/* <PiGithubLogoDuotone className='size-[20px]' /> */}
                        </button>
                     </div>
                  )}
               </div>
            </>
         )}


         {/* <Loader /> */}

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
                           onPress={handleDeleteRecomment}
                           isLoading={deleteRecommentPending}
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
   )
}

export default RecommentItem