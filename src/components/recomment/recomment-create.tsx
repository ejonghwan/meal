

import React, { useState, useRef, useEffect } from 'react'
import { Input } from '@heroui/input'
import { Button } from '@heroui/button';
import { Select, SelectItem } from "@heroui/select";
import { useCreateRecomment } from '@/src/store/queryies/recomment/recommentQueries';
import { useUserStore } from '@/src/store/front/user';
import SelectWrap from '@/src/components/common/input/select';
import { PiStarFill } from 'react-icons/pi';
import { ratingSelectOPT } from '@/src/components/comment/comment-data'


interface Props {
   handleRecommentView: (val: boolean) => void;
   setIsRecommentListView: (val: boolean) => void;
   restaurantId: string;
   commentId: string;
   hasMyRecomment: boolean;
   parentReommentId?: string | boolean | null;
   targetDisplayName?: string | boolean | null;
}

const RecommentCreate = ({ hasMyRecomment, handleRecommentView, setIsRecommentListView, restaurantId, commentId, parentReommentId, targetDisplayName }: Props) => {


   const { mutate: createRecommentMutate, isError: createRecommentError, isSuccess: createRecommentSuccess, isPending: createRecommentPending } = useCreateRecomment()
   const { userInfo } = useUserStore()

   // const [isRecommentInput, setIsRecommentInput] = useState(false)
   const [isRecommentBtn, setIsRecommentBtn] = useState(false)
   const [recommentData, setRecommentData] = useState({
      userId: userInfo?.uid,
      restaurantId: restaurantId,
      parentCommentId: commentId,
      parentReommentId,
      targetDisplayName,
      // content: '',
      content: '', //여기수정해야됨
      // rating: 3,
   })


   const commentRef = useRef();

   const handleCommentHover = () => {
      setIsRecommentBtn(true)
   }

   const handleCommentClose = () => {
      if (!createRecommentPending) {

         // console.log('실행되나?')
         setIsRecommentBtn(false)
         setRecommentData(prev => ({
            ...prev,
            rating: 3,
            content: '',
         }))
      }
   }

   const handleWriteComment = (e) => {
      setRecommentData(prev => ({
         ...prev,
         content: e.target.value
      }))
   }

   const handleCreateComment = (e) => {
      e.preventDefault();
      // const savedToken = localStorage.getItem('x-acc-token');
      createRecommentMutate({ ...recommentData })
   }

   useEffect(() => {
      if (createRecommentSuccess) {
         handleCommentClose();
         setIsRecommentListView(true)
         // setHasMyRecomment(true)
      }
   }, [createRecommentSuccess])



   return (
      <>
         <form onSubmit={handleCreateComment}>
            <div className='flex gap-[10px]'>
               {!hasMyRecomment &&
                  <>
                     {/* {targetDisplayName} {parentReommentId} */}
                     <Input
                        // label={targetDisplayName !== false ? (`대댓글 @ ${<span>{targetDisplayName}</span>}`) : '대댓글'}
                        label={targetDisplayName !== false ? (`@${targetDisplayName}에게 대댓글`) : '대댓글'}
                        type="text"
                        variant={'flat'}
                        // underlined
                        className='h-[50px] mt-[10px]'
                        ref={commentRef}
                        onFocus={handleCommentHover}
                        onChange={handleWriteComment}
                        value={recommentData.content}
                     />
                  </>
               }
            </div>
            {isRecommentBtn && (
               <div className='flex justify-end gap-[5px] mt-[8px]'>
                  <Button type="button" variant='light' onPress={handleCommentClose}>취소</Button>
                  <Button type='submit'
                     variant='shadow'
                     color={recommentData.content ? 'primary' : 'default'}
                     disabled={!recommentData.content}
                     isLoading={createRecommentPending}
                  >
                     입력
                  </Button>
               </div>
            )}
         </form>
      </>
   )
}

export default RecommentCreate