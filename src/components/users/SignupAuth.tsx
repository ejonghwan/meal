"use client"

import React, { useEffect, useState } from 'react'
import { onUserAuthAPI } from '@/src/store/queryies/user/userQueryFn'
import { useUserSignout, useUserSignupAuth } from '@/src/store/queryies/user/userQueries'
import useTimer from '@/src/hooks/useTimer'
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



    const router = useRouter()
    const [emailVerify, setEmailVerify] = useState(false)
    const { authInfo } = useUserStore();
    const { mutate, data: isEmailAuth, error, isSuccess: isEmailAuthSuccess } = useUserSignupAuth() // auth
    const { mutate: signoutMutate, error: signoutError, isSuccess: signoutIsSuccess } = useUserSignout(); // signout 
    const { seconds, handleTimerFormChange } = useTimer({ initail: 300 })

    // 인증버튼 클릭 이벤트
    const handleEmailAuthClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        mutate(authInfo)
    }



    // 라우터이동이 되거나 인증시간이 지나면 회원탈퇴 시켜야함
    const handleEmailUserDelete = () => {
        const hoho = signoutMutate(authInfo)
        console.log('hoho?',hoho)
    }


    useEffect(() => {
        if (isEmailAuthSuccess) setEmailVerify(isEmailAuth.data.emailVerified)
  
    }, [isEmailAuthSuccess])


    useEffect(() => {
        if (emailVerify) {
            alert('회원가입이 완료되었습니다.')
            // router.push('/')
        }
    }, [emailVerify])



    return (
        <div>
            <h2 className='text-red-300'>메일로 인증메일이 전송되었습니다. 인증메일에서 인증을 완료하시고 인증완료 버튼을 눌러주세요</h2>

            {authInfo.email}<br />
            {authInfo.uid}

            <button type='button' onClick={handleEmailAuthClick}>인증완료</button>


            {/* 시간지나면 타이머로 회원탈퇴 */}
            <button type='button' onClick={handleEmailUserDelete}>회원탈퇴</button>
            <span className={`${seconds < 60 ? 'text-red-500 ' : 'text-green-500'}`}>{handleTimerFormChange()}</span>


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