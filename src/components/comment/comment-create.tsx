"use client"

import React from 'react'
import { Input } from '@heroui/input'
import { Button } from '@heroui/button';


const CommentCreate = () => {


   return (
      <>
         <Input label="댓글" type="text" variant={'underlined'} />

         <Button type="button">좋아요</Button>
         <Button type="button">싫어요</Button>
         <Button type="button">취소</Button>
         <Button type="button">입력</Button>
      </>

   )
}

export default CommentCreate