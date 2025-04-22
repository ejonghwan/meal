"use client"

import { useEffect } from 'react'
import { useUserLoad } from '@/src/store/queryies/user/userQueries'
import { useUserStore } from '@/src/store/front/user'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '@/src/data/firebaseClient'

export const useLoad = () => {
    
    const { userInfo, setUserInfo, setUserLogin } = useUserStore();

    console.log('커스텀 훅 로드')

      // load 부분은 나중에 옮기자 
        let token = null;
        if (typeof window !== 'undefined') {
            // console.log(localStorage)
            token = localStorage.getItem('x-acc-token')
        }
        const { data: userLoadData, isError: userLoadError, isSuccess: userLoadSuccess } = useUserLoad(token)
    
        useEffect(() => {
            // test()
            console.log('load query?', userLoadData)
            userLoadData && setUserInfo(userLoadData)
        }, [userLoadSuccess])


        useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                if (user) {
                    console.log("🔥 로그인 되어 있음 : load ");
                    if (userLoadSuccess && userLoadData) setUserInfo(userLoadData)
                } else {
                    console.log("🙅 로그인 안 되어 있음 : load");
                    setUserLogin(null)
                }
            });
    
            return () => unsubscribe();
        }, [userLoadSuccess]);
    return userInfo;
}