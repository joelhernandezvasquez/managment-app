
import {UIStore} from '../store/UIStates/store';

export const useUIStates = () => {
  
    const {setActiveBoard,currentBoardSelected,isBoadMenuOpen,toggleBoardMenu,closeBoardMenu,restoreBoardSelected,isSideBarOpen,toggleSideBar,closeSideBar,desktopSideBarStatus,setDesktopSideBar} = UIStore();

    const getActiveBoard = () =>{
        return currentBoardSelected;
    }

    const isBoardMenuCurrentlyOpen = () =>{
        return isBoadMenuOpen;
    }

    const onToogleBoardMenu = () =>{
        toggleBoardMenu();
    }

    const resetBoardSelected = () =>{
        restoreBoardSelected();
    }
    const closeBoardMenuWindow = () =>{
       closeBoardMenu();
    }

    const closeMenuSideBar = () =>{
        closeSideBar();
    }

   
    return {
        getActiveBoard,
        isSideBarOpen,
        isBoardMenuCurrentlyOpen,
        setActiveBoard,
        toggleSideBar,
        onToogleBoardMenu,
        closeBoardMenu,
        closeBoardMenuWindow,
        closeMenuSideBar,
        resetBoardSelected,
        desktopSideBarStatus,
        setDesktopSideBar  
    }
}
