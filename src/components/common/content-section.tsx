
import { ComponentProps } from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/src/utillity/cn'




interface SectionProps extends ComponentProps<'div'>, VariantProps<typeof SectionVariants> {
   variant?: 'content' | 'header' | 'footer' | 'none';
   size?: 'large' | 'medium' | 'small' | 'none';
   className?: string;
   children: React.ReactNode;
}


const SectionVariants = cva('sec__inner', {
   variants: {
      variant: {
         content: 'my-[40px]',
         header: 'py-[20px]',
         footer: '',
         none: 'h-auto my-auto'
         // ...형태가 추가되면 아래로 추가
      },
      size: {
         // xlarge: '',
         large: 'pc:max-w-[1000px] pc:m-auto mo:w-auto mo:px-[24px]',
         medium: '',
         small: 'pc:max-w-[400px]',
         none: 'w-auto'
      },
   },
   defaultVariants: {
      variant: 'none',
      size: 'large',
   },
}
)


const Section = ({ children, className = '', variant, size, ...props }: SectionProps) => {
   return (
      <section className={cn(SectionVariants({ variant, size, className }))} {...props}>
         {children}
      </section>
   )
}

export default Section