import { create } from 'zustand'
import { devtools } from 'zustand/middleware';
import { auth } from '@/src/data/firebaseClient'
import { UserPayload } from '@/src/types/data/user'
import {restaurantData} from '@/src/types/data/restaurant'

interface RestaurantStore {
   loading: boolean,
   restaurant: restaurantData[] | null;

   setRestaurantData: (payload: UserPayload) => void;
   setLoading: (loading: boolean) => void;


}



export const useRestaurantStore = create(devtools<RestaurantStore>(set => ({

   loading: true,
   restaurant: null,

   setLoading: (loading) => set({ loading }),
   setRestaurantData: (payload) => set((prev: restaurantData) => {})



   }),
))









