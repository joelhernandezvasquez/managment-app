import {FC,ReactNode} from 'react';
import share from '../../styles/share.module.css';

interface Props{
    children:ReactNode
}

export const ErrorMessage:FC<Props>= ({children}) => {
  return (
    <aside>
     <p className={share.errorMessage}>{children}</p>
    </aside>
  )
}
