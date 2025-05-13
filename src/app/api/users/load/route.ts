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







