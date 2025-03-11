"use client"

import React from 'react'
import { useUserStore } from '@/src/store/front/user';
import { useUserDelete } from '@/src/store/queryies/user/userQueries'

const DeleteId = () => {

   const { authInfo } = useUserStore();
   const { mutate: userDeleteMutate, error: signoutError, isSuccess: signoutIsSuccess } = useUserDelete(); // signout 



   const handleEmailUserDelete = () => {
      if (!authInfo) return;
      const hoho = userDeleteMutate(authInfo)
      // console.log('hoho?', hoho)
   }


   return (
      <div>
         <button type='button' onClick={handleEmailUserDelete}>회원탈퇴</button>
      </div>
   )
}

export default DeleteId