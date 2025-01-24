"use client"

import React, { useEffect } from 'react'
import { onUserAuthAPI } from '@/src/store/queryies/user/userQueryFn'




const SignupAuth = () => {

    // auth().onAuthStateChanged((user) => {
    //     if (user && auth().currentUser.emailVerified) {
    //       console.log('App 인증:' + auth().currentUser.emailVerified)
    //       setIsLoggedIn(true)
    //     } else {
    //       setIsLoggedIn(false)
    //     }
    //   })


    useEffect(() => {
        // signupAuth()
        const aa = onUserAuthAPI()
        console.log('aa?', aa)
    }, [])



    return (
        <div>
            <h2>인증메일을 확인해주세요</h2>

        </div>
    )
}

export default SignupAuth