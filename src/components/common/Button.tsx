import { VariantProps, cva } from 'class-variance-authority'
import { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/common/ui/utils'
import Link, { LinkProps } from 'next/link'

// 홍열 2024.07.08 버튼컴포넌트 커스텀
const buttonAreaVariants = cva('flex', {
   variants: {
      grid: {
         // 컬럼
         grid00: '',
         grid01: 'btn-grid01',
         grid02: 'btn-grid02',
         grid03: 'btn-grid03',
         grid04: 'btn-grid04'
      }
   },
   defaultVariants: {
      grid: 'grid00'
      // size: "default"
   }
})

interface ButtonAreaSnsProps extends ComponentProps<'div'>, VariantProps<typeof buttonAreaVariants> {
   children: ReactNode
   className?: string
   title: string
}

const ButtonAreaSns = ({ children, className, title }: ButtonAreaSnsProps) => {
   return (
      <div className={`sns-login ${className}`}>
         <p className="tit body3 mb-5 text-gray3">
            <span className="bg-white px-4">{title}</span>
         </p>
         <div className="flex gap-4">{children}</div>
      </div>
   )
}

interface ButtonAreaProps extends ComponentProps<'div'>, VariantProps<typeof buttonAreaVariants> {
   children: ReactNode
   className?: string
   grid?: 'grid00' | 'grid01' | 'grid02' | 'grid03' | 'grid04'
}

const ButtonArea = ({
   children,
   className,
   grid,
   // type,
   ...props
}: ButtonAreaProps) => {
   return (
      <>
         <div
            className={cn(
               'btn-area shrink-0',
               buttonAreaVariants({
                  className,
                  grid
                  // type,
               })
            )}
            {...props}
         >
            {children}
         </div>
      </>
   )
}

const buttonVariants = cva('disabled:pointer-events-none text-black', {
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
})



interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
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

const Button = ({ className, variant, size, ...props }: ButtonProps) => {
   return (
      <button
         type="button"
         className={cn(
            buttonVariants({
               variant,
               className,
               size
            })
         )}
         {...props}
      />
   )
}

interface ButtonLinkProps
   extends LinkProps,
   VariantProps<typeof buttonVariants> {
   children?: ReactNode
   className?: string
   variant?:
   | 'bgcolor'
   | 'bgcolorGray'
   | 'bgcolorSky'
   | 'borderPrimary'
   | 'bgcolorSecondary'
   | 'borderGray'
   | 'text'
   | 'none'
   size?: 'xlarge' | 'large' | 'medium' | 'small' | 'none'
}

const ButtonLink = ({
   children,
   className,
   variant,
   size,
   href,
   ...props
}: ButtonLinkProps) => {
   return (
      <Link
         href={href}
         className={cn(
            'block text-center',
            buttonVariants({
               variant,
               className,
               size
            })
         )}
         {...props}
      >
         {children}
      </Link>
   )
}

export { Button, ButtonArea, ButtonLink, ButtonAreaSns }



// <ButtonArea className="gap-[6px] pt-5 mo:gap-[5px] mo:border-t mo:px-[20px] mo:pb-5">
//    <Button size="small" variant="borderGray">
//       선택 위시리스트 담기
//    </Button>
//    <Button size="small" variant="borderGray">
//       선택 삭제
//    </Button>
// </ButtonArea>