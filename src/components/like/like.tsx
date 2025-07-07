"use client"

import React from 'react'
import { PiHeartDuotone } from 'react-icons/pi';


// 좋아요 싫어요 기능도 댓글 기능과 마찬가지로 따로 컬렉션 생성 

interface Props {
   handleLikeClick?: any;
   likeLength: number;
   hasMyLike: boolean
   // handleUnLikeClick?: any;
}

const Like = ({ handleLikeClick, likeLength, hasMyLike }: Props) => {
   return (
      <>
         <div className='flex items-center ml-[15px] gap-[4px]'>
            <button type="button" onClick={handleLikeClick}>
               <PiHeartDuotone className={`size-[18px] ${hasMyLike ? 'text-[#ff5151]' : ''}`} />
            </button>
            <span>{likeLength}</span>
         </div>
         {/* <button type='button' onClick={handleUnLikeClick}>싫어요</button> */}
      </>
   )
}

export default Like