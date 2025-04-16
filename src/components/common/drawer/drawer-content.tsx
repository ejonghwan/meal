import { ComponentProps, ReactNode } from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/src/utillity/cn'


const DrawerContentVariants = cva('drawer__content--type1', {
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


interface DrawerContentProps extends ComponentProps<'div'>,  VariantProps<typeof DrawerContentVariants> {
   variant?: 'bgcolor' | 'more' | 'none'
   size?:'none'
    children: React.ReactNode
      className?: string
}


const DrawerContent = ({ children, variant, size, ...props }: DrawerContentProps) => {
   return (
      <section className={cn(DrawerContentVariants({ variant, size }))} {...props}>
         {children}
      </section>
   )
}

export default DrawerContent