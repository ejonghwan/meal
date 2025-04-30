import { create } from 'zustand'
import { devtools } from 'zustand/middleware';
import { auth } from '@/src/data/firebaseClient'

interface UserStore {
   authInfo: any;
   userInfo: any;
   setUserInfo: any;
   setUserLogin: any;
   setUserLogout: any;
   setAutuInfo: any;


   arr: { id: string, content: string }[],
   addArr: (val: string) => void,
   removeArr: (id: string) => void
}





export const useUserStore = create(devtools<UserStore>(set => ({
   authInfo: null,
   userInfo: null,

   setAutuInfo: (payload) => set((prev: UserStore) => {
      // localStorage.setItem("x-acc-token", user.data.stsTokenManager.accessToken);
      return { ...prev, authInfo: payload.data }
   }),

   setUserInfo: (payload: any) => set((prev: UserStore) => {
      console.log(payload)
      return { ...prev, userInfo: payload }
   }),

   // setUserLogin: (user) => set({ user }),
   setUserLogin: (payload: any) => set((prev: UserStore) => {
      return { ...prev, userInfo: payload.data }
   }),

   setUserLogout: (user: any) => set((prev: UserStore) => {
      localStorage.removeItem("x-acc-token");
      auth.signOut();
      return { ...prev, userInfo: {} }
      //logout
   }),





   arr: [
      { id: '1', content: 'zz', }
   ],
   addArr: (val: string) => set((prev: UserStore) => {
      console.log('user add ?', val, prev)
      return { arr: [...prev.arr, { content: val, id: new Date().getMilliseconds() + val }] }
   }),
   removeArr: (id: string) => set((prev: UserStore) => ({ arr: prev.arr.filter(e => e.id !== id) }))
})))








