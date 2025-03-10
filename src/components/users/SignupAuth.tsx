"use client"

import React, { useEffect, useState, useCallback } from 'react'
import { onUserAuthAPI } from '@/src/store/queryies/user/userQueryFn'
import { useUserDelete, useUserSignupAuth } from '@/src/store/queryies/user/userQueries'
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
    const [emailVerify, setEmailVerify] = useState(true)
    const { authInfo } = useUserStore();
    const { mutate: userEmailAuth, data: isEmailAuth, error, isSuccess: isEmailAuthSuccess } = useUserSignupAuth() // auth
    const { mutate: userDeleteMutate, error: signoutError, isSuccess: signoutIsSuccess } = useUserDelete(); // signout 
    const { seconds, handleTimerFormChange } = useTimer({ initail: 300 })
    // const { seconds, handleTimerFormChange } = useTimer({ initail: 10 })

    // 인증버튼 클릭 이벤트
    const handleEmailAuthClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        userEmailAuth(authInfo)

        if (isEmailAuth?.data.emailVerified) {
            alert('회원가입이 완료되었습니다.')
            router.push('/')
        } else {
            setEmailVerify(false)
        }
    }




    // 라우터이동이 되거나 인증시간이 지나면 회원탈퇴 시켜야함

    useEffect(() => {
        if (seconds <= 0) {
            userDeleteMutate(authInfo)
            alert('인증시간이 지났습니다. 처음부터 다시 가입해주세요.')
            router.push('/')
        }
    }, [seconds])






    const handleUnload = (e: BeforeUnloadEvent) => {
        e.preventDefault();
        if (authInfo) userDeleteMutate(authInfo)

    }
    // 페이지이동, 새로고침, 뒤로가기 시 인증 절차 초기화. 임시가입 삭제
    useEffect(() => {
        window.addEventListener("beforeunload", handleUnload);
        return () => window.removeEventListener("beforeunload", handleUnload);
    }, [authInfo])




    return (
        <div>
            <h2 className='text-red-300'>메일로 인증메일이 전송되었습니다. 인증메일에서 인증을 완료하시고 인증완료 버튼을 눌러주세요</h2>

            {authInfo.email}<br />
            {authInfo.uid}

            <button type='button' onClick={handleEmailAuthClick}>인증완료</button>

            <span className={`${seconds < 60 ? 'text-red-500 ' : 'text-green-500'}`}>{handleTimerFormChange()}</span>

            {!emailVerify && (
                <div>
                    <strong>인증메일에서 인증을 완료해주세요.</strong>
                    <p>인증메일에서 URL을 클릭하시면 인증이 완료됩니다</p>
                </div>
            )}

        </div>
    )
}

export default SignupAuth