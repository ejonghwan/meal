"use client"

import React, { useEffect, useState } from 'react'
import RecommentCreate from '@/src/components/recomment/recomment-create'
import RecommentItem from '@/src/components/recomment/recomment-item'
import { useLoadRecommentListInfinite } from '@/src/store/queryies/recomment/recommentQueries';
import { useUserStore } from '@/src/store/front/user';
import { Button } from '@heroui/button';
import { Accordion, AccordionItem } from '@heroui/accordion';
import '@/src/styles/recomment/recomment.css'
import RecommentSkeleton from '@/src/components/recomment/recomment-skeleton';



interface Props {
   restaurantId: string;
   commentId: string;
   isRecomment: boolean;
   hasMyRecomment: boolean;
   childCommentLen: number;
   handleRecommentView: (val: boolean) => void;
}

const RecommentWrap = ({ isRecomment, handleRecommentView, hasMyRecomment, restaurantId, commentId, childCommentLen }: Props) => {
   const { userInfo } = useUserStore()
   const [isRecommentView, setIsRecommentView] = useState(false) // 대댓글 보기


   const {
      data: recommentData,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      isError: recommentError,
      isLoading: recommentLoading,
      isSuccess: recommentSuccess
   } = useLoadRecommentListInfinite({ parentCommentId: commentId, limet: 5, userId: userInfo.uid }, { enabled: isRecommentView })


   const handleClickRecommentView = () => {
      setIsRecommentView(true)
   }

   const handleClickNextRecomment = () => {
      fetchNextPage()
   }

   // 270 90 

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

         {childCommentLen > 0 && (
            <div>
               {/* <Button type="button" variant="light" className='text-[12px] px-[5px] py-[2px] !w-[20px] h-[20px] min-w-[50px] ml-[auto]' onPress={handleClickRecommentView}>답글 보기</Button> */}
               <Accordion selectionMode="multiple" className='recomment--acc'>
                  <AccordionItem key="1" aria-label="답글 보기"
                     classNames={{
                        indicator: "rotate-[270deg] data-[open=true]:rotate-[90deg]",
                     }}
                     title={
                        <>
                           <span>답글보기</span>
                           <span className='ml-[5px]'>{childCommentLen}개</span>
                        </>
                     }
                     onPress={handleClickRecommentView}
                  >
                     {/* 대댓글 리스트 */}
                     {isRecommentView && (
                        <div>
                           {recommentData?.pages.flatMap(item => (
                              item.data.map(recomment => (
                                 // <RecommentItem key={comment.id} comment={comment} setHasMyComment={setHasMyComment} />
                                 <RecommentItem key={recomment.id} recomment={recomment} />
                              ))
                           ))}
                        </div>
                     )}

                     {/* 더보기 버튼 */}
                     {hasNextPage && (
                        <>
                           <div className="mt-[30px] flex justify-center">
                              <Button type="button" variant="shadow" color="default" onPress={handleClickNextRecomment} isLoading={isFetchingNextPage} disabled={isFetchingNextPage}>더 보기</Button>
                           </div>
                           {isFetchingNextPage && <RecommentSkeleton len={3} />}
                        </>
                     )}
                  </AccordionItem>

               </Accordion>
            </div>
         )}
      </>
   )
}

export default RecommentWrap