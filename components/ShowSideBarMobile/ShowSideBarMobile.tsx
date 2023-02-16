
import { useSideBar } from '../../hooks/useSideBar';
import { Board } from '../Board/Board';
import { ModalSideBarMobile } from '../ModalSideBarMobile/ModalSideBarMobile';
import navigation from '../../styles/navigation.module.css';


export const ShowSideBarMobile = () => {
  
   const {isSideBarOpen,toggleSideBar} = useSideBar();
 
  return (
   <div className={navigation.SideBar_mobile}  onClick={toggleSideBar} >
    <h1 className={navigation.SideBar_mobile_headline}>Platform Launch</h1>
    <svg className={`${navigation.SideBar_mobile_chevron_down} ${isSideBarOpen && navigation.SideBar_mobile_chevron_up}`} 
      width="9" height="7" viewBox="0 0 9 7" 
       fill="none"
     >
    <path d="M1 1L5 5L9 1" stroke="#635FC7" stroke-width="2"/>
    </svg>

    {isSideBarOpen && 
    <ModalSideBarMobile> 
      <Board/>
    </ModalSideBarMobile>}
   </div>
  )
}
