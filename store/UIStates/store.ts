
import { create } from 'zustand';

import { devtools} from 'zustand/middleware'

interface UIState{
    isSideBarOpen:boolean,
    toggleSideBar:() => void,
    closeSideBar:() => void
}

export const useUiStore = create <UIState>()(
    devtools(
        (set) => ({
            isSideBarOpen:false,
      
            toggleSideBar:() =>  set((state)=> ({
            isSideBarOpen:!state.isSideBarOpen
          })),

          closeSideBar:() => set((state)=>({
            isSideBarOpen:false
          }))

        }),
       
      
    )
  )

 