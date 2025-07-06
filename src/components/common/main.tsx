"use client"

import React, { useEffect } from 'react'
import ContentWrap from './content-wrap'
import Section from './content-section'
const Main = ({ children }) => {
   return (
      <ContentWrap>
         <Section variant='content' size='large' className='mt-[20px]'>
            <main>
               {children}
            </main>
         </Section>
      </ContentWrap>
   )
}

export default Main