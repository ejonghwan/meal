"use client"

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import defaultImg from "@/public/error.png";

// const CSR = () => {
const CSR = ({ data }) => {


   // 결론 : csr에서 가져온건 미리 렌더링 안해놨지만 서버컴포에서 가져온건 렌더링 되어있음 

   const [csrData, setCsrData] = useState<any>([])
   const getDataApi = async () => {
       const res = await fetch('https://jsonplaceholder.typicode.com/todos')
       const resdata = await res.json();
      //  console.log(data)
      setCsrData(resdata)
      //  console.log('data??', res, data)
   }

   useEffect(() => {
       getDataApi();
   }, [])

   
   const handleTestClick = (e) => {
      // console.log(e.target)
      // console.log(e.currentTarget)
      // console.log(e.relatedTarget)
      // console.log(e)
     }
   const handleTestBlue = (e) => {
      // console.log(e.target)
      // console.log(e.currentTarget)
      // console.log(e.relatedTarget)
      console.log(e)
     }
  


     const [isError, setIsError] = useState(false)
     const [url, setUrl] = useState('/aab2.png')

     const handleImgError = () => {
      setUrl('/error.png')
     }


    


   //   if(isError) {
   //    return <div>
   //        <Image src="/error.png" alt=""  width={100} height={100} />
   //    </div>
   //   }
  return (
    <div>
      
      <h2>이미지 테스트 1</h2>
      <Image src="/aab.png" alt="" width={100} height={100} />

      <h2>이미지 테스트 2 {isError ? 'true':'false'}</h2>

      {isError ? (
         <Image src="/error.png" alt="" onError={() => setIsError(true)}  width={100} height={100} />
      ) : (
         <Image src="/aab2.png" alt="" onError={() => setIsError(true)}  width={100} height={100} />
      )}
      {/* <Image src="/aab2.png" alt="" onError={() => setIsError(true)}  width={100} height={100} /> */}
      {/* <Image src={url} alt="" onError={handleImgError}  width={100} height={100} /> */}
      

      {/* <h2>이미지 테스트 1</h2>
      <img src="/aab.png" alt="" width={100} height={100} />

      <h2>이미지 테스트 2 {isError ? 'true':'false'}</h2>
      <img src="/aab2.png" alt="" onError={() => { console.log('img 태그 에러'); setIsError(true) }}  width={100} height={100} />

      <img src="/aab2.png" alt="" onError={(event) => handleImgError(event)}  width={100} height={100} /> */}


      <h2>CSR</h2>
      <button type="button" className='parent' onBlur={(e) => handleTestBlue(e)}>zzzz</button>
      <div className='parent' onClick={(e) => handleTestClick(e)}>
        parent
        <div className='children1'>children1</div>
        <div className='children2'>children2</div>
        <button type='button'>btn?</button>
      </div>
      <h2>SSR 에서 보낸 props data</h2>
      <ul>
         {data.map((item, idx) => {
            return (
               <li key={idx}>{item.title}</li>
            )
         })}
      </ul>
      <h2>CSR 에서 호출한 data</h2>
      <ul>
         {csrData.map((item, idx) => {
            return (
               <li key={idx}>{item.title}</li>
            )
         })}
      </ul>
    </div>
  )
}

export default CSR