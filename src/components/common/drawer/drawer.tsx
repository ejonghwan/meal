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
   }
)


interface DrawerProps extends ComponentProps<'div'>,  VariantProps<typeof DrawerVariants> {
   variant?: 'bgcolor' | 'more' | 'none'
   size?:'none'
   children: React.ReactNode
   className?: string
}


const Drawer = ({ children, className, variant, size, ...props }: DrawerProps) => {

   const { drawerIsOpen } = useUIStore();

   return (
      <article className={`drawer_type1 ${drawerIsOpen ? 'active' : ''}`}>
         <div
            className={cn(DrawerVariants({ variant, size }),)}
            {...props}
            >
               {children}
            </div>
      </article>
   )
}

export default Drawer