"use client"

import React, { ChangeEvent, FormEvent, useEffect, useState, useCallback, useRef } from 'react'
import { Checkbox } from "@heroui/checkbox";
import { useRouter } from 'next/navigation'


// import { signupEmail, loginEmail } from '@/src/data/firestore'
import { Input } from "@nextui-org/input";

import { Button, ButtonGroup } from "@nextui-org/button";
import SignupAuth from '@/src/components/signup/SignupAuth';
import { useUserStore } from '@/src/store/front/user'
import { passwordChecked, englishChecked } from '@/src/utillity/utils';
import { useUserSignup } from '@/src/store/queryies/user/userQueries';


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
    const [passwordCheck, setPasswordCheck] = useState('')
    const [englishCheckedState, setEnglishCheckedState] = useState<Boolean>(null)
    const [passwordProtected, setPasswordProtected] = useState<Boolean>(null)
    const [auth, setAuth] = useState(false)

    const { data, mutate: userSignupMutate, error: userSignupError, isSuccess: userSignupIsSuccess } = useUserSignup(); // signout 

    // passwordChecked()
    const handleChangeUserInfo = (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement;;
        setUser({
            ...user,
            [target.name]: target.value
        })
    }

    const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        userSignupMutate(user)
    }


    useEffect(() => {
        if (!userSignupIsSuccess) return;
        setAuth(true)
        setAutuInfo(data)
    }, [userSignupIsSuccess])


    useEffect(() => { //비번 강화 체크 
        user.password && passwordChecked(user.password) ? setPasswordProtected(true) : setPasswordProtected(false);
    }, [user.password]);

    useEffect(() => { //de 
        user.email && englishChecked(user.email) ? setEnglishCheckedState(false) : setEnglishCheckedState(true);
    }, [user.email]);






    return (
        <div>
            <form onSubmit={handleSignup}>
                <div className='flex flex-col gap-2 zz mt-[20px]'>
                    <Input
                        label="이메일"
                        isRequired
                        className="w-full input"
                        defaultValue=""
                        type="email"
                        name='email'
                        // placeholder="email"
                        value={user.email}
                        onChange={handleChangeUserInfo}
                    />
                    {englishCheckedState ? <div>englishCheckedState</div> : <div>!englishCheckedState</div>}

                    <Input
                        label="비밀번호"
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
                    {passwordProtected ? <div>안전한 비밀번호입니다</div> : <div>비번 체크 (8~ 16글자 + 1개 이상의 숫자 + 1개 이상의 특수문자 + 온니 영문) </div>}

                    <Input
                        label="비밀번호 확인"
                        isRequired
                        className="w-full input"
                        defaultValue=""
                        type="password"
                        name='password'
                        // placeholder="password"
                        value={passwordCheck}
                        onChange={handleChangeUserInfo}
                        autoComplete='on'
                    />


                    <Checkbox defaultSelected>약관 동의</Checkbox>;
                    <Button className='w-full' type='submit' color="primary">회원가입a</Button>
                </div>

            </form>

            {auth && <SignupAuth />}
        </div>
    )
}

export default SignupForm