import { useRef,MouseEvent} from 'react';
import {UIStore} from '../store/UIStates/store';

export const useSideBar = () => {
   const {isSideBarOpen,toggleSideBar,closeSideBar} = UIStore();
   const sidebarRef = useRef<HTMLDivElement>(null);

   const closeMobileSidebar = (event:MouseEvent) =>{
      event.stopPropagation();
      if(event.target === sidebarRef.current){
      closeSideBar();
    }  
   }

   return{
      isSideBarOpen,
      toggleSideBar,
      sidebarRef,
      closeSideBar,
      closeMobileSidebar
   }
}
