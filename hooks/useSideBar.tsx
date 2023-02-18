import {UIStore} from '../store/UIStates/store'

export const useSideBar = () => {
   const {isSideBarOpen,toggleSideBar,closeSideBar} = UIStore();
   
   return{
      isSideBarOpen,
      toggleSideBar,
      closeSideBar
   }
}
