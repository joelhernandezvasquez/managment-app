
import {UIStore} from '../store/UIStates/store';

export const useUIStates = () => {
  
    const {setActiveBoard,currentBoardSelected,hasHydrated} = UIStore();

    const getActiveBoard = () =>{
        return currentBoardSelected;
    }

    return {
        getActiveBoard,
        setActiveBoard,
        hasHydrated
    }
}
