"use client"

import React from 'react'
import { Button } from '@heroui/button';
import { PiHeartDuotone } from 'react-icons/pi';



// 좋아요 싫어요 기능도 댓글 기능과 마찬가지로 따로 컬렉션 생성 

interface Props {
   handleLikeClick?: any;
   likeLength: number;
   hasMyLike: boolean;
   isPending: boolean;
   isSuccess: boolean;
   isError: boolean;
   // handleUnLikeClick?: any;
   className?: string;
   icoClassName?: string;
   isLength?: boolean
}

const Like = ({ handleLikeClick, likeLength, hasMyLike, isPending, isSuccess, isError, className, icoClassName, isLength = true }: Props) => {

   return (
      <>
         <div className={className ? className : ' '}>
            <Button className={icoClassName ? icoClassName : 'rounded-[50%] w-auto h-auto size-[32px] p-[5px] min-w-0'} variant={'light'} isLoading={isPending} type="button" onPress={handleLikeClick}>
               {!isPending && <PiHeartDuotone className={`${hasMyLike ? 'text-[#ff5151]' : ''} w-full h-full`} />}
            </Button>
            <span className='text-[13px] text-[#d3d3d3] mt-[2px]' onClick={handleLikeClick}>{isLength ? likeLength || 0 : '좋아요'}</span>
         </div>
         {/* <button type='button' onClick={handleUnLikeClick}>싫어요</button> */}
      </>
   )
}

export default Like