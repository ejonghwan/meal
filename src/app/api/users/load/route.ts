import { NextRequest, NextResponse } from "next/server"
import { signupEmail, loginEmail, loadUser } from "@/src/data/firestore";

/*
@ path    GET /api/users/load
@ doc     유저 로드
@ access  public
*/
export const GET = (req: NextRequest) => {

    try {
        // const { token } = await req.json();
        // if (!token) return NextResponse.json({ state: 'FAILUE', message: 'token을 넣어주세요', }, { status: 422 });


        console.log(req.headers.get('authorization'))
        const jwt = req.headers.get('authorization')
        const user = loadUser(jwt)
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




