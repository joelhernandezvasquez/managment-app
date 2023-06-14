import {useUIStates } from '../../hooks';
import { OpenNewTask } from '../OpenNewTask/OpenNewTask';
import { ShowBoardMenu } from '../ShowBoardMenu/ShowBoardMenu';
import navigation from '../../styles/navigation.module.css';

export const DesktopNavBar = () => {
    const {getActiveBoard} = useUIStates();
  return (
    <nav className={navigation.desktop_nav_bar}>
    <h1 className={navigation.SideBar_mobile_headline}>
      {getActiveBoard()?.name ? getActiveBoard().name : 'No board Created' }
    </h1> 
     
     <OpenNewTask/>
     <ShowBoardMenu/>
    
    </nav>
  )
}
