import {FC,ReactNode,MouseEvent, FormEvent} from 'react'
import { useSideBar, useUIStates } from '../../hooks';
import layouts from '../../styles/layouts.module.css';
interface Props{
    children:ReactNode,
    formTitle:string,
    formTitleColor?:string
}
export const ModalFormLayout:FC<Props> = ({children,formTitle,formTitleColor}) => {

  const {sidebarRef,closeSideBar} = useSideBar();
  const {closeBoardMenu,isSideBarOpen} = useUIStates();

  const closeWindow = (event:FormEvent) =>{
    event.stopPropagation();
     if(event.target === sidebarRef.current){
        isSideBarOpen ? closeSideBar() : closeBoardMenu()
     }
  }

  return (
    <div ref={sidebarRef} className={layouts.modal_container}
      onClick={(event:MouseEvent)=> closeWindow(event)}
      >
       <div className={layouts.modal_inner_form}>
       <h2 style={{color:`${formTitleColor}`}} className={layouts.modal_title}>{formTitle}</h2>
        {children}
       </div>
       
    </div>
  )
}
