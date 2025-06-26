"use client"

import React from 'react'


// 좋아요 싫어요 기능도 댓글 기능과 마찬가지로 따로 컬렉션 생성 

interface Props {
   handleLikeClick?: any;
   handleUnLikeClick?: any;
}

const Like = ({ handleLikeClick, handleUnLikeClick }: Props) => {
   return (
      <>
         <button type='button' onClick={handleLikeClick}>좋아요</button>
         <button type='button' onClick={handleUnLikeClick}>싫어요</button>
      </>
   )
}

export default Like