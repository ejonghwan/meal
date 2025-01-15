import React from 'react'
import SSRChildren from '@/components/csr_ssr/SSR_children'
import CSRChildren from '@/components/csr_ssr/CSR_children'

const Page = () => {
  return (
    <div>
        {/* <SSRChildren /> */}

        {/* CSR 컴포넌트에서 SSR 컴포넌트 호출 */}
        {/* <CSRChildren /> */}

        <CSRChildren>
            <SSRChildren /> 
        </CSRChildren>
    </div>
  )
}

export default Page