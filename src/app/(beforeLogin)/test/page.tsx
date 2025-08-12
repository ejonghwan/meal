
import React, { Suspense, useEffect } from 'react'
import Test from '@/src/components/test'

const Page = async () => {



  // 
    const onUserLoadAPI = async () => {
        try {
            const options = {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    // "Authorization": `Bearer ${token}`,
                },
                cache: "no-store",
            }
    
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/test/33`, options)
    
            if (!res.ok) { throw new Error('Network response was not ok'); }
            return res.json();
    
        } catch (e) {
            console.error('fetch error: ', e)
        }
    }
    

      const abc = await onUserLoadAPI();
   
    

  return (
    <div>
         {/* <Suspense fallback={<p>Loading weather...</p>} > */}
            <Test data={abc}/>
        {/* </Suspense> */}
    </div>
  )
}

export default Page