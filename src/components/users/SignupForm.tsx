"use client"

import React, { ChangeEvent, FormEvent, useState } from 'react'
import { signupEmail, loginEmail } from '@/data/firestore'


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
                <div>
                    <input type="email" name='email' value={user.email} onChange={handleChangeUserInfo} />
                </div>
                <div>
                    <input type="text" name='password' value={user.password} onChange={handleChangeUserInfo} />
                </div>
                <button>signup</button>
            </form>
        </div>
    )
}

export default SignupForm