"use client"

import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Input } from "@nextui-org/input";
import { Button, ButtonGroup } from "@nextui-org/button";
import { cookies } from 'next/headers';
import { useUserStore } from '@/src/store/front/user'



interface Props {
    load: (token: string) => any;
}

interface User {
    email: string;
    password: string;
}


const LoginForm = ({ load }: Props) => {

    const { userInfo, setUserInfo } = useUserStore();



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
        } catch (e) {
            console.error(e)
        }
    }




    const handleUserLoad = async (token: string) => {

        console.log('???? 실행은 됨 ? ')
        try {

            // const res = signupEmail(user.email, user.password)
            // console.log('res??', res)

            const options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    // 'Cookie': `hohotoken=${token}`,
                    // "Cookie": "access-token=YOUR-TOKEN;path=/;expires=Session",
                    // 'hoho': 'zzz',
                    Authorization: `${token}`,
                },
                // body: JSON.stringify({ token: token })
                // cache: "no-store",

            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/load/`, options)


            const data = await res.json();
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        // handleUserLoad('eyJhbGciOiJSUzI1NiIsImtpZCI6IjBhYmQzYTQzMTc4YzE0MjlkNWE0NDBiYWUzNzM1NDRjMDlmNGUzODciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbWVhbC02MmNjYiIsImF1ZCI6Im1lYWwtNjJjY2IiLCJhdXRoX3RpbWUiOjE3MzczNTk4MjksInVzZXJfaWQiOiJQNm9tWHE5aHl3UWkyekYwandJTlI4TlpFeUYzIiwic3ViIjoiUDZvbVhxOWh5d1FpMnpGMGp3SU5SOE5aRXlGMyIsImlhdCI6MTczNzM1OTgyOSwiZXhwIjoxNzM3MzYzNDI5LCJlbWFpbCI6Impqb25ncnJyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImpqb25ncnJyQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.bhAdh_DN3I7gXpiYMeyoRw4FOFqeoCBTq-1JT2pA0K0zQP3kMzK_4umThfugjNBNizsi6V3XxBPJwISxp4heOdIM4jBmDa4ybBc6F7lEx2uTE3ppsA113_2H8Gbp1cV973fQTiKwi8634PIi8tOnWRTJT8rSuOVo74ZcMfK2NfcoEkvX2UfQB4qzkRb3pzbuA_YDDTJxBXlj_qBmA57FvcByUSnE5sFmrkIkhNu-NSFWsuhY2rrb9iQ3CZzY6M49gxPZ10O9fKzIvpina02GsbTI-NARXWAvOZArdSKc_fVZESYSHkL04giCsqz_xifSHAXZnyOpBJrTNhglrDGseQ')


        // const cookieStore = cookies();
        // const accessToken = cookieStore.get('accessToken');
        // // toDo 로그인을 해도 undefined가 찍힌다.
        // console.log('accessToken', accessToken);

    }, [])

    useEffect(() => {
        console.log('쥬스탄드 상태 체크', userInfo)

    }, [userInfo])


    return (
        <div>

            <div>load user test</div>
            <div>user : {userInfo.data && userInfo.data.user.email}</div>
            <div>
                <p>user load test</p>
                <button type='button' onClick={() => handleUserLoad(userInfo.data._tokenResponse.idToken)}>user load </button>
            </div>
            <div>

                {/* <button type='button' onClick={() => load('')}>load user</button> */}
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