import React from 'react'
import Footer from '@/src/components/common/footer'
import Header from '@/src/components/common/header'
import { AuthProvider } from '@/src/components/auth/auth-provider'

const layout = ({ children }) => {
   return (
      <AuthProvider>
         <Header />
         <div>
            {children}
         </div>
         <Footer />
      </AuthProvider>

   )
}

export default layout