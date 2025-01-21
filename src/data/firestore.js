// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore, collection, query, getDocs, Timestamp, setDoc, doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import {
    getAuth,// authentication 설정
    signInWithPopup, //google 로그인을 팝업창에 띄우기 위해
    GoogleAuthProvider, //google login 기능
    signInWithEmailAndPassword,// email 로그인
    createUserWithEmailAndPassword, //email 회원가입
} from 'firebase/auth';

// SDK
const admin = require("firebase-admin");
const serviceAccountKey = require("./serviceAccountKey.json");


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
};

// const serviceAccountKey = {
//     type: process.env.SDK_TYPE,
//     project_id: process.env.SDK_PROJECT_ID,
//     private_key_id: process.env.SDK_PRIVATE_KEY_ID,
//     private_key: process.env.SDK_PRIVATE_KEY,
//     client_email: process.env.SDK_CLIENT_EMAIL,
//     client_id: process.env.SDK_CLIENT_ID,
//     auth_uri: process.env.SDK_AUTH_URI,
//     token_uri: process.env.SDK_TOKEN_URI,
//     auth_provider_x509_cert_url: process.env.SDK_AUTH_PROVIDER_CERT_URL,
//     client_x509_cert_url: process.env.SDK_CLIENT_CERT_URL,
//     universe_domain: process.env.SDK_UNIVERSE_DOMAIN
// }

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const app = !getApps().length ? initializeApp(firebaseConfig, { credential: admin.credential.cert(serviceAccountKey) }) : getApp();
const app = !getApps().length ? initializeApp(firebaseConfig, { credential: admin.credential.cert(serviceAccountKey) }) : getApp();
const db = getFirestore(app)

// auth 설정
const auth = getAuth(app);

console.log('app???????', app)


// admin 설정 .env 변수로는 안되네 ? 
// const serviceAccount = {
//     type: process.env.SDK_TYPE,
//     project_id: process.env.SDK_PROJECT_ID,
//     private_key_id: process.env.SDK_PRIVATE_KEY_ID,
//     private_key: process.env.SDK_PRIVATE_KEY,
//     client_email: process.env.SDK_CLIENT_EMAIL,
//     client_id: process.env.SDK_CLIENT_ID,
//     auth_uri: process.env.SDK_AUTH_URI,
//     token_uri: process.env.SDK_TOKEN_URI,
//     auth_provider_x509_cert_url: process.env.SDK_AUTH_PROVIDER_CERT_URL,
//     client_x509_cert_url: process.env.SDK_CLIENT_CERT_URL,
//     universe_domain: process.env.SDK_UNIVERSE_DOMAIN
// }



//Email 로그인
export const signupEmail = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

//Email 회원가입
export const loginEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const accTokenCheck = async (idToken) => {
    try {
        const tokenData = await admin.auth().verifyIdToken(idToken)
        console.log('token info??', tokenData)
        return tokenData;
    } catch (e) {
        console.log('캐치에 걸림 ???', e.code)
        // 따라서 firebase의 uid가 필요한 경우, decodedIdToken.user_id로 조회할 수 있다.
        // 토큰이 유효하지 않으면 error로 이어지고, error.code로 조회하면 결과를 볼 수 있다.
        if (e.code == 'auth/id-token-revoked') {
            // Token has been revoked. Inform the user to reauthenticate or signOut() the user.
            console.error('토큰이 취소됐습니다. 로그아웃이나 다시 로그인 해주세요.', e)
            return { status: 'fail', message: '토큰의 유효기간이 지났습니다. 다시 로그인 해주세요.', code: 1001 }
        } else if (e.code == 'id-token-expired', e) {
            // auth / id - token - expired: 유효시간이 지난 토큰
            console.error('토큰의 유효기간이 지났습니다. 다시 로그인 해주세요')
            return { status: 'fail', message: '토큰의 유효기간이 지났습니다. 다시 로그인 해주세요.', code: 1002 }
        } else if (e.code == 'argument-error', e) {
            // auth / argument - error: 유효하지 않은 토큰
            console.error('토큰이 유효하지 않습니다 1', e)
            return { status: 'fail', message: '토큰이 유효하지 않습니다. 1', code: 1003 }
        } else {
            console.error('토큰이 유효하지 않습니다 2', e)
            return { status: 'fail', message: '토큰이 유효하지 않습니다. 2', code: 1004 }
        }
    }

}

