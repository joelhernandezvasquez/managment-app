import {FC,ReactNode,MouseEvent} from 'react'
import { useSideBar } from '../../hooks';
import layouts from '../../styles/layouts.module.css';
interface Props{
    children:ReactNode,
    formTitle:string,
    formTitleColor?:string
}
export const ModalFormLayout:FC<Props> = ({children,formTitle,formTitleColor}) => {

  const {sidebarRef,closeMobileSidebar} = useSideBar();
  
  return (
    <div ref={sidebarRef} className={layouts.modal_container} 
      onClick={(event:MouseEvent)=> closeMobileSidebar(event)}
      >
       <div className={layouts.modal_inner_form}>
       <h2 style={{color:`${formTitleColor}`}} className={layouts.modal_title}>{formTitle}</h2>
        {children}
       </div>
       
    </div>
  )
}
