import React from 'react'
import Footer from '@/src/components/common/footer'
import HeaderMap from '@/src/components/common/header-map'
import { AuthProvider } from '@/src/components/auth/auth-provider'

// overflow-hidden

const layout = ({ children }) => {
   return (
      <AuthProvider isLogin={true}>
         <HeaderMap />
         <div>
            {children}
         </div>
         {/* <Footer className="mt-auto" /> */}
      </AuthProvider>

   )
}

export default layout