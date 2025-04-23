import { NextRequest, NextResponse } from "next/server"
// import { signupEmail, loginEmail, userDeleteEmail } from "@/src/data/users/index";
import { auth } from '@/src/data/firebaseClient'
import { admin } from '@/src/data/firebaseAdmin'
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';



/*
    @ path    POST /api/signup
    @ doc     회원가입
    @ access  public
*/
export const POST = async (req: NextRequest) => {

    const { email, password, displayName } = await req.json();
    if (!email) return NextResponse.json({ state: 'FAILUE', message: 'email을 넣어주세요', }, { status: 422 });
    if (!password) return NextResponse.json({ state: 'FAILUE', message: 'password을 넣어주세요', }, { status: 422 });

    const result = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(result.user, { displayName }) //프로필 업데이트
    await sendEmailVerification(result.user)

    // const signup = await signupEmail(email, password, displayName); //기존소스

    const res = {
        state: 'SUCCES',
        message: '성공',
        data: result
    }
    return NextResponse.json(res, { status: 201 })
}




/*
    @ path    DELETE /api/signup
    @ doc     회원탈퇴
    @ access  public
*/
export const DELETE = async (req: NextRequest) => {
    const reqData = await req.json();
    // if (!reqData.user) return NextResponse.json({ state: 'FAILUE', message: '유저 없음', }, { status: 422 });

    // const user = await userDeleteEmail(reqData.user) //기존소스
    const user = await admin.auth().deleteUser(reqData.user.uid)

    const res = {
        state: 'SUCCES',
        message: '성공',
        data: user
    }
    return NextResponse.json(res, { status: 201 })
}



