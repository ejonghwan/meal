"use client"

import React, { useEffect } from 'react'
import { PiChatDotsDuotone, PiPlusCircleDuotone, PiSmileyXEyesDuotone } from "react-icons/pi";
// import DrawerUI from '@/src/components/common/drawer'

import { useUIStore } from '@/src/store/front/ui'

const Header = () => {

   const { isOpen, handleDrawerOpen } = useUIStore();

   const handleClick = () => {
      console.log(isOpen)
      handleDrawerOpen()
   }

   return (
      <div className='header flex justify-between'>
         <button type='button' onClick={handleClick}> zzz </button>
         {isOpen ? 'true' : 'false'}
         <PiSmileyXEyesDuotone />
         <div>logo</div>
         <div>Login</div>
      </div>
   )
}

export default Header