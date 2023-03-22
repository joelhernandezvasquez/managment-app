
import { create } from 'zustand';
import { devtools,persist} from 'zustand/middleware'
import {BoardName} from '../../types/types';
interface UIState{
    isSideBarOpen:boolean,
    currentBoardSelected:BoardName,
    isBoadMenuOpen:boolean,
    toggleSideBar:() => void,
    closeSideBar:() => void,
    setActiveBoard:(boardName:BoardName) => void, 
    toggleBoardMenu:() => void,
    closeBoardMenu:() => void,
    restoreBoardSelected:() =>void,
  
}

export const UIStore = create <UIState>()(
    devtools(
      
      persist(
        (set) => ({
              isSideBarOpen:false,
             currentBoardSelected:{_id:'',name:''},
             isBoadMenuOpen:false,
               
             toggleSideBar:() =>  set((state)=> ({
            isSideBarOpen:!state.isSideBarOpen
          })),

          closeSideBar:() => set((state)=>({
            isSideBarOpen:false
          })),

          setActiveBoard:(boardName) => set((state)=>({
            currentBoardSelected:boardName
          })),
          toggleBoardMenu:() => set((state)=>({
            isBoadMenuOpen: !state.isBoadMenuOpen
          })),
          closeBoardMenu:() => set((state)=>({
            isBoadMenuOpen:false
          })),
          restoreBoardSelected:() => set((state)=>({
            currentBoardSelected:{_id:'',name:''},
          }))

        }),
       

        {
          
          name: 'ui-storage', 
          serialize: (state) => btoa(JSON.stringify(state)),
          deserialize: (storedState) => JSON.parse(atob(storedState))
        }
      ),
      
      
    )
  )


 