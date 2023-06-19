
import { create } from 'zustand';
import { devtools,persist} from 'zustand/middleware'
import {BoardName,DesktopSideBarStatus} from '../../types/types';
interface UIState{
    isSideBarOpen:boolean,
    desktopSideBarStatus:DesktopSideBarStatus,
    currentBoardSelected:BoardName,
    isBoadMenuOpen:boolean,

    toggleSideBar:() => void,
    setDesktopSideBar:(status:DesktopSideBarStatus) => void,
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
             desktopSideBarStatus:'display',


             toggleSideBar:() =>  set((state)=> ({
            isSideBarOpen:!state.isSideBarOpen
          })),

          setDesktopSideBar:(status) => set((state)=> ({
            desktopSideBarStatus:status
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
          })),

        }),
       

        { 
          name: 'ui-storage', 
          serialize: (state) => btoa(JSON.stringify(state)),
          deserialize: (storedState) => JSON.parse(atob(storedState))
        }
      ),
      
      
    )
  )


 