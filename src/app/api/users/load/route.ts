import { NextRequest, NextResponse } from "next/server"
import { signupEmail, loginEmail, accTokenCheck } from "@/src/data/firestore";

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

        console.log('back user???', checked)
        const res = {
            state: 'SUCCES',
            message: '성공',
            data: checked,
        }
        return NextResponse.json(res, { status: 201 })
    } catch (e) {
        console.error('에러닷!', e)
    }


}




