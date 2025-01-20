
import React from 'react'
import { signupEmail, loginEmail, loadUser } from '@/src/data/firestore'
import SignupForm from '@/src/components/users/SignupForm'
import LoginForm from '@/src/components/users/LoginForm'

const SignupPage = async () => {


    const load = async (token) => {
        const res = await loadUser(token)
        console.log('load res??', res)
    }




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