"use client"

import React from 'react'
import { Input } from '@heroui/input'
import { Button } from '@heroui/button';
import RecommentCreate from '@/src/components/recomment/recomment-create'

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

const CommentItem = () => {


   return (
      <>
         <div>
            {/* 데이터 */}
            코멘트 내용
            <div>
               <Button type="button">수정</Button>
               <Button type="button">삭제</Button>
            </div>
            <div>
               <Button type="button">좋아요</Button>
               <Button type="button">싫어요</Button>
            </div>


            <div>
               <Button type="button">답글 작성</Button>
               <RecommentCreate />
            </div>
            <div>
               {/* 아코디언 */}
               <Button type="button">답글 뷰</Button>

            </div>
         </div>


         <div>
            {/* 수정하기 */}
            <Input label="댓글" type="text" variant={'underlined'} />
            <Button type="button">취소</Button>
            <Button type="button">입력</Button>
         </div>




      </>

   )
}

export default CommentItem