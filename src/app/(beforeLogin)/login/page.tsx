import React from 'react'
import ContentWrap from '@/src/components/common/content-wrap'
import Section from '@/src/components/common/content-section'
import LoginForm from '@/src/components/login/LoginForm'

const LoginPage = () => {
   return (
      <div>
         <ContentWrap>
            <Section>

               <LoginForm />
            </Section>
         </ContentWrap>
      </div>
   )
}

export default LoginPage