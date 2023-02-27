import {FC,ReactNode} from 'react'
import layouts from '../../styles/layouts.module.css';

interface Props{
    children:ReactNode,
    formTitle:string
}
export const ModalFormLayout:FC<Props> = ({children,formTitle}) => {
return (
    <div className={layouts.modal_container} onClick={(event)=> event.stopPropagation()}>
       <div className={layouts.modal_inner_form}>
       <h2 className={layouts.modal_title}>{formTitle}</h2>
        {children}
       </div>
       
    </div>
  )
}
