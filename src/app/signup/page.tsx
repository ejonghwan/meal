

import React from 'react'
import SignupForm from '@/src/components/users/SignupForm'
import LoginForm from '@/src/components/users/LoginForm'

const SignupPage = async () => {



    return (
        <>
            <h2>회원가입</h2>
            <div>

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