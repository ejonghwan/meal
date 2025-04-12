"use client"

import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query';
import { QueryFunction } from "@tanstack/query-core";


const TypeTest = () => {



   // ################# react query - type test
   // ################# react query - type test
   // ################# react query - type test
   type ResData = {
      completed: boolean;
      id: number;
      title: string;
      userId: number;
   }

   type Data = () => {
      completed: boolean;
      id: number;
      title: number;
      userId: string;
   }

   // const loadAPI: QueryFunction<ResData[], [_1: string, _2: string]> = async () => {
   const loadAPI = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos')
      const data = await res.json()
      return data
   }

   const { data: testData, isError: testError, isSuccess: testSuc, isLoading: testLoading } = useQuery<ResData[], Object, ResData[], [_1: string, _2: string]>({
      queryKey: ['user', 'hoho'],
      queryFn: loadAPI,
      // staleTime: 60 * 1000,
      staleTime: 3600,
      gcTime: 4000,
   })



   // normal type test
   // ResData22 여기에 slice없다고 에러남 ...확장해주니깐 됨 
   // 아래꺼 PP준거에선 어떻게 써도 에러가 안남. ?? 데이터 객체는 그냥 item에 붙여주는건가 ? 리턴값에 데이터부분은 의미없는건지 ..
   interface ResData22 extends Array<any> {
      completed: boolean;
      id: number;
      title: string;
      userId: number;
      // zz: string
   }

   // extends Array<any>
   interface DD {
      completed: boolean;
      id: number;
      title: string;
      userId: number;
      zz: string
      asd: boolean
   }

   type PP = () => Promise<ResData22[]>
   const [uData, setUdata] = useState([])
   const loadAPI2: PP = async (): Promise<DD> => {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos')
      const data = await res.json()
      setUdata(data)
      return data
   }

   useEffect(() => {
      const dd = loadAPI2()
      console.log('dd?', dd)
   }, [])



   // typeTest 
   // 유형 '() => string'은 유형 'Re'에 할당할 수 없습니다.
   // 유형 'string'은 유형 'number'에 할당할 수 없습니다.

   // 유형 '() => number'는 유형 'Re'에 할당할 수 없습니다.
   // 유형 'number'는 유형 'string'에 할당할 수 없습니다.
   type Re = () => string
   const hoho: Re = (): string => {
      return 'aa'
   }

   hoho();

   // ################# react query - type test
   // ################# react query - type test
   // ################# react query - type test




   return (
      <>
         <div>TypeTest</div>
         <div>type test</div>
         <div>
            {uData && uData?.slice(0, 3).map((item: DD, key) => {
               return (
                  <div key={key} className='bg-slate-800'>
                     <div>{item.id}</div>
                     <div>{item.title}</div>
                  </div>
               )
            })}
         </div>
         <div>type test</div>
         <div>
            {testData && testData.slice(0, 3).map((item, key) => {
               return (
                  <div key={key} className='bg-slate-800'>
                     <div>{item.id}</div>
                     <div>{item.title}</div>
                  </div>
               )
            })}
         </div>
      </>
   )
}

export default TypeTest