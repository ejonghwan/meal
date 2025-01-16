"use client"

import React, { ChangeEvent, FormEvent, useState } from 'react'
import { signupEmail, loginEmail } from '@/src/data/firestore'
import { Input } from "@nextui-org/input";
import { Button, ButtonGroup } from "@nextui-org/button";


interface Props {
    // signupEmail: (email: string, password: string) => void;
}

interface User {
    email: string;
    password: string;
}


const SignupForm = ({ }: Props) => {

    const [user, setUser] = useState<User>({ email: '', password: '' })

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

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/signup/`, options)
        const data = await res.json();
    }

    return (
        <div>
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
                    <Button className='w-full' type='submit' color="primary">회원가입</Button>
                </div>

            </form>
        </div>
    )
}

export default SignupForm