import { create } from 'zustand'
import { devtools } from 'zustand/middleware';



interface UIStore {
   isOpen: boolean
   handleDrawerOpen: () => void
}





export const useUIStore = create(devtools<UIStore>(set => ({
   isOpen: false,
   handleDrawerOpen: () => set((prev: UIStore) => {
      console.log('prev?', prev)
      return { ...prev, isOpen: !prev.isOpen }
   })
})))














