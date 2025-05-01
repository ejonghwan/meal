"use client"

import React, { useEffect, useRef, useState } from 'react'
import { PiTextAlignRightDuotone } from "react-icons/pi";
import Drawer from '@/src/components/common/drawer/drawer'
import DrawerHeader from '@/src/components/common/drawer/drawer-header'
import DrawerContent from '@/src/components/common/drawer/drawer-content'
import { Button } from '@/src/components/common/Button'
import Logo from '@/src/components/common/logo'
import dynamic from 'next/dynamic'
// import Darkmode from '@/src/components/common/darkmode'
const Darkmode = dynamic(() => import('@/src/components/common/darkmode'), { ssr: false });

import { useUIStore } from '@/src/store/front/ui'
import ContentWrap from '@/src/components/common/content-wrap'
import Section from '@/src/components/common/content-section'
import { useUserStore } from '@/src/store/front/user'
import Link from 'next/link'



const Header = () => {

   const { drawerIsOpen, setDrawerIsOpen } = useUIStore();
   const { loading, userInfo, setUserLogout } = useUserStore()


   const handleClick = () => {
      console.log(drawerIsOpen)
      setDrawerIsOpen()
   }




   return (
      <ContentWrap>
         <Section variant='header' size='large' className='border-1 border-b-gray-300'>
            <header className='header flex justify-between items-center'>



               <Logo className={'text-[25px]'}>MEAL ?</Logo>

               {/* pc */}
               <section className='mo:hidden'>
                  <div>{userInfo?.email}</div>
                  <div>{userInfo?.providerData[0]?.displayName}</div>
                  <div>내 정보</div>
               </section>


               {/* mobile */}
               <section className='pc:hidden'>
                  {loading && <p>로딩 중...</p>}
                  {userInfo ? (
                     <Button type='button' size='none' onClick={handleClick} className="rounded-[50%] bg-gray-700 text-white size-[40px] p-[5px]">
                        {userInfo?.providerData[0]?.displayName.slice(0, 1).toLocaleUpperCase()}
                     </Button>
                  ) : (
                     <>
                        {!loading && <Link href={'/login'}>로그인</Link>}
                        {!loading && <Link href={'/signup'}>회원가입</Link>}
                     </>
                  )}

                  <Drawer variant="bgcolor" size="none">
                     <DrawerHeader>
                        hoho
                     </DrawerHeader>
                     <DrawerContent>
                        <section>
                           <Darkmode />
                        </section>
                        <section>
                           {userInfo &&
                              <>
                                 <p>{userInfo.email}</p>
                                 <p>{userInfo.displayName}</p>
                                 <p><button type='button' onClick={() => setUserLogout()}>로그아웃</button></p>
                              </>
                           }
                        </section>
                     </DrawerContent>
                  </Drawer>
               </section>



            </header>
         </Section>
      </ContentWrap>

   )
}

export default Header