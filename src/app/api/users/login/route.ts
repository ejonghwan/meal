import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers";
import { signupEmail, loginEmail } from "@/src/data//users";


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

        const userData = await loginEmail(email, password);
        // console.log('back - userDAta ????????', userData)


        // console.log(cookies().get("access-token"));
        // ref token httpOnly로 내려줌
        cookies().set("x-ref-token", userData.user.refreshToken, { httpOnly: true, secure: true, sameSite: true });
        // secure: true




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
                accToken: await userData.user.getIdToken()
            }
        }
        return NextResponse.json(res, { status: 201 })
    } catch (e) {
        console.log('열로오냐 ? ', e)
        return NextResponse.json({ message: e }, { status: 500 })
        // return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })

    }

}




