"use client"

import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Input } from "@nextui-org/input";
import { Button, ButtonGroup } from "@nextui-org/button";
// import { cookies } from 'next/headers';
import { useUserStore } from '@/src/store/front/user'

import { useUserLoad, useUsers, useUser } from '@/src/store/queryies/user/userQueries'



interface Props {
    // load: (token: string) => any;
}

interface User {
    email: string;
    password: string;
}

// const accToken = localStorage.getItem('x-acc-token')


const LoginForm = () => {

    const { userInfo, setUserInfo, setUserLogout } = useUserStore();



    const [user, setUser] = useState<User>({ email: '', password: '' })

    const handleChangeUserInfo = (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement;;
        setUser({
            ...user,
            [target.name]: target.value
        })
    }



    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            // console.log(user)

            // const res = signupEmail(user.email, user.password)
            // console.log('res??', res)

            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify({ email: user.email, password: user.password })
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/login/`, options)
            const data = await res.json();
            setUserInfo(data)
            setUserLogin(data)
        } catch (e) {
            console.error(e)
        }
    }





    // react query test 

    const { data, error, isLoading } = useUserLoad(localStorage.getItem('x-acc-token'));



    useEffect(() => {
        console.log(data, error, isLoading)
    }, [data, error, isLoading])

    // const { data, error, isLoading } = useUsers()
    // const { data: data11, error: error11, isLoading: isLoading11 } = useUser("30")

    // useEffect(() => {
    //     console.log(data, error, isLoading)
    //     console.log(data11, error11, isLoading11)
    // }, [isLoading, isLoading11])




    const handleUserLoad = (token: string) => {

        // console.log('react query ??????', data, error, isLoading)

        // console.log('???? 실행은 됨 ? ')
        // try {
        //     const options = {
        //         method: "GET",
        //         headers: {
        //             "Content-Type": "application/json",
        //             "x-acc-token": `${token}`,
        //         },
        //         // body: JSON.stringify({ token: token })
        //         // cache: "no-store",

        //     }

        //     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/load/`, options)

        //     console.log('확인하자아아아아', res)
        //     const data = await res.json();
        // } catch (e) {
        //     console.error(e)
        // }
    }

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
            <div>user : {userInfo.data && userInfo.data.email}</div>
            <div>
                <p>user load test</p>
                <button type='button' onClick={() => handleUserLoad(userInfo.data._tokenResponse.idToken)}>user load </button>
            </div>
            <div>

                {/* <button type='button' onClick={() => load('')}>load user</button> */}
            </div>

            <div>
                <button type='button' onClick={() => { setUserLogout() }}>logout</button>
            </div>

            <form onSubmit={handleLogin}>

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





