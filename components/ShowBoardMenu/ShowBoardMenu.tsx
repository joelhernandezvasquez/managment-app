import {useUIStates } from '../../hooks';
import { ShowActiveBoardMenu } from '../ShowActiveBoardMenu/ShowActiveBoardMenu';
import navigation from '../../styles/navigation.module.css';

export const ShowBoardMenu = () => {
  
  const {isBoardMenuCurrentlyOpen,onToogleBoardMenu} = useUIStates();
  
  return (
    <div className={navigation.show_board_menu} onClick={onToogleBoardMenu}>
      
        <span className={navigation.show_board_menu_button}></span>
        <span className={navigation.show_board_menu_button}></span>
        <span className={navigation.show_board_menu_button}></span>

        {isBoardMenuCurrentlyOpen() && <ShowActiveBoardMenu/>}
      
    </div>
  )
}
