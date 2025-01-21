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
import jwt from 'jsonwebtoken'


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

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app)

// auth 설정
const auth = getAuth(app);



//Email 로그인
export const signupEmail = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

//Email 회원가입
export const loginEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const loadUser = (idToken) => {
    const match = jwt.verify(idToken, { ignoreExpiration: true })
    console.log('load user?????????', idToken, match)
    // return auth.verifyIdToken(idToken)

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
