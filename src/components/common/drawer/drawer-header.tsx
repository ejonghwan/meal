import { ComponentProps, ReactNode } from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/src/utillity/cn'


const DrawerHeaderVariants = cva('drawer__header--type1', {
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


interface DrawerHeaderProps extends ComponentProps<'div'>,  VariantProps<typeof DrawerHeaderVariants> {
   variant?: 'bgcolor' | 'more' | 'none'
   size?:'none'
    children: React.ReactNode
      className?: string
}


const DrawerHeader = ({ children, variant, size, ...props }: DrawerHeaderProps) => {
   return (
      <section className={cn(DrawerHeaderVariants({ variant, size }))} {...props}>
         {children}
      </section>
   )
}

export default DrawerHeader