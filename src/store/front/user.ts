'use client';

import { create } from 'zustand'
import { devtools } from 'zustand/middleware';
import { auth } from '@/src/data/firebaseClient'
import { UserPayload } from '@/src/types/data/user'

interface UserStore {
   authInfo: any;
   userInfo: any;
   loading: boolean,
   setLoading: (loading: boolean) => void;
   setUserInfo: (user: any) => void
   setUserLogin: (user: any) => void
   setUserLogout: () => void
   setAutuInfo: (info: any) => void


   arr: { id: string, content: string }[],
   addArr: (val: string) => void,
   removeArr: (id: string) => void
}





export const useUserStore = create(devtools<UserStore>(set => ({

   authInfo: null,
   userInfo: null,
   loading: true,

   setLoading: (loading) => set({ loading }),
   setAutuInfo: (payload) => set((prev: UserStore) => {
      return { authInfo: payload.data }
   }),

   setUserInfo: (payload: UserPayload) => set((prev: UserStore) => {
      return { userInfo: payload, loading: false }
   }),

   // setUserLogin: (user) => set({ user }),
   setUserLogin: (payload: UserPayload) => set((prev: UserStore) => {
      return { userInfo: payload.data }
   }),


   setUserLogout: () => {
      // if (!prev.userInfo) return;
      localStorage.removeItem("x-acc-token");
      auth.signOut().then(() => { set({ userInfo: null }) });
      // set({ userInfo: null });
      //logout
   },



   // setUserLogout: () => set((prev: UserStore) => {
   //    if (!prev.userInfo) return;
   //    localStorage.removeItem("x-acc-token");
   //    auth.signOut().then(() =>  set({ userInfo: null }));
   //    return { userInfo: null }
   //    //logout
   // }),






   arr: [
      { id: '1', content: 'zz', }
   ],
   addArr: (val: string) => set((prev: UserStore) => {
      // console.log('user add ?', val, prev)
      return { arr: [...prev.arr, { content: val, id: new Date().getMilliseconds() + val }] }
   }),
   // 위 처럼 arr: [] 이라면 이런 데이터는 불변을 지켜야하지만 
   // 쥬스탄드 첫번째 뎁스는 내부적으로 얕게 병합해주기 떄문에 전체 상태를 날리지 않음. userInfo만 업데이트해줌 
   removeArr: (id: string) => set((prev: UserStore) => ({ arr: prev.arr.filter(e => e.id !== id) }))
})))








