
import React, { Suspense } from 'react'
import Test from '@/src/components/test'

const Page = () => {

    

  return (
    <div>
         {/* <Suspense fallback={<p>Loading weather...</p>} > */}
            <Test />
        {/* </Suspense> */}
    </div>
  )
}

export default Page