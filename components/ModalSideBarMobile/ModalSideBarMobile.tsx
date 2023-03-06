import {FC,ReactNode,MouseEvent}from 'react';
import { useSideBar } from '../../hooks';
import style from '../../styles/navigation.module.css';
interface Props{
    children:ReactNode
}
export const ModalSideBarMobile:FC <Props> = ({children}) => {
  
   const {sidebarRef,closeMobileSidebar} = useSideBar();

  return (
    <div ref={sidebarRef} className={style.modal_nav_bar_menu} onClick={(event:MouseEvent)=> closeMobileSidebar(event)}>
        {children}
    </div>
  )
}
