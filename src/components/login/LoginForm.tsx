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
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { loginEmail } from '@/src/data/users';

interface Props {
    // load: (token: string) => any;
}

interface User {
    email: string;
    password: string;
}



/*
    admin > server 
    auth > client
    지금 : firebase > backend > tanstack query > zustand > view 
    수정 : tanstack query > backend > admin 검증 > ok시 firebase 요청 > zustand update 

    로그인이랑 로드는 구조는 같지만 
    - 로그인에서는 성공 시 acctoken 저장. 
    - 로드는 acc 보냄
    (auth에 토큰 갱신은 수시로)
*/



const LoginForm = () => {
    const { userInfo, setUserInfo, setUserLogin, setUserLogout } = useUserStore();
    const [user, setUser] = useState<User>({ email: '', password: '' })

    // console.log("브라우저?", typeof window !== "undefined"); // true여야 함
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("🔥 유저 세션 복원됨:", user);
                // setUser(user); // 이거로 상태 저장
            } else {
                console.log("🙅 로그인 안 되어 있음");
                // setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);


    // load 부분은 나중에 옮기자 
    // let token = null;
    // if (typeof window !== 'undefined') {
    //     // console.log(localStorage)
    //     token = localStorage.getItem('x-acc-token')
    // }
    // const { data: userLoadData, isError: userLoadError, isSuccess: userLoadSuccess } = useUserLoad(token)

    // useEffect(() => {
    //     // test()
    //     console.log('load query?', userLoadData)
    //     userLoadData && setUserInfo(userLoadData)
    // }, [userLoadSuccess])




    const handleChangeUserInfo = (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement;;
        setUser({
            ...user,
            [target.name]: target.value
        })
    }

    const [testUser, setTestUser] = useState(null)
    const hoho = async (e) => {
        // data 자체가 서버파일
        // const userData = await loginEmail(user.email, user.password);

        e.preventDefault()
        const hh = signInWithEmailAndPassword(auth, user.email, user.password);
        console.log(hh)
        setTestUser(hh)
    }


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


            {/* <div className='bg-red-500'> {loginIsError ? 'error true' : 'error false'}</div> */}


            <div>load user test</div>
            {/* {userInfo.data && <div>user : {userInfo.data?.email}</div>} */}

            <div>

                {/* <button type='button' onClick={() => load('')}>load user</button> */}
            </div>

            <div>
                <button type='button' onClick={() => { setUserLogout() }}>logout</button>
            </div>

            {/* <form onSubmit={handleLogin}> */}
            <form onSubmit={hoho}>

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