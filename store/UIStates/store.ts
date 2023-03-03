
import { create } from 'zustand';
import { devtools,persist} from 'zustand/middleware'
import {BoardName} from '../../types/types';
interface UIState{
    isSideBarOpen:boolean,
    currentBoardSelected:BoardName,
    toggleSideBar:() => void,
    closeSideBar:() => void,
    setActiveBoard:(boardName:BoardName) => void, 
   
}

export const UIStore = create <UIState>()(
    devtools(
      persist(
        (set) => ({
            isSideBarOpen:false,
             currentBoardSelected:{_id:'',name:''},
            toggleSideBar:() =>  set((state)=> ({
            isSideBarOpen:!state.isSideBarOpen
          })),

          closeSideBar:() => set((state)=>({
            isSideBarOpen:false
          })),

          setActiveBoard:(boardName) => set((state)=>({
            currentBoardSelected:boardName
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


 