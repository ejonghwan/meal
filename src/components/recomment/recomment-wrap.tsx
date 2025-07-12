"use client"

import React from 'react'
import RecommentCreate from '@/src/components/recomment/recomment-create'
import RecommentItem from '@/src/components/recomment/recomment-item'
import { useLoadRecommentListInfinite } from '@/src/store/queryies/recomment/recommentQueries';
import { useUserStore } from '@/src/store/front/user';



interface Props {
   restaurantId: string;
   commentId: string;
   isRecomment: boolean;
   hasMyRecomment: boolean;
   handleRecommentView: (val: boolean) => void;
}

const RecommentWrap = ({ isRecomment, handleRecommentView, hasMyRecomment, restaurantId, commentId }: Props) => {
   const { userInfo } = useUserStore()

   const {
      data: recommentData,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      isError: recommentError,
      isLoading: recommentLoading,
      isSuccess: recommentSuccess
   } = useLoadRecommentListInfinite({ parentCommentId: commentId, limet: 5, userId: userInfo.uid })

   return (
      <>
         {/* 대댓글 생성 */}
         <div>
            {isRecomment &&
               <RecommentCreate
                  handleRecommentView={handleRecommentView}
                  hasMyRecomment={hasMyRecomment}
                  restaurantId={restaurantId}
                  commentId={commentId}
               />}
         </div>

         {/* 대댓글 리스트 */}
         <div>
            {recommentData?.pages.flatMap(item => (
               item.data.map(recomment => (
                  // <RecommentItem key={comment.id} comment={comment} setHasMyComment={setHasMyComment} />
                  <RecommentItem key={recomment.id} recomment={recomment} />
               ))
            ))}
         </div>
      </>
   )
}

export default RecommentWrap