import React, { ComponentProps } from 'react'

// interface Props {
//    children: React.ReactNode
//    className?: string
// }



interface Props extends ComponentProps<'div'> {
   variant?: 'main';
   size?: 'xlarge' | 'large' | 'medium' | 'small' | 'none';
   className?: string;
   children: React.ReactNode;
}


const types = {
   variants: {
      variant: {
         main: '',
         sub: '',
         default: 'w-auto'
         // ...형태가 추가되면 아래로 추가
      },
      size: {
         default: ''
      },
      className: {
         default: 'content-wrap',
      }
   },
   defaultVariants: {
      variant: 'default',
      size: 'default',
      className: 'default'
   },
}





const ContentWrap = ({ children, variant, size, className }: Props) => {

   return (
      <div className={`
         ${variant ? types.variants.variant[variant] : types.variants.variant[types.defaultVariants.variant]} &
         ${size ? types.variants.size[size].trim() : types.variants.size[types.defaultVariants.size]} &
         ${className ? types.variants.className[className].trim() : types.variants.className[types.defaultVariants.className]} 
      `.split(' ').join('').replaceAll('\n', '').replaceAll('&', ' ')
      }>
         {children}
      </div>
   )
}


export default ContentWrap