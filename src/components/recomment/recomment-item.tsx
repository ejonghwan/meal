"use client"

import React, { useRef } from 'react'
import Loader from '../loader/loader'
import UserFirstName from '../common/user-firstName'
import { useUserStore } from '@/src/store/front/user'
import { Button } from '@heroui/button'
import { timeForToday } from '@/src/utillity/utils'
import Like from '../like/like'

const RecommentItem = ({ recomment }) => {

   const { userInfo } = useUserStore()


   const handleRecommentView = () => {
      // setIsRecomment(true)
   }

   // 의존성 경고때문에  ref로 수정
   const debouncedLike = useRef(_.debounce((userId: string, commentId: string, restaurantId: string) => {
      // likeCommentMutate({ userId, commentId, restaurantId });
   }, 1200)).current;



   return (
      // first:mt-0
      <div className='flex flex-wrap items-start gap-[10px] mt-[12px] first:mt-[20px]'>

         {/* 대댓 좌측 */}
         <div className='flex-shrink-0 flex-grow-0'>
            {userInfo.uid && (
               <UserFirstName
                  user={userInfo.providerData[0]}
                  className={'rounded-[50%] flex items-center justify-center bg-gray-700 text-white text-[12px] size-[25px] p-[5px] basis-auto grow-[0] flex-shrink-[0] m-0'}
               />
            )}
         </div>

         {/* 대댓 우측 */}
         <div className=''>
            <div>
               <Button variant='light' className='min-w-[auto] px-[0px] py-[0px] h-auto'>
                  @{userInfo.providerData[0].displayName}
               </Button>
               <span className='text-[12px] text-[#999] pl-[7px]'>
                  {timeForToday(recomment.created_at)}{recomment.updated_at && <span> (수정됨)</span>}
               </span>
            </div>
            <div> {recomment.content}</div>

            {/* 좋아요 + 댓글 */}
            <div className='w-full'>
               <Like
                  likeLength={recomment.like}
                  hasMyLike={recomment.hasMyLike}
                  // isPending={likeCommentPending}
                  // isSuccess={likeCommentSuccess}
                  // isError={likeCommentError}
                  // handleLikeClick={() => debouncedLike(userInfo.uid, comment.id, comment.restaurantId)}
                  className='flex items-center mr-[15px]'
                  icoClassName='rounded-[50%] size-[18px] mr-[5px] p-[0px] min-w-0'
               />
            </div>
            <div>
               <Button type="button" variant="light" className='text-[12px] px-[5px] py-[2px] !w-[20px] h-[20px] min-w-[50px] ml-[auto]' onPress={handleRecommentView}>답글</Button>
            </div>
         </div>


         {/* <Loader /> */}
      </div>
   )
}

export default RecommentItem