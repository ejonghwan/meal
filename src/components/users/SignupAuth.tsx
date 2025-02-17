"use client"

import React, { useEffect, useState } from 'react'
import { onUserAuthAPI } from '@/src/store/queryies/user/userQueryFn'
import { useUserSignupAuth } from '@/src/store/queryies/user/userQueries'
import { useUserStore } from '@/src/store/front/user';
import {
    useRouter,
    usePathname,
    useSearchParams,
    useSelectedLayoutSegment,
    useSelectedLayoutSegments,
    redirect,
    notFound
} from 'next/navigation'




const SignupAuth = () => {



    const [emailVerify, setEmailVerify] = useState(false)
    const { authInfo } = useUserStore();
    const router = useRouter()
    const { mutate, data, error, isSuccess } = useUserSignupAuth()

    const handleEmailAuthClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        mutate(authInfo)
    }


    useEffect(() => {
        if (isSuccess) {
            setEmailVerify(data.data.emailVerified)
        }
    }, [isSuccess])


    useEffect(() => {
        if (emailVerify) {
            alert('회원가입이 완료되었습니다.')
            // router.push('/')
        }
    }, [emailVerify])



    return (
        <div>
            <h2>메일로 인증메일이 전송되었습니다. 인증메일에서 인증을 완료하시고 인증완료 버튼을 눌러주세요</h2>

            {authInfo.email}<br />
            {authInfo.uid}
            {/* <button type='button' onClick={handleEmailVerified}>인증완료</button> */}
            <button type='button' onClick={handleEmailAuthClick}>인증완료</button>

            {emailVerify ? (
                <div>인증이 완료되었습니다</div>
            ) : (
                <div>
                    <strong>인증메일에서 인증을 완료해주세요.</strong>
                    <p>인증메일에서 URL을 클릭하시면 인증이 완료됩니다</p>
                </div>

            )}
        </div>
    )
}

export default SignupAuth