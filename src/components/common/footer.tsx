import React from 'react'
import ContentWrap from '@/src/components/common/content-wrap'
import Section from '@/src/components/common/content-section'
import Link from 'next/link'
import Logo from '@/src/components/common/logo'

const Footer = ({ className }) => {
   return (
      <footer className={`${className ? className : ''} bg-[#18181b]`}>
         <ContentWrap>
            <Section variant='footer' size='large' className='py-[40px]'>
               <Link href="/home">
                  <Logo className={'text-[25px] text-gray3'}>MEAL ?</Logo>
               </Link>
            </Section>
         </ContentWrap>
      </footer>
   )
}

export default Footer