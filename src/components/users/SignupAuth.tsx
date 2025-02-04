"use client"

import React, { useEffect } from 'react'
import { onUserAuthAPI } from '@/src/store/queryies/user/userQueryFn'
import { useUserStore } from '@/src/store/front/user';





const SignupAuth = () => {

    // auth().onAuthStateChanged((user) => {
    //     if (user && auth().currentUser.emailVerified) {
    //       console.log('App 인증:' + auth().currentUser.emailVerified)
    //       setIsLoggedIn(true)
    //     } else {
    //       setIsLoggedIn(false)
    //     }
    //   });

    const { authInfo } = useUserStore();

    useEffect(() => {
        // signupAuth()
        // const aa = onUserAuthAPI()
        // console.log('aa?', aa)
        console.log('auth compo ??', authInfo)
    }, [authInfo])



    const handleAuthComplate = async () => {

        const aa = await onUserAuthAPI(authInfo)
        console.log('fo res data 최종?', aa)
    }



    return (
        <div>
            <h2>메일로 인증메일이 전송되었습니다. 인증메일에서 인증을 완료하시고 인증완료 버튼을 눌러주세요</h2>
            {authInfo.email}<br />
            {authInfo.uid}
            <button type='button' onClick={handleAuthComplate}>인증완료</button>
        </div>
    )
}

export default SignupAuth