import React, { ComponentProps } from 'react'





interface Props extends ComponentProps<'div'> {
   variant?: 'content' | 'header' | 'none';
   size?: 'large' | 'medium' | 'small' | 'none';
   className?: string;
   children: React.ReactNode;
}


const types = {
   variants: {
      variant: {
         content: 'py-[40px]',
         header: 'py-[20px]',
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



const Section = ({ children, variant, size, className = '' }: Props) => {
   return (
      <section className={`sec__inner 
         ${variant ? types.variants.variant[variant] : types.variants.variant[types.defaultVariants.variant]}
         ${size ? types.variants.size[size] : types.variants.size[types.defaultVariants.size]}
         ${className}
      `
      }>
         {children}
      </section>
   )
}

export default Section