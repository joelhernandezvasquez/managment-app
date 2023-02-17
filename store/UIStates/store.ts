
import { create } from 'zustand';

import { devtools} from 'zustand/middleware'
import {BoardName} from '../../types/types';
interface UIState{
    isSideBarOpen:boolean,
    currentBoardSelected:BoardName,
    toggleSideBar:() => void,
    closeSideBar:() => void,
    setCurrentBoard:(boardName:BoardName) => void,
}

export const useUiStore = create <UIState>()(
    devtools(
        (set) => ({
            isSideBarOpen:false,
             currentBoardSelected:{_id:'',name:''},

            toggleSideBar:() =>  set((state)=> ({
            isSideBarOpen:!state.isSideBarOpen
          })),

          closeSideBar:() => set((state)=>({
            isSideBarOpen:false
          })),

          setCurrentBoard:(boardName) => set((state)=>({
            currentBoardSelected:boardName
          })),

          

        }),
       
      
    )
  )

 