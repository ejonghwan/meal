"use client"

import React, { useEffect, useRef, useState } from 'react'
import Drawer from '@/src/components/common/drawer/drawer'
import DrawerHeader from '@/src/components/common/drawer/drawer-header'
import DrawerContent from '@/src/components/common/drawer/drawer-content'
import { Button } from '@/src/components/common/Button'
import Logo from '@/src/components/common/logo'
import { Skeleton } from "@heroui/skeleton";
import { useUIStore } from '@/src/store/front/ui'
import ContentWrap from '@/src/components/common/content-wrap'
import Section from '@/src/components/common/content-section'
import { useUserStore } from '@/src/store/front/user'
import Link from 'next/link'

import dynamic from 'next/dynamic'
// import Darkmode from '@/src/components/common/darkmode'
const Darkmode = dynamic(() => import('@/src/components/common/darkmode'), { ssr: false });
import { PiSignOutBold, PiAlienDuotone, PiKeyDuotone, PiFinnTheHumanDuotone, PiHeartDuotone, PiAtBold, PiBabyBold, PiChatCircleDotsDuotone, PiLinuxLogoDuotone, PiReceiptDuotone, PiFolderOpenDuotone, PiSunDuotone, PiMoonStarsDuotone, PiArrowRightBold, PiMapTrifoldDuotone, PiMagnifyingGlassDuotone } from "react-icons/pi";
import { useTheme } from 'next-themes'
import UserFirstName from '@/src/components/common/user-firstName'
import Divider from './divider'