export const refTokenCheck = async (idToken) => {
    try {
        const tokenRes = await admin.auth().verifyIdToken(idToken)
        console.log('token info??', tokenRes)
    } catch (e) {
        console.log(e.code)
        // 따라서 firebase의 uid가 필요한 경우, decodedIdToken.user_id로 조회할 수 있다.
        // 토큰이 유효하지 않으면 error로 이어지고, error.code로 조회하면 결과를 볼 수 있다.
        // auth / id - token - expired: 유효시간이 지난 토큰
        // auth / argument - error: 유효하지 않은 토큰
        if (e.code == 'auth/id-token-revoked') {
            // Token has been revoked. Inform the user to reauthenticate or signOut() the user.
            console.error('토큰이 취소됐습니다. 로그아웃이나 다시 로그인 해주세요')
        } else if (e.code == 'id-token-expired') {
            console.error('토큰의 유효기간이 지났습니다. 다시 로그인 해주세요')
        } else if (e.code == 'argument-error') {
            console.error('토큰이 유효하지 않습니다 1')
        } else {
            console.error('토큰이 유효하지 않습니다 2')
        }
    }


}




// 모든 할일 가져오기
export async function getAllTodo() {

    // console.log('여긴오냐 ?')
    // 모든 문서 가져오기
    const q = query(collection(db, "todos"));
    const querySnapshot = await getDocs(q);
    const fetchedTodos = []

    if (querySnapshot.empty) return [];

    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());

        const aTodo = {
            id: doc.id,
            title: doc.data()["title"],
            is_done: doc.data()["is_done"],
            created_at: doc.data()["created_at"].toDate()
        }

        fetchedTodos.push(aTodo)
    });
    return fetchedTodos;
}


// 할일 추가
export async function addTodo({ title }) {
    const newTodoRef = doc(collection(db, "todos"))
    const createAtTimestemp = Timestamp.fromDate(new Date());
    const newTodoData = {
        id: newTodoRef.id,
        title,
        is_done: false,
        created_at: createAtTimestemp,
    }

    await setDoc(newTodoRef, newTodoData)
    return { ...newTodoData, created_at: createAtTimestemp.toDate() };
}



// 단일 가져오기
export async function getTodo(id) {
    const todoDocRef = doc(db, "todos", id)
    const todoDocSnap = await getDoc(todoDocRef);

    if (!todoDocSnap.exists() || id === null) return null;
    if (todoDocSnap.exists()) {
        const todo = {
            id: todoDocSnap.id,
            title: todoDocSnap.data()["title"],
            is_done: todoDocSnap.data()["is_done"],
            created_at: todoDocSnap.data()["created_at"].toDate()
        }
        return todo
    }
}



// 단일 수정
export async function updateTodo({ id, title, is_done }) {
    const isTodo = await getTodo(id)
    if (!isTodo) return null;

    const todo = await updateDoc(doc(db, "todos", id), { title, is_done });
    console.log('단일 업데이트 ?', todo)
    return todo;
}




// 단일 삭제
export async function deleteTodo(id) {
    const isTodo = await getTodo(id)
    if (!isTodo) return null;

    await deleteDoc(doc(db, "todos", id))
    return isTodo;
}



// module.exports = { fetchTotos }






// 로그인 할 떄 마다 토큰 변경됨


