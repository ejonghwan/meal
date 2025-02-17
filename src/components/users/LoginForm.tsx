"use client"

import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Input } from "@nextui-org/input";
import { Button, ButtonGroup } from "@nextui-org/button";
// import { cookies } from 'next/headers';
import { useUserStore } from '@/src/store/front/user'

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
        mutate({ email: user.email, password: user.password })
    }


    useEffect(() => {
        console.log('login data???', isSuccess)
        if (isSuccess) {
            console.log('트루다트루다', data)
            setUserLogin(data)
        }


    }, [isSuccess])




    // tokenTest
    const test = async () => {
        const accToken = localStorage.getItem('x-acc-token')
        if (accToken) {
            const aa = await onUserLoadAPI(accToken)
            console.log('aa?????????', aa)
            setUserInfo(aa)
        }
    }
    useEffect(() => {
        test()
    }, [])





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