import {FC, ReactNode}from 'react';
import ReactDom from 'react-dom';
import { ModalFormLayout } from '../Layout/ModalFormLayout';
import {Plus_Jakarta_Sans} from '@next/font/google';
import { DELETE_TASK, EDIT_TASK } from '../../helpers';


const plusJakartaSans = Plus_Jakarta_Sans({
    subsets:['latin'],
    weight:['400','500','700']
  })
interface Props{
    children:ReactNode,
    taskAction:string,
    closeModal:() => void
  
}

export const Modal:FC<Props>= ({children,taskAction,closeModal}) => {

    return ReactDom.createPortal (
        <aside className={plusJakartaSans.className}>
            <ModalFormLayout closeModal={closeModal}  formTitle={`${taskAction === EDIT_TASK ? 'Edit Task': 'Delete this Task?'}`} formTitleColor={taskAction === DELETE_TASK ? "#EA5555" : ""}>
                {children}
            </ModalFormLayout>
        </aside>,
     document.querySelector("#modal")!
  )
}
