"use client"

import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Input } from "@nextui-org/input";
import { Button, ButtonGroup } from "@nextui-org/button";
import { useUserStore } from '@/src/store/front/user'
// import { cookies } from 'next/headers';
import { useUserLoad, useUsers, useUser, useUserLogin } from '@/src/store/queryies/user/userQueries'
import { onUserLoadAPI } from '@/src/store/queryies/user/userQueryFn'


interface Props {
    // load: (token: string) => any;
}

interface User {
    email: string;
    password: string;
}

// const accToken = localStorage.getItem('x-acc-token')


const LoginForm = () => {

    const { userInfo, setUserInfo, setUserLogin, setUserLogout } = useUserStore();
    const [user, setUser] = useState<User>({ email: '', password: '' })

    // user load 
    const { data: userLoadData, isError: userLoadError, isSuccess: userLoadSuccess } = useUserLoad()

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
        if (isSuccess) setUserLogin(data)
    }, [isSuccess])




    // tokenTest
    // const test = async () => {
    //     try {

    //         const accToken = localStorage.getItem('x-acc-token')
    //         if (accToken) {
    //             const aa = await onUserLoadAPI(accToken)
    //             setUserInfo(aa)
    //         }
    //     } 
    //     catch (e) {console.error(e)}
    //     }


    useEffect(() => {
        // test()
        console.log('load query?', userLoadData)
        userLoadData && setUserInfo(userLoadData) 
    }, [userLoadSuccess])





    useEffect(() => {
        console.log('쥬스탄드 상태 체크', userInfo)

        // authStateChanged()
    }, [userInfo])




    return (
        <div>
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