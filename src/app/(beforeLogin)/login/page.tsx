import React from 'react'
import ContentWrap from '@/src/components/common/content-wrap'
import Section from '@/src/components/common/content-section'
// import LoginForm from '@/src/components/login/LoginForm'
import LoginForm_test from '@/src/components/login/LoginForm_test'

const LoginPage = () => {
   return (
      <ContentWrap>
         <Section>
            section 1
            {/* <LoginForm /> */}
            <LoginForm_test />
         </Section>
         <Section>
            section 2
         </Section>

         <Section>
            section 3
         </Section>
      </ContentWrap>

   )
}

export default LoginPage