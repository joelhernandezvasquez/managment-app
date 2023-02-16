import {useUiStore} from '../store/UIStates/store'

export const useSideBar = () => {
   const {isSideBarOpen,toggleSideBar,closeSideBar} = useUiStore();
   
   return{
      isSideBarOpen,
      toggleSideBar,
      closeSideBar
   }
}
