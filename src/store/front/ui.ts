'use client';

import { create } from 'zustand'
import { devtools } from 'zustand/middleware';



interface UIStore {
   drawerIsOpen: boolean
   setDrawerIsOpen: (isOpend: boolean) => void
}





export const useUIStore = create(devtools<UIStore>(set => ({
   drawerIsOpen: false,
   setDrawerIsOpen: (isOpend: boolean) => set((prev: UIStore) => {
      console.log('prev?', prev)
      return { drawerIsOpen: isOpend }
   })
})))