const HeaderMap = ({ className = '', variant }: { className?: string, variant?: any }) => {

   const { drawerIsOpen, setDrawerIsOpen } = useUIStore();
   const { loading, userInfo, isAccToken, setUserLogout } = useUserStore()
   const { theme, setTheme } = useTheme()

   const handleClick = () => {
      // console.log(drawerIsOpen)
      setDrawerIsOpen(true)
   }

   const handleLogout = () => {
      setDrawerIsOpen(false)
      setUserLogout()
   }

   useEffect(() => {
      console.log(loading)
   }, [loading])



   return (
      // bg-trans
      <ContentWrap className={`${className} z-[1] backdrop-blur-[1px] overflow-hidden`} variant={variant}>

         <Section variant='header' size='large' className='py-[10px]'>
            <header className='header flex justify-between items-center min-h-[20px]'>

               <Link href="/home">
                  <Logo className={'text-[25px] text-primary'}>MEAL ?</Logo>
               </Link>

               {/* pc */}
               <section className='mo:hidden'>
                  <div>{userInfo?.email}</div>
                  <div>{userInfo?.providerData[0]?.displayName}</div>
                  <div>내 정보</div>
               </section>



               {/* mobile */}
               <section className='pc:hidden'>
                  {/* {loading && <Skeleton className='flex rounded-full size-[40px]' />} */}
                  {!userInfo && isAccToken === null && <Skeleton className='flex rounded-full size-[35px]' />}
                  {/* {isAccToken === null && <Skeleton className='flex rounded-full size-[40px]' />} */}

                  {/* header */}


                  {userInfo && (
                     <div className='flex items-center gap-[10px]'>
                        <button type='button' className='size-[35px] flex justify-center items-center bg-white rounded-[50%] shadow-[1px_7px_10px_rgba(0,0,0,0.4)]'>
                           <PiMagnifyingGlassDuotone className='text-[17px] text-[#333]' />
                        </button>

                        <button type="button"
                           className={'rounded-[50%] bg-gray-700 text-white size-[35px] text-[14px] p-[5px] shadow-[1px_7px_10px_rgba(0,0,0,0.4)]'}
                           onClick={handleClick}
                           style={{ background: userInfo?.bg }}
                        >
                           {userInfo?.providerData[0]?.displayName.slice(0, 1).toLocaleUpperCase()}

                        </button>
                     </div>
                  )}


                  {isAccToken === false && (
                     <div className='flex gap-[12px]'>
                        {!userInfo && <Link href={'/login'} className='text-[14px]'>로그인</Link>}
                        {!userInfo && <Link href={'/signup'} className='text-[14px]'>회원가입</Link>}
                     </div>
                  )}



                  <Drawer variant="bgcolor" size="none">
                     <DrawerHeader className='drawer__header--wrap'>
                        {/* <div className="text-light">라이트 텍스트 1</div> */}
                        {/* <div className="text-light-1 dark:text-dark-1">다크 모드 텍스트</div> */}

                        <div className='drawer__userInfo--wrap'>
                           <div className="flex items-center justify-center rounded-[50%] bg-gray-700 text-white size-[40px] p-[5px]" style={{ background: userInfo?.bg }}>
                              {userInfo?.providerData[0]?.displayName.slice(0, 1).toLocaleUpperCase()}
                           </div>
                           <div>
                              <p className='drawer__userInfo--email'>{userInfo?.email}</p>
                              <p className='drawer__userInfo--name'>{userInfo?.providerData[0]?.displayName}</p>
                           </div>
                           <div className='ml-auto flex items-center'>
                              <button type='button' className='size-[20px]' onClick={() => setDrawerIsOpen(false)}>
                                 <PiArrowRightBold className='size-full' />
                              </button>
                           </div>
                        </div>
                     </DrawerHeader>
                     <DrawerContent className='drawer__content--wrap'>
                        <section className='drawer__content--sec'>
                           {userInfo &&
                              <ul className='drawer__content--list'>
                                 <li className='drawer__content--item'>
                                    <button type='button' onClick={() => setUserLogout()}>
                                       {/* <PiAlienDuotone className='size-[20px]' /> */}
                                       <PiLinuxLogoDuotone className='size-[22px]' />
                                       <span>내 정보</span>
                                    </button>
                                 </li>
                                 <li className='drawer__content--item'>
                                    <button type='button' onClick={() => setUserLogout()}>
                                       <PiReceiptDuotone className='size-[20px]' />
                                       <span>내 글</span>
                                    </button>
                                 </li>
                                 <li className='drawer__content--item'>
                                    <button type='button' onClick={() => setUserLogout()}>
                                       <PiChatCircleDotsDuotone className='size-[20px]' />
                                       <span>내 댓글</span>
                                    </button>
                                 </li>
                                 <li className='drawer__content--item'>
                                    <button type='button' onClick={() => setUserLogout()}>
                                       <PiAtBold className='size-[20px]' />
                                       <span>이메일 변경</span>
                                    </button>
                                 </li>
                                 <li className='drawer__content--item'>
                                    <button type='button' onClick={() => setUserLogout()}>
                                       <PiKeyDuotone className='size-[20px]' />
                                       <span>비밀번호 변경</span>
                                    </button>
                                 </li>

                              </ul>
                           }
                        </section>
                        <section className='drawer__content--sec'>
                           {userInfo &&
                              <ul className='drawer__content--list'>
                                 <li className='drawer__content--item'>
                                    <button type='button' onClick={() => setUserLogout()}>
                                       <PiFolderOpenDuotone className='size-[20px]' />
                                       <span>내 그룹</span>
                                    </button>
                                 </li>
                                 <li className='drawer__content--item'>
                                    <button type='button' onClick={() => setUserLogout()}>
                                       <PiHeartDuotone className='size-[20px]' />
                                       <span>좋아요</span>
                                    </button>
                                 </li>
                              </ul>
                           }
                        </section>
                        <section className='drawer__content--sec'>
                           {userInfo &&
                              <ul className='drawer__content--list'>
                                 <li className='drawer__content--item'>
                                    <button type='button' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>

                                       {theme === 'dark' ? (
                                          <>
                                             <PiMoonStarsDuotone className='size-[20px]' />
                                             <span>어두운 화면</span>
                                          </>
                                       ) : (
                                          <>
                                             <PiSunDuotone className='size-[20px]' />
                                             <span>밝은화면</span>
                                          </>
                                       )}
                                       {/* <Darkmode /> */}

                                    </button>
                                 </li>
                                 <li className='drawer__content--item'>
                                    <button type='button' onClick={handleLogout}>
                                       <PiSignOutBold className='size-[20px]' />
                                       <span>로그아웃</span>
                                    </button>
                                 </li>
                              </ul>
                           }
                        </section>
                     </DrawerContent>
                  </Drawer>

               </section>



            </header>
         </Section>
      </ContentWrap >

   )
}

export default HeaderMap