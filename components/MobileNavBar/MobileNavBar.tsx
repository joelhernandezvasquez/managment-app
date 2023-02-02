import Image from 'next/image';
import navigation from '../../styles/navigation.module.css';
import mobileHeaderLogo from '../../assets/mobileNavLogo.svg';
import { ShowSideBarMobile } from '../ShowSideBarMobile/ShowSideBarMobile';
import { OpenNewTask } from '../OpenNewTask/OpenNewTask';
import { ShowBoardMenu } from '../ShowBoardMenu/ShowBoardMenu';

export const MobileNavBar = () => {
  return (
    <section className={navigation.mobile_nav_bar}>
     <Image
     src = {mobileHeaderLogo}
     width={24}
     height={25}
     alt="company logo"
     />
     
     <ShowSideBarMobile/>
     <OpenNewTask/>
     <ShowBoardMenu/>
    </section>
  )
}
