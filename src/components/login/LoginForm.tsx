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

import { auth } from '@/src/data/firebaseClient'

interface Props {
    // load: (token: string) => any;
}

interface User {
    email: string;
    password: string;
}





const LoginForm = () => {
    const { userInfo, setUserInfo, setUserLogin, setUserLogout } = useUserStore();
    const [user, setUser] = useState<User>({ email: '', password: '' })


    // load 부분은 나중에 옮기자 
    let token = null;
    if (typeof window !== 'undefined') {
        // console.log(localStorage)
        token = localStorage.getItem('x-acc-token')
    }
    const { data: userLoadData, isError: userLoadError, isSuccess: userLoadSuccess } = useUserLoad(token)



    useEffect(() => {
        // test()
        console.log('load query?', userLoadData)
        userLoadData && setUserInfo(userLoadData)
    }, [userLoadSuccess])



    // login test
    const { mutate: loginMutation, data: loginData, isError: loginIsError, isSuccess: loginIsSuccess } = useUserLogin()

    const handleChangeUserInfo = (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement;;
        setUser({
            ...user,
            [target.name]: target.value
        })
    }


    const handleLoginClick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        loginMutation({ email: user.email, password: user.password })
    }


    useEffect(() => {
        if (loginIsSuccess && loginData) setUserLogin(loginData)
    }, [loginIsSuccess])


    useEffect(() => {
        console.log('is e?', loginIsError)
    }, [loginIsError])



    const hoho = async () => {

        console.log('???', auth)

    }
    useEffect(() => {
        hoho()
    }, [])




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


            <div className='bg-red-500'> {loginIsError ? 'error true' : 'error false'}</div>


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