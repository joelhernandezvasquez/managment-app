
import {UIStore} from '../store/UIStates/store';

export const useUIStates = () => {
  
    const {setActiveBoard,currentBoardSelected,isBoadMenuOpen,toggleBoardMenu,closeBoardMenu,restoreBoardSelected,isSideBarOpen,toggleSideBar} = UIStore();

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
        setTimeout(()=>{
         closeBoardMenu();
        },1000)
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
        resetBoardSelected,
      
    }
}
