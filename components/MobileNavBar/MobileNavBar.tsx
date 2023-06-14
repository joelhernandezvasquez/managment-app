import Logo from '../Logo/Logo';
import { ShowSideBarMobile } from '../ShowSideBarMobile/ShowSideBarMobile';
import { OpenNewTask } from '../OpenNewTask/OpenNewTask';
import { ShowBoardMenu } from '../ShowBoardMenu/ShowBoardMenu';
import navigation from '../../styles/navigation.module.css';

export const MobileNavBar = () => {
  return (
    <nav className={navigation.mobile_nav_bar}>
      <Logo/>
     <ShowSideBarMobile/>
     <OpenNewTask/>
     <ShowBoardMenu/>
    </nav>
  )
}
