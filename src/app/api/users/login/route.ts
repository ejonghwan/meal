import { NextRequest, NextResponse } from "next/server"
// import { cookies } from "next/headers";
// import { signupEmail, loginEmail } from "@/src/data/users";


import {
    getAuth,// authentication 설정
    signOut, // 로그아웃
    deleteUser, //회원탈퇴
    signInWithPopup, //google 로그인을 팝업창에 띄우기 위해
    GoogleAuthProvider, //google login 기능
    signInWithEmailAndPassword,// email 로그인
    createUserWithEmailAndPassword, //email 회원가입
    sendEmailVerification,
    updateProfile

} from 'firebase/auth';

import { admin } from '@/src/data/firebaseAdmin'
import { auth } from '@/src/data/firebaseClient'



/*
    @ path    GET /api/login
    @ doc     로그인
    @ access  public
*/
export const POST = async (req: NextRequest) => {
    try {
        const { email, password } = await req.json();
        if (!email) return NextResponse.json({ state: 'FAILUE', message: 'email을 넣어주세요', }, { status: 422 });
        if (!password) return NextResponse.json({ state: 'FAILUE', message: 'password을 넣어주세요', }, { status: 422 });



        // ref token httpOnly로 내려줌
        // ref 토큰은 사용하지 않음
        // cookies().set("x-ref-token", userData.user.refreshToken, { httpOnly: true, secure: true, sameSite: true });
        // secure: true


        /*
            admin에서 가져온 accToken은 보안 때문에 서버에서만 사용.
            대신 커스텀 토큰을 만들어 프론트로 보내고 그걸 auth 세션에 사용 
        */

        // const userData = await loginEmail(email, password); // 기존소스 
        const userData = await signInWithEmailAndPassword(auth, email, password);
        const customAccToken = await admin.auth().createCustomToken(userData.user.uid) // 커스텀 토큰은 1시간
        // console.log('back login user ??? ', userData)
        console.log('back token ??? ', customAccToken)

        const res = {
            state: 'SUCCES',
            message: '성공',
            // data: userData.user,
            data: {
                // ...userData,
                email: userData.user.email,
                emailVerified: userData.user.emailVerified,
                // disabled: userData.user.disabled,
                metadata: userData.user.metadata,
                // tokensValidAfterTime: userData.user.tokensValidAfterTime,
                uid: userData.user.uid,
                providerData: userData.user.providerData,
                customAccToken: customAccToken // 커스텀토큰 프론트로 보내기
            }
        }
        return NextResponse.json(res, { status: 201 })


    } catch (e) {
        console.log('back login error ? ', e)
        return NextResponse.json({ message: e }, { status: 500 })
        // return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })

    }

}




