import React from 'react'
import SSR from '@/components/csr_ssr/SSR'
import CSR from '@/components/csr_ssr/CSR'
import Image from 'next/image'
import Link from 'next/link'

const Page = async () => {

   const getDataApi = async () => {
       const res = await fetch('https://jsonplaceholder.typicode.com/posts', { cache: "no-cache" })
       const data = await res.json();
       return data;
      //  console.log('data??', res, data)
   }

   const dd = await getDataApi();
  //  console.log('ddasdasdasd?', dd)


  // html css script 
  // script 

  // 1. 백엔드 서버에서 한번 말아서 내려줌 
  // 2. 클라이언트에서 리소스들을 받으면 받은 html이랑 next(script) 소스와 하이드레이션해서 매칭을 시킨 후 
  // 3. 만약 비동기 요청소스가 있으면 저 단계에서 요청 후 섞어줌
  


  return (
    <>
      <h2>prefetch test</h2>
      <Link href="/prefetch_test">move to prefetch page</Link>

      <h2>img test</h2>
      <div style={{ position: 'relative' }}>
        <Image src={'/aab.png'} alt={'hoho'} width={50} height={50} />
      </div>
      <br />
      <div style={{ width: '200px', height: '200px', position: 'relative' }}>
        <Image src={'/error.png'} alt={'hoho'} fill loading='eager'/>
      </div>
      <div style={{ width: '100%', height: '500px', position: 'relative' }}>
        <Image src={'/error.png'} alt={'hoho'} fill loading='eager'/>
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <div className='flex'>
        <CSR data={dd} />
        <SSR data={dd} />
      </div>
    </>
  )
}

export default Page