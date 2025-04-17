import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers";
import { accTokenCheck, refTokenCheck } from "@/src/data/users/index";
import { auth } from "firebase-admin";


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
export const GET = async (req: NextRequest) => {

    try {
        // const { token } = await req.json();
        // if (!token) return NextResponse.json({ state: 'FAILUE', message: 'token을 넣어주세요', }, { status: 422 });


        // acc token check
        // const accToken = req.headers.get('x-acc-token')
        const accToken = req.headers.get('Authorization')
        if (!accToken) throw new Error('is not token')
        const checked = await accTokenCheck(accToken) as DecodedIdToken
        // 인증토큰 에러일 경우
        if (checked.status === 'fail') return NextResponse.json(checked, { status: 501 })



        // 250217 로그인 ref 토큰 처리도 아직 안함... 파베 ref가 긴토큰이 아님.. 일회용토큰임. 
        // ref토큰 없이 짧은 토큰으로만 사용할지 결정해야함 
        // ref 토큰은 사용안함. 토큰 만료시 getToken으로 새로 발급

        // ref token check 
        const refToken = cookies().get("x-ref-token")
        // 인증토큰이 에러일 경우 ref로 체크 후 인증토큰 재발급 // 작업해야함
        // const refTokenChecked = await refTokenCheck(refToken)

        if (!accToken) {

        }
        // console.log('ref token ?????', refToken)
        // console.log('acc token ???', accToken)




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







// eyJhbGciOiJSUzI1NiIsImtpZCI6IjBhYmQzYTQzMTc4YzE0MjlkNWE0NDBiYWUzNzM1NDRjMDlmNGUzODciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbWVhbC02MmNjYiIsImF1ZCI6Im1lYWwtNjJjY2IiLCJhdXRoX3RpbWUiOjE3Mzc1OTg2NzMsInVzZXJfaWQiOiJQNm9tWHE5aHl3UWkyekYwandJTlI4TlpFeUYzIiwic3ViIjoiUDZvbVhxOWh5d1FpMnpGMGp3SU5SOE5aRXlGMyIsImlhdCI6MTczNzU5ODY3MywiZXhwIjoxNzM3NjAyMjczLCJlbWFpbCI6Impqb25ncnJyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImpqb25ncnJyQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.Yav3LPn3E0NAWlq3HQYUXzwK7l8zk1HpzC-tOdU7OKvalhmETzFWAPSVyB-IlQMkn_8pr-nbJsv6YbZM7bK1prAXzozInR-M4Be4Yij8XbWYKaB1-vM8c8eZoysUG5mYNvoxRaPIUpX1E17ri-Q7-Mt0fT20xU14-hTR3bF3exDsN5noidco_EryXFBVM1avOPw_YtTQmtHnDjRlRE3Z3S9hB5nYezAIO35ubyNJRU3dk8cToivt5rBjPF2nQGuEDdx3lydCuMKTkJdD7LbGFvphxOzMmx9VQuvnyydfgbNjspHMQgBduxM2gym8BcL3JNctfXKd6oDd4S2N07YKpg