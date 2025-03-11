

import React from 'react'
import SignupForm from '@/src/components/users/SignupForm'
import LoginForm from '@/src/components/users/LoginForm'
import DeleteId from '@/src/components/users/DeleteId'

// import fs from 'fs'
// import path from 'path';

const SignupPage = async () => {

    // console.log('fs?', path)
    // const htmlContent = fs.readFileSync(path.join(process.cwd(), 'public/test.html'), 'utf8')

    return (
        <>
            {/* 외부 html test */}
            {/* <div dangerouslySetInnerHTML={{ __html: htmlContent }} />; */}

            <h2>회원가입</h2>
            <div>

                <SignupForm />

                <br />
                <br />
                <br />
                <br />
                <br />

                <LoginForm />
                <DeleteId />


                



            </div>
        </>
    )
}

export default SignupPage