// {
//     "state": "SUCCES",
//     "message": "성공",
//     "data": {
//         "user": {
//             "uid": "gDB76nB6F7ehSQiDs67YSht46ZR2",
//             "email": "sun87-1@daum.net",
//             "emailVerified": false,
//             "isAnonymous": false,
//             "providerData": [
//                 {
//                     "providerId": "password",
//                     "uid": "sun87-1@daum.net",
//                     "displayName": null,
//                     "email": "sun87-1@daum.net",
//                     "phoneNumber": null,
//                     "photoURL": null
//                 }
//             ],
//             "stsTokenManager": {
//                 "refreshToken": "AMf-vBxahFu32nB2PpJfGZX1gMB7pdEl8X0LEtcteqZgCVTHNgG38kSX53_FxZOG7ytLTBXJ2VaYZBR-8Es_ZD_UEAQDemeNvAhOym3H2GAjJTbSqalpGNwNK1udUcSqFXt7tqBKjb7SGm7VMPNw7WOS0S9O5FsYC8xS8YCUalHxX2DrEbp66tfWmAW_DqzJ_uEs6_VPfxCf",
//                 "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjBhYmQzYTQzMTc4YzE0MjlkNWE0NDBiYWUzNzM1NDRjMDlmNGUzODciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbWVhbC02MmNjYiIsImF1ZCI6Im1lYWwtNjJjY2IiLCJhdXRoX3RpbWUiOjE3Mzc0NDYxODQsInVzZXJfaWQiOiJnREI3Nm5CNkY3ZWhTUWlEczY3WVNodDQ2WlIyIiwic3ViIjoiZ0RCNzZuQjZGN2VoU1FpRHM2N1lTaHQ0NlpSMiIsImlhdCI6MTczNzQ0NjE4NCwiZXhwIjoxNzM3NDQ5Nzg0LCJlbWFpbCI6InN1bjg3LTFAZGF1bS5uZXQiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsic3VuODctMUBkYXVtLm5ldCJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.U3v7p4liKsajjNjsV67EKj50PUcs0dSP7waIv3cZX62jVXaP3l84ZZv_Gg-52P47ONDxYn4r89y5UOZukFyEJjGDxK-W1sfZPT__5Ko8MT1hHToJulSTXfDEloaT0WUPMD2nqE3v5FS5jwDMTxijtb8S2O5l2VICVZPZj6WNYVBxwruvYJ6dYhECcliK6UlCo3pWExQ0vmc9jIRIuXzxM562uVu1Uv7T4GrD13VS8NsaVu3cvvCYI1uLssRs5SW92GJZ1xiF0cV5hNVnC-0JZLQf4aHhceIO1raOr9B3MmQUqUlIGv5inqWEDWyqcCBxqDjr9IhI27hzMVrMwP5gTA",
//                 "expirationTime": 1737449784692
//             },
//             "createdAt": "1737038345678",
//             "lastLoginAt": "1737446184555",
//             "apiKey": "AIzaSyC_SPYp2L2TDtEZ8eFFZYqeEpd0LlGgI-E",
//             "appName": "[DEFAULT]"
//         },
//         "providerId": null,
//         "_tokenResponse": {
//             "kind": "identitytoolkit#VerifyPasswordResponse",
//             "localId": "gDB76nB6F7ehSQiDs67YSht46ZR2",
//             "email": "sun87-1@daum.net",
//             "displayName": "",
//             "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjBhYmQzYTQzMTc4YzE0MjlkNWE0NDBiYWUzNzM1NDRjMDlmNGUzODciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbWVhbC02MmNjYiIsImF1ZCI6Im1lYWwtNjJjY2IiLCJhdXRoX3RpbWUiOjE3Mzc0NDYxODQsInVzZXJfaWQiOiJnREI3Nm5CNkY3ZWhTUWlEczY3WVNodDQ2WlIyIiwic3ViIjoiZ0RCNzZuQjZGN2VoU1FpRHM2N1lTaHQ0NlpSMiIsImlhdCI6MTczNzQ0NjE4NCwiZXhwIjoxNzM3NDQ5Nzg0LCJlbWFpbCI6InN1bjg3LTFAZGF1bS5uZXQiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsic3VuODctMUBkYXVtLm5ldCJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.U3v7p4liKsajjNjsV67EKj50PUcs0dSP7waIv3cZX62jVXaP3l84ZZv_Gg-52P47ONDxYn4r89y5UOZukFyEJjGDxK-W1sfZPT__5Ko8MT1hHToJulSTXfDEloaT0WUPMD2nqE3v5FS5jwDMTxijtb8S2O5l2VICVZPZj6WNYVBxwruvYJ6dYhECcliK6UlCo3pWExQ0vmc9jIRIuXzxM562uVu1Uv7T4GrD13VS8NsaVu3cvvCYI1uLssRs5SW92GJZ1xiF0cV5hNVnC-0JZLQf4aHhceIO1raOr9B3MmQUqUlIGv5inqWEDWyqcCBxqDjr9IhI27hzMVrMwP5gTA",
//             "registered": true,
//             "refreshToken": "AMf-vBxahFu32nB2PpJfGZX1gMB7pdEl8X0LEtcteqZgCVTHNgG38kSX53_FxZOG7ytLTBXJ2VaYZBR-8Es_ZD_UEAQDemeNvAhOym3H2GAjJTbSqalpGNwNK1udUcSqFXt7tqBKjb7SGm7VMPNw7WOS0S9O5FsYC8xS8YCUalHxX2DrEbp66tfWmAW_DqzJ_uEs6_VPfxCf",
//             "expiresIn": "3600"
//         },
//         "operationType": "signIn"
//     }
// }




