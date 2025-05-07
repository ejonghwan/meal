import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, query, getDocs, Timestamp, setDoc, doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app)






// onAuthStateChanged(auth, (user) => {
//     if (user) {
//         console.log("로그인된 사용자:", user);
//     } else {
//         console.log("로그인되지 않음");
//     }
// });

// console.log(firebaseConfig); // ✅ 값 다 들어가 있는지
// console.log(app.name); // ✅ 'default' 나오는지







// // Import the functions you need from the SDKs you need
// import { initializeApp, getApp, getApps } from "firebase/app";
// import { getFirestore, collection, query, getDocs, Timestamp, setDoc, doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
// import {
//     getAuth,// authentication 설정
//     signInWithPopup, //google 로그인을 팝업창에 띄우기 위해
//     GoogleAuthProvider, //google login 기능
//     signInWithEmailAndPassword,// email 로그인
//     createUserWithEmailAndPassword, //email 회원가입
// } from 'firebase/auth';

// // SDK import
// export const admin = require("firebase-admin");
// const serviceAccountKey = require("./serviceAccountKey.json");


// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: process.env.API_KEY,
//     authDomain: process.env.AUTH_DOMAIN,
//     projectId: process.env.PROJECT_ID,
//     storageBucket: process.env.STORAGE_BUCKET,
//     messagingSenderId: process.env.MESSAGING_SENDER_ID,
//     appId: process.env.APP_ID,
//     measurementId: process.env.MEASUREMENT_ID
// };

// // admin 설정 .env 변수로는 안되네 ?
// // const serviceAccountKey = {
// //     type: process.env.SDK_TYPE,
// //     project_id: process.env.SDK_PROJECT_ID,
// //     private_key_id: process.env.SDK_PRIVATE_KEY_ID,
// //     private_key: process.env.SDK_PRIVATE_KEY,
// //     client_email: process.env.SDK_CLIENT_EMAIL,
// //     client_id: process.env.SDK_CLIENT_ID,
// //     auth_uri: process.env.SDK_AUTH_URI,
// //     token_uri: process.env.SDK_TOKEN_URI,
// //     auth_provider_x509_cert_url: process.env.SDK_AUTH_PROVIDER_CERT_URL,
// //     client_x509_cert_url: process.env.SDK_CLIENT_CERT_URL,
// //     universe_domain: process.env.SDK_UNIVERSE_DOMAIN
// // }



// // Initialize Firebase
// // const app = initializeApp(firebaseConfig);
// export const app = !getApps().length ? initializeApp(firebaseConfig, { credential: admin.credential.cert(serviceAccountKey) }) : getApp();
// const db = getFirestore(app)


// // admin initialize app 호출 중복 방지
// if (!admin.apps.length) {
//     // const databaseURL = "databaseURL";
//     var firebaseAdmin = admin.initializeApp({
//         credential: admin.credential.cert(serviceAccountKey),
//         // databaseURL: databaseURL,
//     });
// }


// // auth 설정
// export const auth = getAuth(app);


















// // CRUD TEST

// // 모든 할일 가져오기
// export async function getAllTodo() {

//     // console.log('여긴오냐 ?')
//     // 모든 문서 가져오기
//     const q = query(collection(db, "todos"));
//     const querySnapshot = await getDocs(q);
//     const fetchedTodos = []

//     if (querySnapshot.empty) return [];

//     querySnapshot.forEach((doc) => {
//         // doc.data() is never undefined for query doc snapshots
//         // console.log(doc.id, " => ", doc.data());

//         const aTodo = {
//             id: doc.id,
//             title: doc.data()["title"],
//             is_done: doc.data()["is_done"],
//             created_at: doc.data()["created_at"].toDate()
//         }

//         fetchedTodos.push(aTodo)
//     });
//     return fetchedTodos;
// }


// // 할일 추가
// export async function addTodo({ title }) {
//     const newTodoRef = doc(collection(db, "todos"))
//     const createAtTimestemp = Timestamp.fromDate(new Date());
//     const newTodoData = {
//         id: newTodoRef.id,
//         title,
//         is_done: false,
//         created_at: createAtTimestemp,
//     }

//     await setDoc(newTodoRef, newTodoData)
//     return { ...newTodoData, created_at: createAtTimestemp.toDate() };
// }



// // 단일 가져오기
// export async function getTodo(id) {
//     const todoDocRef = doc(db, "todos", id)
//     const todoDocSnap = await getDoc(todoDocRef);

//     if (!todoDocSnap.exists() || id === null) return null;
//     if (todoDocSnap.exists()) {
//         const todo = {
//             id: todoDocSnap.id,
//             title: todoDocSnap.data()["title"],
//             is_done: todoDocSnap.data()["is_done"],
//             created_at: todoDocSnap.data()["created_at"].toDate()
//         }
//         return todo
//     }
// }



// // 단일 수정
// export async function updateTodo({ id, title, is_done }) {
//     const isTodo = await getTodo(id)
//     if (!isTodo) return null;

//     const todo = await updateDoc(doc(db, "todos", id), { title, is_done });
//     console.log('단일 업데이트 ?', todo)
//     return todo;
// }




// // 단일 삭제
// export async function deleteTodo(id) {
//     const isTodo = await getTodo(id)
//     if (!isTodo) return null;

//     await deleteDoc(doc(db, "todos", id))
//     return isTodo;
// }



// // module.exports = { fetchTotos }




