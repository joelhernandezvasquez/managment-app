
import {useHasMounted, useSideBar,useUIStates } from '../../hooks';
import { Board } from '../Board/Board';
import { ModalSideBarMobile } from '../ModalSideBarMobile/ModalSideBarMobile';
import navigation from '../../styles/navigation.module.css';

export const ShowSideBarMobile = () => {

   const {isSideBarOpen,toggleSideBar} = useSideBar();
   const {getActiveBoard} = useUIStates();
   const hasMounted = useHasMounted();
  
   if(!hasMounted){
    return <></>;
   }
    
  return (
   <div className={navigation.SideBar_mobile}  onClick={toggleSideBar} >
    <h1 className={navigation.SideBar_mobile_headline}>
      {getActiveBoard()?.name ? getActiveBoard().name : 'No board selected' }
    </h1>
    <svg className={`${navigation.SideBar_mobile_chevron_down} ${isSideBarOpen && navigation.SideBar_mobile_chevron_up}`} 
      width="9" height="7" viewBox="0 0 9 7" 
       fill="none"
     >
    <path d="M1 1L5 5L9 1" stroke="#635FC7" strokeWidth="2"/>
    </svg>
     
    {isSideBarOpen && 
    <ModalSideBarMobile> 
      <Board/>
    </ModalSideBarMobile>}
   </div>
  )
}
