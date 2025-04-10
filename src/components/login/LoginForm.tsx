"use client"

import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { Input } from "@nextui-org/input";
import { Button, ButtonGroup } from "@nextui-org/button";
import { useUserStore } from '@/src/store/front/user'
// import { cookies } from 'next/headers';
import { useUserLoad, useUsers, useUser, useUserLogin } from '@/src/store/queryies/user/userQueries'
import { onUserLoadAPI } from '@/src/store/queryies/user/userQueryFn'
import { useQuery } from '@tanstack/react-query';
import { QueryFunction } from "@tanstack/query-core";


interface Props {
    // load: (token: string) => any;
}

interface User {
    email: string;
    password: string;
}




const LoginForm = () => {

    // {
    //     "state": "SUCCES",
    //     "message": "성공",
    //     "data": {
    //         "providerId": "password",
    //         "uid": "sun87-1@daum.net",
    //         "displayName": null,
    //         "email": "sun87-1@daum.net",
    //         "phoneNumber": null,
    //         "photoURL": null,
    //         "accToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjMwYjIyMWFiNjU2MTdiY2Y4N2VlMGY4NDYyZjc0ZTM2NTIyY2EyZTQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbWVhbC02MmNjYiIsImF1ZCI6Im1lYWwtNjJjY2IiLCJhdXRoX3RpbWUiOjE3NDI3ODc1MzAsInVzZXJfaWQiOiJnREI3Nm5CNkY3ZWhTUWlEczY3WVNodDQ2WlIyIiwic3ViIjoiZ0RCNzZuQjZGN2VoU1FpRHM2N1lTaHQ0NlpSMiIsImlhdCI6MTc0Mjc4NzUzMCwiZXhwIjoxNzQyNzkxMTMwLCJlbWFpbCI6InN1bjg3LTFAZGF1bS5uZXQiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsic3VuODctMUBkYXVtLm5ldCJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.pbZgo16lTixyy31VknsZRAqTHTd7Rxn1ZEOGzO00Qu66iZE8EMh0auGWeO30qmhlcoz712ptt1itf7pp8MSGK85rVXJ9mZgijCAzLzTk-tglM5zabqrDsb2JGipiVV-_FBvWSPkirYWkPgF-I-SAa0RyA7DWVEehyJg9PO9ozfGsjAktl9khf7O-9GDi02Tpu-P5KjhMRWTM_P7TNTFkTfU-KeNPceu5GxPG57f8_dsG4ugOiDp1sEz-aeSCd3t22gsgIli3yCRMkNmdYvUNnaw0YesPhfU2Yrn6MXjqq2naXw-8dsbgVXdj1bs0wkwZXxPLa5wyfUWVhkrdy3WW0w"
    //     }
    // }


    // {
    //     "state": "SUCCES",
    //     "message": "성공",
    //     "data": {
    //         "uid": "gDB76nB6F7ehSQiDs67YSht46ZR2",
    //         "email": "sun87-1@daum.net",
    //         "emailVerified": false,
    //         "disabled": false,
    //         "metadata": {
    //             "lastSignInTime": "Mon, 24 Mar 2025 03:38:26 GMT",
    //             "creationTime": "Thu, 16 Jan 2025 14:39:05 GMT",
    //             "lastRefreshTime": "Mon, 24 Mar 2025 03:38:26 GMT"
    //         },
    //         "tokensValidAfterTime": "Thu, 16 Jan 2025 14:39:05 GMT",
    //         "providerData": [
    //             {
    //                 "uid": "sun87-1@daum.net",
    //                 "email": "sun87-1@daum.net",
    //                 "providerId": "password"
    //             }
    //         ]
    //     }
    // }


    const { userInfo, setUserInfo, setUserLogin, setUserLogout } = useUserStore();
    const [user, setUser] = useState<User>({ email: '', password: '' })


    // load 부분은 나중에 옮기자 
    let token = null;
    if (typeof window !== 'undefined') {
        // console.log(localStorage)
        token = localStorage.getItem('x-acc-token')
    }
    const { data: userLoadData, isError: userLoadError, isSuccess: userLoadSuccess } = useUserLoad(token)


    // login test
    const { mutate, data, error: loginError, isSuccess } = useUserLogin()

    const handleChangeUserInfo = (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement;;
        setUser({
            ...user,
            [target.name]: target.value
        })
    }


    const handleLoginClick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate({ email: user.email, password: user.password })
    }


    useEffect(() => {
        console.log('???????????dd', data)
        if (isSuccess) setUserLogin(data)
    }, [isSuccess])



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






    useEffect(() => {
        // test()
        console.log('load query?', userLoadData)
        userLoadData && setUserInfo(userLoadData)
    }, [userLoadSuccess])





    useEffect(() => {
        console.log('쥬스탄드 상태 체크 userInfo? ', userInfo)

        // authStateChanged()
    }, [userInfo])




    return (
        <div>
            {/* <div className='border-2 border-red-500'>
                <div>user test</div>
                <div>{userInfo?.data.email}</div>
                <div>{userInfo?.data.uid}</div>
            </div> */}


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


            <div>load user test</div>
            {/* {userInfo.data && <div>user : {userInfo.data?.email}</div>} */}

            <div>

                {/* <button type='button' onClick={() => load('')}>load user</button> */}
            </div>

            <div>
                <button type='button' onClick={() => { setUserLogout() }}>logout</button>
            </div>

            {/* <form onSubmit={handleLogin}> */}
            <form onSubmit={handleLoginClick}>

                <div className='flex flex-col gap-2 zz mt-[20px]'>
                    <Input
                        label="Email"
                        isRequired
                        className="w-full input"
                        defaultValue=""
                        type="email"
                        name='email'
                        // placeholder="email"
                        value={user.email}
                        onChange={handleChangeUserInfo}
                    />
                    <Input
                        label="Password"
                        isRequired
                        className="w-full input"
                        defaultValue=""
                        type="password"
                        name='password'
                        // placeholder="password"
                        value={user.password}
                        onChange={handleChangeUserInfo}
                        autoComplete='on'
                    />
                    <Button className='w-full' type='submit' color="primary">로그인</Button>
                </div>

            </form>
        </div>
    )
}

export default LoginForm