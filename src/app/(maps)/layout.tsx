import React from 'react'
import Footer from '@/src/components/common/footer'
import HeaderMap from '@/src/components/common/header-map'
import { AuthProviderAdmin } from '@/src/components/auth/auth-provider-admin'

const layout = ({ children }) => {
   return (
      <AuthProviderAdmin>
         <HeaderMap />
         <div>
            {children}
         </div>
         {/* <Footer className="mt-auto" /> */}
      </AuthProviderAdmin>

   )
}

export default layout