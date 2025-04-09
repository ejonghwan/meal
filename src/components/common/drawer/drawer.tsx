import React, { useEffect } from 'react'
import { useUIStore } from '@/src/store/front/ui'
import '@/src/styles/common/drawer.css'

// import { VariantProps, cva } from 'class-variance-authority'
import { ComponentProps, ReactNode } from 'react'
// import { cn } from '@/lib/common/ui/utils'
import Link, { LinkProps } from 'next/link'




const types = {
   variants: {
      variant: {
         // 버튼 종류
         bgcolor:
            'text-white bg-primary disabled:bg-gray7 disabled:text-gray5 rounded-[99px]',
         bgcolorLight:
            'text-primary bg-primary1 disabled:bg-gray7 disabled:text-gray5 rounded-[99px]',
         bgcolorSky:
            'bg-primary1 text-primary disabled:bg-opacity-50  disabled:text-opacity-50 rounded-[99px]',
         bgcolorGray:
            'bg-gray9 text-black disabled:text-gray5 disabled:!bg-gray7 rounded-[99px]',
         bgcolorSecondary:
            'text-white hover:text-white bg-secondary disabled:bg-gray7 disabled:text-gray5 rounded-[99px]',
         borderPrimary:
            ' bg-white border border-primary text-primary disabled:text-gray5 disabled:border-gray6 disabled:bg-white rounded-[99px]',
         borderGray:
            ' bg-white border border-gray6 disabled:border-gray6 disabled:text-gray5 disabled:bg-white rounded-[99px]',
         text: 'disabled:border-gray6 disabled:text-gray5',
         more: "mr-[44px] px-[20px] py-[10px] body3 font-bold text-white bg-primary disabled:bg-gray7 disabled:text-gray5 rounded-[99px] relative after:block after:absolute after:inset-y-0 after:right-[-5px] after:m-auto after:bg-[url('/images/common/btn_Subtract.svg')] after:w-[6px] after:h-[12px] after:bg-no-repeat before:block before:size-[40px] before:bg-primary before:absolute before:inset-y-0 before:right-[-44px] before:rounded-[50%] before:bg-[url('/images/common/ico_white_arrow.svg')] before:bg-[length:10px_12px] before:bg-center before:bg-no-repeat ",
         arrow:
            "w-[12px] h-[32px] bg-[url('/images/common/ico_link_r_arrow.svg')] bg-no-repeat bg-right-bottom",
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


interface DrawerProps extends ComponentProps<'div'> {
   variant?:
   | 'bgcolorLight'
   | 'bgcolor'
   | 'bgcolorGray'
   | 'bgcolorSky'
   | 'borderPrimary'
   | 'bgcolorSecondary'
   | 'borderGray'
   | 'text'
   | 'more'
   | 'arrow'
   | 'none'
   size?: 'xlarge' | 'large' | 'medium' | 'small' | 'none'
}


const Drawer = ({ className, variant, size, ...props }: DrawerProps) => {

   const { drawerIsOpen } = useUIStore();


   return (
      <article className={`drawer_type1 ${drawerIsOpen ? 'active' : ''}`}>
         <div
            className={`
               ${variant ? types.variants.variant[variant] : types.variants.variant[types.defaultVariants.variant]} 
               ${size ? types.variants.size[size] : types.variants.size[types.defaultVariants.size]}
            `}>Drawer Test</div>
      </article>
   )
}

export default Drawer