
import {UIStore} from '../store/UIStates/store';

export const useUIStates = () => {
  
    const {setActiveBoard,currentBoardSelected,isBoadMenuOpen,toggleBoardMenu,closeBoardMenu,restoreBoardSelected} = UIStore();

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
        isBoardMenuCurrentlyOpen,
        setActiveBoard,
        onToogleBoardMenu,
        closeBoardMenu,
        closeBoardMenuWindow,
        resetBoardSelected
        

    }
}
