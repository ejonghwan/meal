import React from 'react'

/*
   restaurantId,
   userId: decoded.uid,
   content,
   createdAt: serverTimestamp(),

*/


// 기본 골격 
// 댓글 몇개인지 
// 코멘트 구조는 댓글과 대댓글로 구성
// 1뎁스에서 대댓글은 해당 댓글의 아이디를 표기함 @아이디
// 어떤 댓글의 답글을 달아도 가장 하단에 표기
// 수정 시 수정됐다고 표기. 몇분 전 수정


// 사진/아이디/며칠전/내용/좋아요/싫어요/답글/수정/삭제 구성
// 소팅기능은 할지 말지 ? 결정
// 무한 스크롤링

// 사진/인풋만 표시.  인풋 클릭하면 커서이동 후 취소 / 댓글 버튼 표시


const CommentItem = () => {
   return (
      <div>CommentItem</div>
   )
}

export default CommentItem