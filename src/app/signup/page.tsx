import React from 'react'
import { signupEmail, loginEmail } from '@/data/firestore'
import SignupForm from '@/components/users/SignupForm'
import LoginForm from '@/components/users/LoginForm'

const SignupPage = async () => {


    return (
        <>
            <div>
                signup
                <SignupForm />

                <br />
                <br />
                <br />
                <br />
                <br />

                <LoginForm />
            </div>
        </>
    )
}

export default SignupPage