import { heroui } from "@heroui/theme"
/** @type {import('tailwindcss').Config} */
module.exports = {
  experimental: {
    optimizeUniversalDefaults: true
  },
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/react/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      container: {
        center: true,
        screens: {
          // sm: '100%',
          // md: '100%',
          // lg: '100%',
          // xl: '1920px',
          // '2xl': '1920px'
        }
      },
      backgroundImage: {
        // checkbox
        // 'icon-checkbox-on': "url('~/public/images/icons/ico_checkbox_on.svg')",
        // 'icon-checkbox-err-on':
        //   "url('~/public/images/icons/ico_checkbox_err_on.svg')",
        // 'icon-checkbox-dis-on':
        //   "url('~/public/images/icons/ico_checkbox_dis_on.svg')",
        // 'icon-checkbox02-off':
        //   "url('~/public/images/icons/ico_checkbox02_off.svg')",
        // 'icon-checkbox02-on':
        //   "url('~/public/images/icons/ico_checkbox02_on.svg')",
        // 'icon-checkbox03-on':
        //   "url('~/public/images/icons/ico_checkbox03_on.svg')",
        // radio buttons
        // 'icon-radio-on': "url('~/public/images/icons/ico_radio_on.svg')",
        // 스켈레톤 전용
        // 'gradient-custom':
        //   'linear-gradient(to right, #D9D9D9 0%, #EDEEF1 50%, #D9D9D9 100%)'
      },
      colors: {
        default: 'black', // text black
        // primary: '#FF6200', // primary normal color
        // primary1: '#FFEFE6', // primary light color
        // primary2: '#D85010', // primary heavy color
        // secondary: '#8FE519', // secondary normal color
        // secondary1: '#6DBC00', // secondary light color
        // secondary2: '#D4F8A3', // secondary heavy color
        primary: 'var(--color-primary)', // primary normal color
        primary2: 'var(--color-primary2)', // primary light color
        secondary: 'var(--color-secondary)', // secondary normal color
        secondary2: 'var(--color-secondary2)', // secondary light color
        rating: 'yellow', // secondary heavy color
        semantic: '#FF4343', // accent
        bg100: 'var(--color-bg100)', // gray-900
        bg200: 'var(--color-bg200)', // gray-900
        bg300: 'var(--color-bg300)', // gray-900
        line100: 'var(--color-line100)', // gray-900
        line200: 'var(--color-line200)', // gray-900
        line300: 'var(--color-line300)', // gray-900
        divider100: 'var(--color-divider100)', // gray-900
        gray8: 'var(--color-gray8)', // gray-900
        gray9: 'var(--color-gray9)', // gray-900
        gray10: 'var(--color-gray10)', // gray-900
        error: '#DF2101',

        'light': { // light는 접두어 없이 써야됨 : 주의
          DEFAULT: 'red', // light-text 
          1: 'orange', // light-text-1
          gray1: '#242424', // gray-900
          gray2: '#333333', // gray-800
          gray3: '#666666', // gray-700
          gray4: '#8B8B8B', // gray-600
          gray5: '#A5A5A5', // gray-500
          gray6: '#DFDFDF', // gray-400
          gray7: '#ECECEC', // gray-300
          gray8: '#f5f4f3', // gray-200
          gray9: '#f7f7f7', // gray-100
          gray10: '#fbfbfb', // gray-50
        },
        'dark': { // dark는 접두어 씀 : 주의
          DEFAULT: 'blue', // dark:text-dark
          1: 'green', // dark:text-dark-1
          gray1: '#242424', // gray-900
          gray2: '#333333', // gray-800
          gray3: '#666666', // gray-700
          gray4: '#8B8B8B', // gray-600
          gray5: '#A5A5A5', // gray-500
          gray6: '#DFDFDF', // gray-400
          gray7: '#ECECEC', // gray-300
          gray8: '#f5f4f3', // gray-200
          gray9: '#f7f7f7', // gray-100
          gray10: '#fbfbfb', // gray-50
        },
      },
      opacity: {
        opa85: '85%',
        opa70: '70%',
        opa30: '30%',
        opa10: '10%'
      },
      fontSize: {
        display1: '36px',
        title1: '30px',
        title2: '28px',
        title3: '24px',
        headline1: '20px',
        headline2: '18px',
        subHead1: '16px',
        subHead2: '14px',
        body1: '16px',
        body2: '15px',
        body3: '14px',
        label1: '13px',
        label2: '12px',
        label3: '10px'
      },
      lineHeight: {
        display1: '48px',
        title1: '36px',
        title2: '34px',
        title3: '32px',
        headline1: '28px',
        headline2: '28px',
        subHead1: '24px',
        subHead2: '20px',
        body1: '24px',
        body2: '22px',
        body3: '20px',
        label1: '18px',
        label2: '16px',
        label3: '14px'
      },
      letterSpacing: {
        display1: '-0.027em',
        title1: '-0.0267em',
        title2: '-0.0236em',
        title3: '-0.023em',
        headline1: '-0.012em',
        headline2: '-0.0075em',
        subHead1: '-0.0075em',
        subHead2: '-0.0075em',
        body1: '-0.0075em',
        body2: '-0.0075em',
        body3: '-0.0075em',
        label1: '-0.0075em',
        label2: '-0.0075em',
        label3: '-0.0075em'
      },
      spacing: {
        // '200': '200px'
      },
      fontFamily: {
        default: ['var(--font-default)'],
        logo: ['var(--font-logo)']
      },
      fontWeight: {
        default: '400',
        regular: '400',
        medium: '500',
        bold: '700'
      },
      screens: {
        mo: { max: '1024px' }, // => @media (min-width: 375px), (max-widtn: 1024px)
        pc: '1025px' // => @media (min-width: 1025px) ~
      },
      width: {
        wrapper: '1920px',
        large: '1280px',
        medium: '1140px',
        small: '530px'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        shimmer: {
          '0%': { backgroundPosition: '200%' },
          '100%': { backgroundPosition: '-200%' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        shimmer: 'shimmer 1.5s infinite linear'
      },
      boxShadow: {
        // custom: '0px 0px 24px 0px rgba(0, 0, 0, 0.10)'
        // 'xl/30': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      minWidth: {
        large: '1280px'
      },
      zIndex: {
        '1000': '1000'
      },
      backgroundSize: {
        custom: '300% 100%'
      },
    }
  },
  darkMode: "class",
  plugins: [heroui()],
}

