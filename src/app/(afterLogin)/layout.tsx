import React from 'react'
import Footer from '@/src/components/common/footer'
import Header from '@/src/components/common/header'
import { AuthProviderAdmin } from '@/src/components/auth/auth-provider-admin'

const layout = ({ children }) => {
   return (
      <AuthProviderAdmin>
         <Header />
         <div>
            {children}
         </div>
         <Footer className="mt-auto" />
      </AuthProviderAdmin>

   )
}

export default layout