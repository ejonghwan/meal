'use client';

import { create } from 'zustand'
import { devtools } from 'zustand/middleware';
import { auth } from '@/src/data/firebaseClient'
import { UserPayload } from '@/src/types/data/user'

interface UserStore {
   authInfo: any;
   userInfo: any;
   loading: boolean;
   isAccToken: boolean | null;
   setLoading: (loading: boolean) => void;
   setIsAccToken: (loading: boolean) => void;
   setUserInfo: (user: any) => void;
   setUserLogin: (user: any) => void;
   setUserLogout: () => void;
   setAutuInfo: (info: any) => void;
   initializeTokenStatus: () => void;


   arr: { id: string, content: string }[];
   addArr: (val: string) => void;
   removeArr: (id: string) => void;
}





export const useUserStore = create(devtools<UserStore>((set, get) => ({

   authInfo: null,
   userInfo: null,
   loading: true,
   isAccToken: null,

   setLoading: (loading) => set({ loading }),
   setIsAccToken: (isAccToken) => set({ isAccToken }),
   setAutuInfo: (payload) => set((prev: UserStore) => {
      return { authInfo: payload.data }
   }),

   setUserInfo: (payload: UserPayload) => set((prev: UserStore) => {
      console.log('userInfo??', get().userInfo)
      return { userInfo: payload }
   }),

   // setUserLogin: (user) => set({ user }),
   setUserLogin: (payload: UserPayload) => set((prev: UserStore) => {
      get().initializeTokenStatus();
      return { userInfo: payload.data }
   }),


   setUserLogout: () => {
      // if (!prev.userInfo) return;
      localStorage.removeItem("x-acc-token");
      auth.signOut().then(() => { set({ userInfo: null }) });
      // set({ userInfo: null });
      //logout
   },

   initializeTokenStatus: () => {
      if (typeof window !== 'undefined') {
         const token = localStorage.getItem('x-acc-token');
         // const hasToken = !!token;

         // 현재 상태와 다를 경우에만 업데이트
         // if (get().isAccToken !== hasToken) set({ isAccToken: hasToken });
         // console.log('hasToken??', hasToken)
         if (token) {
            set({ isAccToken: true, loading: true })
         } else {
            set({ isAccToken: false, loading: false });
         }

      }
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








