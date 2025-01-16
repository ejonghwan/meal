"use client"

import React, { ChangeEvent, FormEvent, useState } from 'react'


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
                <div>
                    <input type="email" name='email' value={user.email} onChange={handleChangeUserInfo} />
                </div>
                <div>
                    <input type="text" name='password' value={user.password} onChange={handleChangeUserInfo} />
                </div>
                <button>login</button>
            </form>
        </div>
    )
}

export default LoginForm