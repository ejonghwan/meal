"use client"

import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Input } from "@nextui-org/input";
import { Button, ButtonGroup } from "@nextui-org/button";


interface Props { }

interface User {
    email: string;
    password: string;
}


const LoginForm = ({ }: Props) => {

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
            console.log(user)

            // const res = signupEmail(user.email, user.password)
            // console.log('res??', res)

            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify({ email: user.email, password: user.password })
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login/`, options)
            const data = await res.json();
        } catch (e) {
            console.error(e)
        }
    }


    return (
        <div>
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