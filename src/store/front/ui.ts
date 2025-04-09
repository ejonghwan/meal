import { create } from 'zustand'
import { devtools } from 'zustand/middleware';



interface UIStore {
   drawerIsOpen: boolean
   setDrawerIsOpen: () => void
}





export const useUIStore = create(devtools<UIStore>(set => ({
   drawerIsOpen: false,
   setDrawerIsOpen: () => set((prev: UIStore) => {
      console.log('prev?', prev)
      return { ...prev, drawerIsOpen: !prev.drawerIsOpen }
   })
})))














