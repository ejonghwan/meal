import React from 'react'
import Footer from '@/src/components/common/footer'
import Header from '@/src/components/common/header'
// import { AuthProviderAdmin } from '@/src/components/auth/auth-provider-admin'
import { AuthProvider } from '@/src/components/auth/auth-provider'

const layout = ({ children }) => {
   return (
      <AuthProvider isLogin={true}>
         <Header />
         <div>
            {children}
         </div>
         <Footer className="mt-auto" />
      </AuthProvider>

   )
}

export default layout