import { NextRequest, NextResponse } from "next/server"
import { signupEmail, loginEmail, userDeleteEmail } from "@/src/data/users/index";

/*
    @ path    POST /api/signup
    @ doc     회원가입
    @ access  public
*/
export const POST = async (req: NextRequest) => {

    const { email, password } = await req.json();
    if (!email) return NextResponse.json({ state: 'FAILUE', message: 'email을 넣어주세요', }, { status: 422 });
    if (!password) return NextResponse.json({ state: 'FAILUE', message: 'password을 넣어주세요', }, { status: 422 });


    const signup = await signupEmail(email, password);


    console.log('뭐로 넘어오냐 하.......',)



    const res = {
        state: 'SUCCES',
        message: '성공',
        // data: {
        //     email: signup.user.email,
        //     uid: signup.user.uid
        // },
        data: signup
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

    // console.log('back user?', reqData)

    const user = await userDeleteEmail(reqData.user)

    // console.log('back user?', user)

    const res = {
        state: 'SUCCES',
        message: '성공',
        data: user
    }
    return NextResponse.json(res, { status: 201 })


}


