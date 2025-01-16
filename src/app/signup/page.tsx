import React from 'react'
import { signupEmail, loginEmail } from '@/src/data/firestore'
import SignupForm from '@/src/components/users/SignupForm'
import LoginForm from '@/src/components/users/LoginForm'

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