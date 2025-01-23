
import {
    getAuth,// authentication 설정
    signInWithPopup, //google 로그인을 팝업창에 띄우기 위해
    GoogleAuthProvider, //google login 기능
    signInWithEmailAndPassword,// email 로그인
    createUserWithEmailAndPassword, //email 회원가입
} from 'firebase/auth';
import { auth, admin } from '@/src/data/firestore'


interface TokenData {
    status: string,
    message: string,
    code: number,
    uid?: string
    data?: any
}


//Email 로그인
export const signupEmail = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

//Email 회원가입
export const loginEmail = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
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
