

import React from 'react'
import SignupForm from '@/src/components/signup/SignupForm'
import DeleteId from '@/src/components/signup/DeleteId'

// import fs from 'fs'
// import path from 'path';

const SignupPage = async () => {

    // console.log('fs?', path)
    // const htmlContent = fs.readFileSync(path.join(process.cwd(), 'public/test.html'), 'utf8')


    // type test

    // interface Type {
    //     (n: number): { a: string; b: number, n: number }
    // }
    type Type = (n: number) => { a: string; b: number, n: number }
    const hoho: Type = (n: number) => {
        console.log('type test')
        return { a: 'asd', b: 33, n: n }
    }
    hoho(3)




    return (
        <>
            {/* 외부 html test */}
            {/* <div dangerouslySetInnerHTML={{ __html: htmlContent }} />; */}

            <h2>회원가입</h2>
            <div>

                <SignupForm />

                <br />
                <DeleteId />






            </div>
        </>
    )
}

export default SignupPage