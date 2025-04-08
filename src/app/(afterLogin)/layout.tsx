import Footer from '@/src/components/common/footer'
import Header from '@/src/components/common/header'
import React from 'react'

const layout = ({ children }) => {
   return (
      <>
         <Header />
         <div>
            {children}
         </div>
         <Footer />
      </>

   )
}

export default layout