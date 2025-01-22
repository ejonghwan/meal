import { NextRequest, NextResponse } from "next/server"
import { signupEmail, loginEmail, accTokenCheck } from "@/src/data/users/index";
import { auth } from "firebase-admin";

/*
@ path    GET /api/users/load
@ doc     유저 로드
@ access  public
*/
export const GET = async (req: NextRequest) => {

    try {
        // const { token } = await req.json();
        // if (!token) return NextResponse.json({ state: 'FAILUE', message: 'token을 넣어주세요', }, { status: 422 });


        const accToken = req.headers.get('x-acc-token')
        const checked = await accTokenCheck(accToken)

        // 인증토큰 에러일 경우
        if (checked.status === 'fail') return NextResponse.json(checked, { status: 501 })

        // 인증토큰 정상일 경우 
        const user = await auth().getUser(checked.uid)

        // console.log('back user 222???', user)
        const res = {
            state: 'SUCCES',
            message: '성공',
            data: user,
        }
        return NextResponse.json(res, { status: 201 })
    } catch (e) {
        console.error('에러닷!', e)
    }


}




