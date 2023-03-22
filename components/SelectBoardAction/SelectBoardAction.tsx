import {FC} from 'react';
import { ModalFormLayout } from "../Layout/ModalFormLayout"
import { DeleteBoard } from '../DeleteBoard/DeleteBoard';
import { UpdateBoard } from '../UpdateBoard/UpdateBoard';
interface Props{
    boardAction:string
}
export const SelectBoardAction:FC <Props> = ({boardAction}) => {
  
  return (
    
    <ModalFormLayout formTitle={ boardAction==='delete'? `${boardAction} this board?`: `${boardAction} board`}
    formTitleColor = {boardAction === 'delete' ? '#EA5555':''}
    >
      {
        boardAction === 'delete' ? <DeleteBoard/>: <UpdateBoard/>
      }
   </ModalFormLayout>
  
  )
}