// 재로그인 
// {
//     "state": "SUCCES",
//     "message": "성공",
//     "data": {
//         "user": {
//             "uid": "gDB76nB6F7ehSQiDs67YSht46ZR2",
//             "email": "sun87-1@daum.net",
//             "emailVerified": false,
//             "isAnonymous": false,
//             "providerData": [
//                 {
//                     "providerId": "password",
//                     "uid": "sun87-1@daum.net",
//                     "displayName": null,
//                     "email": "sun87-1@daum.net",
//                     "phoneNumber": null,
//                     "photoURL": null
//                 }
//             ],
//             "stsTokenManager": {
//                 "refreshToken": "AMf-vBzkZ6AvQpOeAE4SmyugDG9Gx7j4dq8UGpDvP0PJS0wW5MI4D2QXAHiWNaNdQUB7UaLN0mjIS1QV5hFG4DEl4OUbPSG2j0mnmM4goCjVvMsP77pAlrtML2A5jZiKhACMR8yJXe30aldQM8DI_O_O8IEaIw6CdasJCAqx5y7V3_-7clkdABo8P2n-zyOHE0FuhkU2yLVW",
//                 "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjBhYmQzYTQzMTc4YzE0MjlkNWE0NDBiYWUzNzM1NDRjMDlmNGUzODciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbWVhbC02MmNjYiIsImF1ZCI6Im1lYWwtNjJjY2IiLCJhdXRoX3RpbWUiOjE3Mzc0NDYzNTQsInVzZXJfaWQiOiJnREI3Nm5CNkY3ZWhTUWlEczY3WVNodDQ2WlIyIiwic3ViIjoiZ0RCNzZuQjZGN2VoU1FpRHM2N1lTaHQ0NlpSMiIsImlhdCI6MTczNzQ0NjM1NCwiZXhwIjoxNzM3NDQ5OTU0LCJlbWFpbCI6InN1bjg3LTFAZGF1bS5uZXQiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsic3VuODctMUBkYXVtLm5ldCJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.H3cKNg830oaUXiNsh2AtL8nDbwRLAtGdfGu7hJIamwCzvRZTFxR2TZeFGxOtZjO8dCTPOmQweQkR86O4SHsHty5VhXSXBxnKi8-_5t-XnpNR40PGVzQbZnnl-gIjwIblwtsCVSNq0l7_ndd3-ldahNhQgZHm3nrsJ0NG2whoDgyrwTsS-1pXWuzybHC3OgnSOjS4PJne05M44eF6a26xRJhKSCKEQ5Zt78pQWzav2QqFF0PIGIofShj5dokWaePkw1TjTlcSf3SPp_35Jm4sVJc5VqcFUhRi9XUSGZMabhVM2Dey8wKcfgSCdR2WeH6Og5x66pr84_yxcmdJlUvwog",
//                 "expirationTime": 1737449954657
//             },
//             "createdAt": "1737038345678",
//             "lastLoginAt": "1737446354524",
//             "apiKey": "AIzaSyC_SPYp2L2TDtEZ8eFFZYqeEpd0LlGgI-E",
//             "appName": "[DEFAULT]"
//         },
//         "providerId": null,
//         "_tokenResponse": {
//             "kind": "identitytoolkit#VerifyPasswordResponse",
//             "localId": "gDB76nB6F7ehSQiDs67YSht46ZR2",
//             "email": "sun87-1@daum.net",
//             "displayName": "",
//             "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjBhYmQzYTQzMTc4YzE0MjlkNWE0NDBiYWUzNzM1NDRjMDlmNGUzODciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbWVhbC02MmNjYiIsImF1ZCI6Im1lYWwtNjJjY2IiLCJhdXRoX3RpbWUiOjE3Mzc0NDYzNTQsInVzZXJfaWQiOiJnREI3Nm5CNkY3ZWhTUWlEczY3WVNodDQ2WlIyIiwic3ViIjoiZ0RCNzZuQjZGN2VoU1FpRHM2N1lTaHQ0NlpSMiIsImlhdCI6MTczNzQ0NjM1NCwiZXhwIjoxNzM3NDQ5OTU0LCJlbWFpbCI6InN1bjg3LTFAZGF1bS5uZXQiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsic3VuODctMUBkYXVtLm5ldCJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.H3cKNg830oaUXiNsh2AtL8nDbwRLAtGdfGu7hJIamwCzvRZTFxR2TZeFGxOtZjO8dCTPOmQweQkR86O4SHsHty5VhXSXBxnKi8-_5t-XnpNR40PGVzQbZnnl-gIjwIblwtsCVSNq0l7_ndd3-ldahNhQgZHm3nrsJ0NG2whoDgyrwTsS-1pXWuzybHC3OgnSOjS4PJne05M44eF6a26xRJhKSCKEQ5Zt78pQWzav2QqFF0PIGIofShj5dokWaePkw1TjTlcSf3SPp_35Jm4sVJc5VqcFUhRi9XUSGZMabhVM2Dey8wKcfgSCdR2WeH6Og5x66pr84_yxcmdJlUvwog",
//             "registered": true,
//             "refreshToken": "AMf-vBzkZ6AvQpOeAE4SmyugDG9Gx7j4dq8UGpDvP0PJS0wW5MI4D2QXAHiWNaNdQUB7UaLN0mjIS1QV5hFG4DEl4OUbPSG2j0mnmM4goCjVvMsP77pAlrtML2A5jZiKhACMR8yJXe30aldQM8DI_O_O8IEaIw6CdasJCAqx5y7V3_-7clkdABo8P2n-zyOHE0FuhkU2yLVW",
//             "expiresIn": "3600"
//         },
//         "operationType": "signIn"
//     }
// }