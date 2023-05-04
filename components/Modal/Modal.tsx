import {FC, ReactNode}from 'react';
import ReactDom from 'react-dom';
import { ModalFormLayout } from '../Layout/ModalFormLayout';

interface Props{
    children:ReactNode,
}

export const Modal:FC<Props>= ({children}) => {

    return ReactDom.createPortal (
        <aside>
            <ModalFormLayout formTitle='Delete this Task?' formTitleColor="#EA5555">
                {children}
            </ModalFormLayout>
        </aside>,
     document.querySelector("#modal")!
  )
}
