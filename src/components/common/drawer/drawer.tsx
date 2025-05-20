"use client"

import React, { useEffect, useRef } from 'react'
import { useUIStore } from '@/src/store/front/ui'
import '@/src/styles/common/drawer.css'

import { ComponentProps, ReactNode } from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/src/utillity/cn'
import Link, { LinkProps } from 'next/link'




const DrawerVariants = cva('drawer__inner', {
   variants: {
      variant: {
         bgcolor: '',
         more: "",
         none: 'h-auto my-auto'
      },
      size: {
         none: ''
      }
   },
   defaultVariants: {
      variant: 'none',
      size: 'none'
   }
}
)


interface DrawerProps extends ComponentProps<'div'>, VariantProps<typeof DrawerVariants> {
   variant?: 'bgcolor' | 'more' | 'none'
   size?: 'none'
   children: React.ReactNode
   className?: string
}


const Drawer = ({ children, className, variant, size, ...props }: DrawerProps) => {

   const { drawerIsOpen, setDrawerIsOpen } = useUIStore();




   useEffect(() => {
      if (drawerIsOpen) {
         document.body.style.overflow = 'hidden';
      } else {
         document.body.style.overflow = '';
      }
   }, [drawerIsOpen]);


   // 이 방법은 header에 있어서 이벤트를 제거할수가 없네
   // const drawerRef = useRef(null)
   // useEffect(() => {
   //    const handleDrawerClick = (e) => {
   //       if (!e.target.closest('.drawer')) {
   //          console.log('조상 드라우 없음')
   //          // setDrawerIsOpen(false)
   //       }
   //    };
   //    // const drawerEl = drawerRef.current;
   //    // if (!drawerEl) return;

   //    window.addEventListener('click', handleDrawerClick);
   //    return () => window.removeEventListener('click', handleDrawerClick);
   // }, [])

   return (
      <>
         <article className={`drawer type1 ${drawerIsOpen ? 'active' : ''}`}>
            <div
               className={cn(DrawerVariants({ variant, size }),)}
               {...props}
            >
               {children}
            </div>
         </article>
         <div className={`drawer__dimd ${drawerIsOpen ? 'active' : ''}`} onClick={() => setDrawerIsOpen(false)}></div>
      </>
   )
}

export default Drawer