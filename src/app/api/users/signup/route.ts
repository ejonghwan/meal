import { NextRequest, NextResponse } from "next/server"
// import { signupEmail, loginEmail, userDeleteEmail } from "@/src/data/users/index";
import { auth } from '@/src/data/firebaseClient'
import { admin, adminDB } from '@/src/data/firebaseAdmin'
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';


/*
  특이사항 : 
    우선 가입 시키고 이메일 인증 후 인증 되지 않으면 회원 탈퇴 시키는 방식임. 파이어베이스 구조 이슈 
*/


/*
    @ path    POST /api/signup
    @ doc     회원가입
    @ access  public
*/
export const POST = async (req: NextRequest) => {

    const { email, password, displayName, darkmode } = await req.json();
    if (!email) return NextResponse.json({ state: 'FAILUE', message: 'email을 넣어주세요', }, { status: 422 });
    if (!password) return NextResponse.json({ state: 'FAILUE', message: 'password을 넣어주세요', }, { status: 422 });

    const result = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(result.user, { displayName }) //프로필 업데이트
    await sendEmailVerification(result.user)

    // await sendCustomEmail(email, {
    // subject: "비밀번호를 재설정하세요",
    // html: `<p>아래 버튼을 눌러 비밀번호를 변경하세요:</p><a href="${result.user.displayName}">재설정</a>`
    // });

    // const signup = await signupEmail(email, password, displayName); //기존소스

    // 프로필 bg 컬러 임시
    const colors = ['#428f80', '#42788f', '#428f4d', '#7e8f42', '#8f8942', '#955877', '#4468a9', '#44a9a5', '#50844b', '#4b7e84',]
    const randomColor = colors[Math.floor(Math.random() * colors.length)];


    await adminDB.collection('users').doc(result.user.uid).set({
        uid: result.user.uid,
        email,
        displayName,
        darkmode: !!darkmode,
        bg: randomColor, // 랜덤으로 수정하기
        role: 'user', // 권한 설정하기
        createdAt: new Date(),
    });

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
    await adminDB.collection('users').doc(reqData.user.uid).delete();

    const res = {
        state: 'SUCCES',
        message: '성공',
        data: user
    }
    return NextResponse.json(res, { status: 201 })
}



