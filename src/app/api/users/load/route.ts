import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers";
import { accTokenCheck, refTokenCheck } from "@/src/data/users/index";
import { auth } from "firebase-admin";

// import type { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "@/src/app/api/middleware/withAuth"; // 방금 만든 미들웨어


/*
    로그인 로직 
    1. 1시간 acc 토큰이랑 1년 ref토큰(httponly)을 내려줌 
    2. acc 토큰이 정상이면 로그인 유지를 하고 만료가 되면 ref토큰으로 인증 후 acc토큰 재발급함
    3. acc 토큰은 내려준 후 로컬 저장소에 저장하며 ref 토큰은 쿠키안에서만 주고 받을 수 있게 httponly 옵션을 줌. 
       - 이때 프론트에서도 httponly로 받으면 접근이 불가하며 재 요청 보낼 때 옵션 설정해서 보내면 됨
*/

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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = (req as any).user;
  return res.status(200).json({
    message: "인증된 사용자입니다!",
    uid: user.uid,
    email: user.email,
  });
};

export default withAuth(handler); 

export const GET = async (req: NextRequest) => {

    try {
        // const { token } = await req.json();
        // if (!token) return NextResponse.json({ state: 'FAILUE', message: 'token을 넣어주세요', }, { status: 422 });


        // acc token check
        const accToken = req.headers.get('x-acc-token')
        // const accToken = req.headers.get('Authorization')
        if (!accToken) throw new Error('is not token')
        const checked = await accTokenCheck(accToken) as DecodedIdToken
        // 인증토큰 에러일 경우
        if (checked.status === 'fail') return NextResponse.json(checked, { status: 501 })


        // 인증토큰 정상일 경우 
        const user = await auth().getUser(checked.uid)


        // console.log('vertifi email', hoho)

    


        const res = {
            state: 'SUCCES',
            message: '성공',
            data: user,
        }
        return NextResponse.json(res, { status: 201 })
    } catch (e) {
        console.error('back user load error : ', e)
    }
}



