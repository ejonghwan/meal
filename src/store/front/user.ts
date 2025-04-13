import { create } from 'zustand'
import { devtools } from 'zustand/middleware';



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
   authInfo: {},
   userInfo: {},
   setAutuInfo: (payload) => set(() => {
      // localStorage.setItem("x-acc-token", user.data.stsTokenManager.accessToken);
      return { authInfo: payload.data }
   }),
   setUserInfo: (payload: any) => set((prev: UserStore) => {
      // localStorage.setItem("x-acc-token", user.data.stsTokenManager.accessToken);
      return { userInfo: payload.data }
   }),
   setUserLogin: (payload: any) => set((prev: UserStore) => {
      // login
      console.log('login ????', payload)

      localStorage.setItem("x-acc-token", payload.data?.accToken);
      console.log('pay?', payload)
      return { userInfo: payload.data }
   }),
   setUserLogout: (user: any) => set((prev: UserStore) => {
      localStorage.removeItem("x-acc-token");
      return { userInfo: {} }
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








