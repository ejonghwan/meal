"use client"

import React from 'react'
import RecommentCreate from '@/src/components/recomment/recomment-create'
import RecommentItem from '@/src/components/recomment/recomment-item'

interface Props {
   restaurantId: string;
   commentId: string;
   isRecomment: boolean;
   hasMyRecomment: boolean;
   handleRecommentView: (val: boolean) => void;
}

const RecommentWrap = ({ isRecomment, handleRecommentView, hasMyRecomment, restaurantId, commentId }: Props) => {



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
         <ul>
            {[].fill(5).map(item => {
               return (
                  <RecommentItem key={item} recommnet={item} />
               )
            })}
         </ul>
      </>
   )
}

export default RecommentWrap