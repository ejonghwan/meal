"use client"

import React, { useEffect } from 'react'
import { PiTextAlignRightDuotone } from "react-icons/pi";
import Drawer from '@/src/components/common/drawer/drawer'

import { useUIStore } from '@/src/store/front/ui'
import ContentWrap from '@/src/components/common/content-wrap'
import Section from '@/src/components/common/content-section'
import { useUserStore } from '@/src/store/front/user'


const Header = () => {

   const { drawerIsOpen, setDrawerIsOpen } = useUIStore();
   const { userInfo } = useUserStore()


   const handleClick = () => {
      console.log(drawerIsOpen)
      setDrawerIsOpen()
   }

   return (
      <ContentWrap>
         <Section>
            <header className='header flex justify-between '>

               {userInfo ? (
                  <>
                     {userInfo.email}
                  </>
               ) : (
                  <>
                     유저없음
                  </>
               )}
               <div className='pc:hidden'>pc logo</div>
               <div className='mo:hidden'>mo logo</div>

               <button type='button' onClick={handleClick}>
                  asd
               </button>

               <Drawer variant="bgcolor" size="none" />
            </header>
         </Section>
      </ContentWrap>

   )
}

export default Header