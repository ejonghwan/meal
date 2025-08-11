"use client"

import React, { ChangeEvent, FormEvent, useEffect, useState, useCallback, useRef } from 'react'
import { Checkbox } from "@heroui/checkbox";
import { useRouter } from 'next/navigation'


// import { signupEmail, loginEmail } from '@/src/data/firestore'
import { Input } from "@heroui/input";

import { Button, ButtonGroup } from "@heroui/button";
import SignupAuth from '@/src/components/signup/SignupAuth';
import { useUserStore } from '@/src/store/front/user'
import { passwordChecked, englishChecked } from '@/src/utillity/utils';
import { useUserSignup } from '@/src/store/queryies/user/userQueries';
import { Select, SelectItem } from '@heroui/select';
import { SharedSelection } from '@heroui/system';


interface Props {
    // signupEmail: (email: string, password: string) => void;
}

interface User {
    email: string;
    password: string;
    displayName: string;
    region: string;
}


const SignupForm = ({ }: Props) => {

    const router = useRouter()
    const { setAutuInfo } = useUserStore();
    const [user, setUser] = useState<User>({ email: '', password: '', displayName: '', region: '' })
    const [passwordCheck, setPasswordCheck] = useState('')
    const [englishCheckedState, setEnglishCheckedState] = useState<Boolean>(null)
    const [passwordProtected, setPasswordProtected] = useState<Boolean>(null)
    const [auth, setAuth] = useState(false)

    const { data, mutate: userSignupMutate, error: userSignupError, isSuccess: userSignupIsSuccess } = useUserSignup(); // signout 

    const [selectValue, setSelectValue] = useState<SharedSelection>(new Set());

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


    useEffect(() => {
        setUser({
            ...user,
            region: String([...selectValue][0])
        })
    }, [selectValue])

    useEffect(() => { console.log('user?', user) }, [user])



    const region = [
        { key: "서울특별시", label: "서울특별시" },
        { key: "부산광역시", label: "부산광역시" },
        { key: "인천광역시", label: "인천광역시" },
        { key: "대구광역시", label: "대구광역시" },
        { key: "대전광역시", label: "대전광역시" },
        { key: "광주광역시", label: "광주광역시" },
        { key: "울산광역시", label: "울산광역시" },
        { key: "세종특별자치시", label: "세종특별자치시" },
        { key: "경기도", label: "경기도" },
        { key: "강원특별자치도", label: "강원특별자치도" },
        { key: "충청북도", label: "충청북도" },
        { key: "충청남도", label: "충청남도" },
        { key: "전라북도특별자치도", label: "전라북도특별자치도" },
        { key: "전라남도", label: "전라남도" },
        { key: "경상북도", label: "경상북도" },
        { key: "경상남도", label: "경상남도" },
        { key: "제주특별자치도", label: "제주특별자치도" },
    ]


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
                        label="별명"
                        isRequired
                        className="w-full input"
                        defaultValue=""
                        type="text"
                        name='displayName'
                        // placeholder="email"
                        value={user.displayName}
                        onChange={handleChangeUserInfo}
                    />

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

                    {/* <Input
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
                    /> */}

                    <div>
                        주로 이용하는 지역
                        <Select
                            className={"max-w-xs"}
                            defaultSelectedKeys={"서울특별시"}
                            label={'지역'}
                            placeholder={'서울특별시'}
                            // startContent={ico}
                            aria-label={'지역 선택'}
                            onSelectionChange={setSelectValue}
                            variant="flat"
                        >
                            {region.map(item => (
                                <SelectItem key={item.key}>{item.label}</SelectItem>
                            ))}
                        </Select>
                    </div>


                    <Checkbox defaultSelected>약관 동의</Checkbox>;
                    <Button className='w-full' type='submit' color="primary">회원가입a</Button>
                </div>

            </form>

            {auth && <SignupAuth />}
        </div>
    )
}

export default SignupForm