import { ComponentProps } from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/src/utillity/cn'

// interface Props {
//    children: React.ReactNode
//    className?: string
// }



interface ContentWrapProps extends ComponentProps<'div'>, VariantProps<typeof ContentWrapVariants> {
   variant?: 'main';
   size?: 'none' | 'default';
   className?: string;
   children: React.ReactNode;
}


const ContentWrapVariants = cva('content_wrap', {
   variants: {
      variant: {
         main: '',
         sub: '',
         default: 'w-auto'
         // ...형태가 추가되면 아래로 추가
      },
      size: {
         none: '',
         default: ''
      },
   },
   defaultVariants: {
      variant: 'default',
      size: 'default',
   },
})





const ContentWrap = ({ children, className = '', variant, size, ...props }: ContentWrapProps) => {

   return (
      <div className={cn(ContentWrapVariants({ variant, size, className }))} {...props}>
         {children}
      </div>
   )
}


export default ContentWrap