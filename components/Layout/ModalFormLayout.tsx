import {FC,ReactNode,useRef,MouseEvent} from 'react'
import { useSideBar } from '../../hooks';
import layouts from '../../styles/layouts.module.css';
interface Props{
    children:ReactNode,
    formTitle:string
}
export const ModalFormLayout:FC<Props> = ({children,formTitle}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const {closeSideBar} = useSideBar();
  
  const closeModalContainer = (event:MouseEvent) =>{
    event.stopPropagation();
    
    if(event.target === modalRef.current){
      closeSideBar();
    }
  
  }
  return (
    <div ref={modalRef} className={layouts.modal_container} 
      onClick={(event:MouseEvent)=> closeModalContainer(event)}
      >
       <div className={layouts.modal_inner_form}>
       <h2 className={layouts.modal_title}>{formTitle}</h2>
        {children}
       </div>
       
    </div>
  )
}
