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

    const handleChangeUserInfo = (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement;;
        setUser({
            ...user,
            [target.name]: target.value
        })
    }

    // login test
    const { mutate, data, error: loginError, loading: loginLoading, isSuccess } = useUserLogin({ email: user.email, password: user.password })

    // console.log('useUserLogin??????', useUserLogin({ email: user.email, password: user.password }))

    useEffect(() => {
        console.log('login data???', isSuccess)
        if (isSuccess) {
            console.log('트루다트루다', data)
            setUserLogin(data)
        }

    }, [isSuccess])


    // const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    //     try {
    //         e.preventDefault();
    //         // console.log(user)

    //         // const res = signupEmail(user.email, user.password)
    //         // console.log('res??', res)

    //         const options = {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json", },
    //             body: JSON.stringify({ email: user.email, password: user.password })
    //         }

    //         const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/login/`, options)
    //         const data = await res.json();
    //         // setUserInfo(data)
    //         setUserLogin(data)
    //     } catch (e) {
    //         console.error(e)
    //     }
    // }





    // react query test 
    // const { data, error, isLoading } = useUserLoad(localStorage.getItem('x-acc-token'));

    // useEffect(() => {
    //     // console.log('load????????????????', data.data.email, error, isLoading)
    //     // setUserInfo(data)
    //     // setUserLogin(data)
    //     console.log('load data?', data.state)
    // }, [data])



    // const { data, error, isLoading } = useUsers()
    // const { data: data11, error: error11, isLoading: isLoading11 } = useUser("30")

    // useEffect(() => {
    //     console.log(data, error, isLoading)
    //     console.log(data11, error11, isLoading11)
    // }, [isLoading, isLoading11])


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


    useEffect(() => {
        // authStateChanged();
    }, [])


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
            <form onSubmit={mutate}>

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