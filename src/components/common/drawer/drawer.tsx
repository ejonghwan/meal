import React, { useEffect } from 'react'
import { useUIStore } from '@/src/store/front/ui'
import '@/src/styles/common/drawer.css'

import { ComponentProps, ReactNode } from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/src/utillity/cn'
import Link, { LinkProps } from 'next/link'




const DrawerVariants = cva('drawer_type1', {
      variants: {
         variant: {
            // 버튼 종류
            bgcolor:
               'text-white bg-primary disabled:bg-gray7 disabled:text-gray5 rounded-[99px]',
          
            more: "",
            none: 'h-auto my-auto'
            // ...버튼 형태가 추가되면 아래로 추가
         },
         // button, font size
         size: {
            xlarge: 'min-h-[50px] px-[16px] py-[14px] body2 font-bold !leading-none',
            large: 'min-h-[44px] px-[16px] py-[12px] body3 font-bold !leading-none',
            medium: 'min-h-[36px] px-[8px] py-[9px] label1 font-medium !leading-none',
            small: 'min-h-[32px] px-[8px] py-[7px] label1 font-medium !leading-none',
            none: ''
         }
      },
      defaultVariants: {
         variant: 'none',
         size: 'large'
      }
   }
)


interface DrawerProps extends ComponentProps<'div'>,  VariantProps<typeof DrawerVariants> {
   variant?: 'bgcolor' | 'more' | 'none'
   size?: 'xlarge' | 'large' | 'medium' | 'small' | 'none'
}


const Drawer = ({ className, variant, size, ...props }: DrawerProps) => {

   const { drawerIsOpen } = useUIStore();


   return (
      <article className={`drawer_type1 ${drawerIsOpen ? 'active' : ''}`}>
         <div
            // className={`
            //    ${variant ? types.variants.variant[variant] : types.variants.variant[types.defaultVariants.variant]} 
            //    ${size ? types.variants.size[size] : types.variants.size[types.defaultVariants.size]}
            // `}
            className={cn(DrawerVariants({ variant, size }),)}
            {...props}
            >
               Drawer Test
            </div>
      </article>
   )
}

export default Drawer