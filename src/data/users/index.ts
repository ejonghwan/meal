
import {
    getAuth,// authentication 설정
    signOut, // 로그아웃
    deleteUser, //회원탈퇴
    signInWithPopup, //google 로그인을 팝업창에 띄우기 위해
    GoogleAuthProvider, //google login 기능
    signInWithEmailAndPassword,// email 로그인
    createUserWithEmailAndPassword, //email 회원가입
    sendEmailVerification,
} from 'firebase/auth';
import { auth, admin } from '@/src/data/firestore'


interface TokenData {
    status: string,
    message: string,
    code: number,
    uid?: string
    data?: any
}




/*
    ### 회원가입 로직
    1. 이메일 인증부터 함 (비밀번호는 가짜 비밀번호) -> (임시가입)
    2. 인증메일이 가면 인증 유알엘을 클릭한 사람만 다음으로 넘김 (이걸 어떻게 감지할지 ? )
    3. ok -> 인증된 사람만 비밀번호 및 정보 입력 후 수정. 
    3. no -> 임시 가입된 메일 삭제 


    ### 회원가입 로직 수정
    1. 처음엔 이메일만 입력받음. 가가입 시키고 메일인증 체크하라고함 
       ok -> 프론트에서 상세정보 더 받아서 디비에 업데이트
       no -> 회원 탈퇴시킴


    ### 세부 로직
    1. 화면에서 이메일 치고 인증 누르면 signup backend 로 요청
    2. data에 있는 signupEmail 함수실행 
    3. signupEmail 함수에는 파이어베이스 회원가입 함수가 실행됨 
    4. 그럼 백엔드에선 우선 완료 요청이 프론트로 내려가고 
    5. "메일을 인증해주세요" 페이지 노출 
    5-1. 인증 완료 버튼 클릭 시 auth api 요청

    
    6. 메일에서 인증을 하면  파이어베이스에 있는 상태값이 변경 됨
    7. 그 변경된걸 signupAuth 함수를 실행해서 감지 한다음 프론트로 res 해야되는데 !!! 하 .... (처리 블로그에선 setInterval 씀 -_-... )
*/



// email auth
export const signupAuth = async (user: any) => {
    await auth.currentUser?.reload()
    const checkedUser = await admin.auth().getUser(user.user.uid)
    // console.log('인자값 ', checkedUser.emailVerified)
    return { emailVerified: checkedUser.emailVerified }
}


// email 회원가입
export const signupEmail = async (email: string, password: string) => {
    const sign = await createUserWithEmailAndPassword(auth, email, password)
    // send mail 
    await sendEmailVerification(sign.user)
    return sign
};

// email 회원탈퇴
export const userDeleteEmail = async (user: any) => {

    // user or uid??? 어떤걸로 할지 결정
    const u = await admin.auth().deleteUser(user.uid)
    console.log('cc user?', u)

};





// email 로그인
export const loginEmail = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
};

// email 로그아웃 - 아직 구현안함
export const signOutEmail = async (email: string, password: string) => {
    // const sign = await signOut()
    // return sign
};






// acc 토큰 체크
export const accTokenCheck = async (idToken: string) => {
    try {
        const tokenData = await admin.auth().verifyIdToken(idToken)
        // console.log('token info??', tokenData)
        return tokenData;
    } catch (e) {
        // console.log('캐치에 걸림 ???', e.code)
        // 따라서 firebase의 uid가 필요한 경우, decodedIdToken.user_id로 조회할 수 있다.
        // 토큰이 유효하지 않으면 error로 이어지고, error.code로 조회하면 결과를 볼 수 있다.

        if (e.code == 'auth/id-token-revoked') {
            // Token has been revoked. Inform the user to reauthenticate or signOut() the user.
            console.error('토큰이 취소됐습니다. 로그아웃이나 다시 로그인 해주세요.', e)
            return { status: 'fail', message: '토큰의 유효기간이 지났습니다. 다시 로그인 해주세요.', code: 1001 }

        } else if (e.code == 'id-token-expired') {
            // auth / id - token - expired: 유효시간이 지난 토큰
            console.error('토큰의 유효기간이 지났습니다. 다시 로그인 해주세요', e)
            return { status: 'fail', message: '토큰의 유효기간이 지났습니다. 다시 로그인 해주세요.', code: 1002 }

        } else if (e.code == 'argument-error') {
            // auth / argument - error: 유효하지 않은 토큰
            console.error('토큰이 유효하지 않습니다 1', e)
            return { status: 'fail', message: '토큰이 유효하지 않습니다. 1', code: 1003 }

        } else if (e.code == 'app/no-app') {
            // auth / argument - error: 유효하지 않은 토큰
            console.error('앱 없음', e)
            return { status: 'fail', message: '앱 없음', code: 2000 }

        } else {
            console.error('토큰이 유효하지 않습니다 2', e)
            return { status: 'fail', message: '토큰이 유효하지 않습니다. 2', code: 1004 }
        }
    }

}


// ref 토큰 체크
export const refTokenCheck = async (idToken: string) => {
    try {
        const tokenRes = await admin.auth().verifyIdToken(idToken)
        console.log('token info??', tokenRes)
    } catch (e) {
        console.error('ref e', e)
    }
}



// email 인증
export const sendEmailVerifi = async (idToken: string) => {
    try {
        const auth = getAuth();
        // console.log('firebase cur auth ? ', auth.currentUser, idToken)
        const email = await sendEmailVerification(auth.currentUser)
        return email
    } catch (e) {
        console.error('sendEmailVerifi e????? ', e)
    }
}

