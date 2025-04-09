"use client"

import React, { useEffect } from 'react'
import { PiChatDotsDuotone, PiPlusCircleDuotone, PiSmileyXEyesDuotone } from "react-icons/pi";
import Drawer from '@/src/components/common/drawer/drawer'

import { useUIStore } from '@/src/store/front/ui'


const Header = () => {

   const { drawerIsOpen, setDrawerIsOpen } = useUIStore();

   const handleClick = () => {
      console.log(drawerIsOpen)
      setDrawerIsOpen()
   }

   return (
      <div className='header flex justify-between'>
         <button type='button' onClick={handleClick}> zzz </button>
         {drawerIsOpen ? 'true' : 'false'}
         <Drawer variant="bgcolor" size="none" />
         <PiSmileyXEyesDuotone />
         <div>logo</div>
         <div>Login</div>
      </div>
   )
}

export default Header