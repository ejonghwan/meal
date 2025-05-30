"use client"

import React, { useState, useEffect } from 'react'
import { Switch } from "@heroui/switch";
import { useTheme } from "next-themes"
import dynamic from 'next/dynamic'
import { PiSunDuotone, PiMoonStarsDuotone } from 'react-icons/pi';


const Darkmode = () => {
   const { theme, setTheme } = useTheme()
   // const [mounted, setMounted] = useState(false)

   // useEffect(() => {
   //    setMounted(true)
   // }, [])

   // if (!mounted) return null // or a loader if you want

   return (
      <>
         <Switch
            isSelected={theme === 'dark'}
            onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label={theme === 'dark' ? '🌙 다크' : '☀️ 라이트'}
         >
            {/* {theme === 'dark' ? '🌙 다크' : '☀️ 라이트'} */}
            {theme !== 'dark' ? <PiSunDuotone className='size-[20px]' /> : <PiMoonStarsDuotone className='size-[20px]' />}
         </Switch>
      </>
   )
}

export default dynamic(() => Promise.resolve(Darkmode), { ssr: false });