"use client"

import React, { ChangeEvent, FormEvent, useEffect, useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'

// import { signupEmail, loginEmail } from '@/src/data/firestore'
import { Input } from "@nextui-org/input";
import { Button, ButtonGroup } from "@nextui-org/button";
import SignupAuth from '@/src/components/users/SignupAuth';
import { useUserStore } from '@/src/store/front/user'






// json 됨
// import zzz from '../../../public/test.json'


interface Props {
    // signupEmail: (email: string, password: string) => void;
}

interface User {
    email: string;
    password: string;
}


const SignupForm = ({ }: Props) => {

    const router = useRouter()
    const { setAutuInfo } = useUserStore();
    const [user, setUser] = useState<User>({ email: '', password: '' })
    const [auth, setAuth] = useState(false)


    const handleChangeUserInfo = (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement;;
        setUser({
            ...user,
            [target.name]: target.value
        })
    }

    const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(user)

        // const res = signupEmail(user.email, user.password)
        // console.log('res??', res)

        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({ email: user.email, password: user.password })
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/signup/`, options)
        if (res.ok) setAuth(true)
        const data = await res.json();
        setAutuInfo(data)
        console.log('회원가입 프론트 data?', data)
    }

<<<<<<< HEAD

        // 뒤로가기 
        const isClickedFirst = useRef(false);
        const handlePopState = useCallback(() => {
        // 1. 뒤로 가기를 클릭한 순간 16라인이 바로 제거된다.
            alert('뒤로가기 클릭')
            history.pushState({ test2: 't2' }, "", "");  // 현재 경로를 다시 추가
        }, []);
            
            // 최초 한 번 실행
        useEffect(() => {

            console.log('ren ?', isClickedFirst.current, history)
            if (!isClickedFirst) {
                console.log('in red ? ', isClickedFirst.current)
                history.pushState({ test1: 't1' }, "", ""); // 처음 렌더링될 때 추가되고 뒤로 가기 클릭 시 제거된다.
                isClickedFirst.current = true;
            }
        }, []);


        useEffect(() => {
            window.addEventListener("popstate", handlePopState);
            return (() => {
              window.removeEventListener("popstate", handlePopState);
            });
          }, [handlePopState]);
 

=======
>>>>>>> fe2062754655ac7f9c95108714cf783eb3e807af
    // const outer_html = `
    //     <span>
    //         <strong>asdasasd</strong>
    //     </span>
    // `


    return (
        <div>

            {/* test */}
            {/* <div dangerouslySetInnerHTML={{ __html: outer_html }} />
            <div dangerouslySetInnerHTML={{ __html: zzz.hoho }} /> */}

            <form onSubmit={handleSignup}>
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
                    <Button className='w-full' type='submit' color="primary">회원가입a</Button>
                </div>

            </form>

            {auth && <SignupAuth />}
        </div>
    )
}

export default SignupForm