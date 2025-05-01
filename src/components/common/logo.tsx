"use client"

import React, { useEffect } from 'react'
import { fontLogo } from '@/src/lib/ui/fonts'


import { ComponentProps, ReactNode } from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/src/utillity/cn'




const LogoVariants = cva(`logo ${fontLogo.variable}`, {
   variants: {
      variant: {
         bgcolor:
            'text-white bg-primary disabled:bg-gray7 disabled:text-gray5 rounded-[99px]',

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
})



interface LogoProps extends ComponentProps<'div'>, VariantProps<typeof LogoVariants> {
   variant?: 'bgcolor' | 'more' | 'none'
   size?: 'none'
   children: React.ReactNode
   className?: string
}


const Logo = ({ children, className, variant, size, ...props }: LogoProps) => {



   return (
      <article className={`logo__wrap`}>
         <div
            className={cn(LogoVariants({ variant, size, className }),)}
            {...props}
         >
            {children}
         </div>
      </article>
   )
}

export default Logo