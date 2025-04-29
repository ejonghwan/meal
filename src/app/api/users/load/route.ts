import { NextRequest, NextResponse } from "next/server"
import { accTokenCheck, refTokenCheck } from "@/src/data/users/index";
import { cookies } from "next/headers";
import { withAuth } from "@/src/app/api/middleware/withAuth"; // 방금 만든 미들웨어
import { admin } from '@/src/data/firebaseAdmin';
import { auth } from '@/src/data/firebaseClient';



interface DecodedIdToken {
    uid: string;
    status: string;
    message: string;
    code: number;
}


/*
    @ path    GET /api/users/load
    @ doc     유저 로드
    @ access  public
*/
export const GET = withAuth(async (req: NextRequest, user) => {
    try {

        console.log('???user', user)
        // const customAccToken = await admin.auth().createCustomToken(user.uid) // 커스텀 토큰은 1시간

        return NextResponse.json({
            message: "인증 성공!",
            status: 201,
            data: {
                email: user.email,
                metadata: user.metadata,
                tokensValidAfterTime: user.tokensValidAfterTime,
                uid: user.uid,
                providerData: user.providerData,
                // accToken: auth.currentUser.getIdToken(),
                // customAccToken: customAccToken,

            }
        });
    } catch (e) {
        // with auth에서 error 뿜어줌
        console.error('e', e)
    }




});








// 기존소스
// export const GET = async (req: NextRequest) => {

//     try {
//         // const { token } = await req.json();
//         // if (!token) return NextResponse.json({ state: 'FAILUE', message: 'token을 넣어주세요', }, { status: 422 });


//         // acc token check
//         const accToken = req.headers.get('x-acc-token')
//         // const accToken = req.headers.get('Authorization')
//         if (!accToken) throw new Error('is not token')
//         const checked = await accTokenCheck(accToken) as DecodedIdToken


//         // 인증토큰 에러일 경우
//         if (checked.status === 'fail') return NextResponse.json(checked, { status: 501 })

//         // 인증토큰 정상일 경우
//         const user = await auth().getUser(checked.uid)
//         const res = {
//             state: 'SUCCES',
//             message: '성공',
//             data: user,
//         }
//         return NextResponse.json(res, { status: 201 })
//     } catch (e) {
//         console.error('back user load error : ', e)
//     }
// }



