"use client"

import React from 'react'
import { Input } from '@heroui/input'
import { Button } from '@heroui/button';
import RecommentCreate from '@/src/components/recomment/recomment-create'
import { PiStarFill, PiDotsThreeOutlineVerticalDuotone, PiGithubLogoDuotone, PiHeartDuotone, PiHeartBreakDuotone } from 'react-icons/pi';
import UserFirstName from '@/src/components/common/user-firstName';
import {
   useDisclosure, Modal,
   ModalContent,
   ModalHeader,
   ModalBody,
   ModalFooter,
   useDraggable
} from '@heroui/modal';


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

const CommentItem = ({ comment }) => {

   const { isOpen, onOpen, onOpenChange } = useDisclosure();
   const targetRef = React.useRef(null);
   const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });

   return (
      <>
         <div>
            {/* 데이터 */}
            <div className='flex gap-[10px] mt-[20px]'>
               {comment.user && (
                  <UserFirstName
                     user={comment.user}
                     className={'rounded-[50%] bg-gray-700 text-white size-[40px] p-[5px] basis-auto grow-[0] flex-shrink-[0] m-0'}
                  />
               )}
               <div className='text-[14px]'>

                  {/* 아이디 + 댓글 */}
                  <div className='flex items-center gap-[5px]'>
                     <button type='button' className='text-[12px]' onClick={() => { }}>
                        @{comment.user.displayName}
                     </button>
                     <span className='text-[12px] text-[#999]'>2개월전</span>
                  </div>
                  <div className='mt-[0px]'>{comment.content}</div>

                  {/* 평점 + 좋아요 */}
                  <div className="flex items-center mt-[5px]">
                     <PiStarFill className="size-[18px] text-[#ebdf32] mr-[2px]" />
                     <span className="text-[14px] text-[#999] flex items-center gap-[1px]">
                        <span className="text-[#ebdf32] font-bold">{comment.rating}</span>
                        <span>/</span>5
                     </span>

                     <div className='flex items-center ml-[10px] gap-[3px]'>
                        <button type="button">
                           <PiHeartDuotone className='size-[18px]' />
                        </button>
                        <span>33</span>
                     </div>
                     {/* <button type="button"><PiHeartBreakDuotone /></button> */}

                     {/* 대댓글 */}
                     <div>
                        <Button type="button" variant="light" className='text-[12px] px-[5px] py-[2px] !w-[20px] h-[20px]'>답글</Button>
                        {/* <RecommentCreate /> */}
                     </div>
                  </div>


               </div>



               {/* 자기 댓글이면 */}
               <div className='ml-auto'>
                  <button type='button' className='p-[3px]' onClick={onOpen}>
                     <PiDotsThreeOutlineVerticalDuotone className='size-[20px]' />
                     {/* <PiGithubLogoDuotone className='size-[20px]' /> */}
                  </button>
               </div>
            </div>




            <div>
               {/* 아코디언 */}
               {/* <Button type="button">답글 뷰</Button> */}

            </div>
         </div>


         <div>
            {/* 수정하기 */}
            <Input label="댓글" type="text" variant={'underlined'} />
            <Button type="button">취소</Button>
            <Button type="button">입력</Button>
         </div>




         <Modal ref={targetRef} isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
               {(onClose) => (
                  <>
                     <ModalHeader {...moveProps} className="flex flex-col gap-1">
                        삭제삭제수정수정
                     </ModalHeader>
                     <ModalBody>
                        <p>
                           삭제삭제수정수정
                        </p>
                     </ModalBody>
                     <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                           삭제
                        </Button>
                        <Button color="primary" onPress={onClose}>
                           수정
                        </Button>
                     </ModalFooter>
                  </>
               )}
            </ModalContent>
         </Modal>




      </>

   )
}

export default CommentItem