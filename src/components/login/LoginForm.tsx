"use client"

import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { Input } from "@heroui/input";
import { Button, ButtonGroup } from "@heroui/button";
import { useUserStore } from '@/src/store/front/user'
// import { cookies } from 'next/headers';
import { useUserLoad, useUserLogin } from '@/src/store/queryies/user/userQueries'
import { onUserLoadAPI } from '@/src/store/queryies/user/userQueryFn'
import { useQuery } from '@tanstack/react-query';
import { QueryFunction } from "@tanstack/query-core";

import { auth } from '@/src/data/firebaseClient'
import { onAuthStateChanged, signInWithEmailAndPassword, signInWithCustomToken } from "firebase/auth";
// import { loginEmail } from '@/src/data/users';
import { admin } from '@/src/data/firebaseAdmin';
import {
    useRouter,
    usePathname,
    useSearchParams,
    useSelectedLayoutSegment,
    useSelectedLayoutSegments,
    redirect,
    notFound
} from 'next/navigation'
import { PiEyeClosedDuotone, PiEyeDuotone } from "react-icons/pi";




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

    상황	Firebase Admin SDK 필요 여부
    로그인 UI 구현 / 상태 관리	❌ 클라이언트 SDK로 충분
    API 서버에서 유저 인증이 필요한 작업 (ex. DB 접근)	✅ 필요!
    public API, 인증 필요 없는 작업	❌ 필요 없음
    보안이 중요한 처리 (ex. 결제, 데이터 수정 등)	✅ 무조건 검증 필요
*/



const LoginForm = () => {
    const { userInfo, setUserInfo, setUserLogin, setUserLogout } = useUserStore();
    // const user = useUserStore((state) => state.user)
    const [user, setUser] = useState<User>({ email: '', password: '' })
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const router = useRouter()


    // admin 
    const { mutate: loginMutation, data: loginData, isError: loginIsError, isSuccess: loginIsSuccess } = useUserLogin()

    // console.log("브라우저?", typeof window !== "undefined"); // true여야 함

    // 로그인된 유저는 아예 못접근하게 막아야됨
    useEffect(() => {
        if (userInfo) router.push('/home')
    }, [userInfo])


    useEffect(() => {

        if (loginIsError) console.error("로그인 실패 😢");
        if (loginIsSuccess) {
            console.log("로그인 성공 🎉", loginData);
            setUserLogin(loginData)

            alert('로그인 성공!');
            router.push('/home');
        }




    }, [loginIsSuccess, loginIsError]);


    useEffect(() => {
        console.log('쥬스탄드 상태 체크 userInfo? ', userInfo)

        // FirebaseError: Firebase: Error (auth/internal-error). 이거해결해야됨. 새로고침할때 커스텀토큰 없다고 ... 로그인페이지에만 (근데 여긴 로그인한 사람이 접근못하게 하면 될듯)
        // signInWithCustomToken 이거 왜 한거지 ? 로그인할때 커스텀토큰 안하면 인증못함
        if (userInfo) signInWithCustomToken(auth, userInfo?.customAccToken)

    }, [userInfo])



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



    return (
        <div>


            <div>load user test</div>

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
                        type={isVisible ? "text" : "password"}
                        name='password'
                        // placeholder="password"
                        value={user.password}
                        onChange={handleChangeUserInfo}
                        autoComplete='on'
                        endContent={
                            <button
                                aria-label="toggle password visibility"
                                className="focus:outline-none"
                                type="button"
                                onClick={toggleVisibility}
                            >
                                {isVisible ? (
                                    <PiEyeDuotone className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <PiEyeClosedDuotone className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                    />
                    <Button className='w-full' type='submit' color="primary">로그인</Button>
                </div>

            </form>
        </div>
    )
}

export default LoginForm