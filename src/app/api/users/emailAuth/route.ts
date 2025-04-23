import { NextRequest, NextResponse } from "next/server"
// import { cookies } from "next/headers";
// import { signupAuth } from "@/src/data//users";
import { admin } from '@/src/data/firebaseAdmin'


/*
    @ path    POST /api/auth
    @ doc     회원가입 인증
    @ access  public
*/
export const POST = async (req: NextRequest) => {

    const reqData = await req.json();
    if (!reqData.user) return NextResponse.json({ state: 'FAILUE', message: '회원가입한 유저의 정보가 없습니다. 다시 확인해주세요', }, { status: 422 });

    // auth 정보 아래서 넘겨줘야됨
    // const emailVerified = await signupAuth(reqData) //이전소스 

    const checkedUser = await admin.auth().getUser(reqData.user.uid)
    console.log('back emailVerified ? ', checkedUser)

    const res = {
        state: 'SUCCES',
        message: '성공',
        data: { emailVerified: checkedUser.emailVerified }
    }
    return NextResponse.json(res, { status: 201 })
}

