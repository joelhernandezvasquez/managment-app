
import {UIStore} from '../store/UIStates/store';

export const useUIStates = () => {
  
    const {setActiveBoard,currentBoardSelected,isBoadMenuOpen,toggleBoardMenu,closeBoardMenu} = UIStore();

    const getActiveBoard = () =>{
        return currentBoardSelected;
    }

    const isBoardMenuCurrentlyOpen = () =>{
        return isBoadMenuOpen;
    }

    const onToogleBoardMenu = () =>{
        toggleBoardMenu();
    }

    return {
        getActiveBoard,
        isBoardMenuCurrentlyOpen,
        setActiveBoard,
       onToogleBoardMenu,
       closeBoardMenu

    }
}
