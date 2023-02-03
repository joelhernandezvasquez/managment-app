import {FC,ReactNode}from 'react';
import style from '../../styles/navigation.module.css';
interface Props{
    children:ReactNode
}
export const ModalSideBarMobile:FC <Props> = ({children}) => {
  return (
    <div className={style.modal_nav_bar_menu}>
        {children}
    </div>
  )
}
