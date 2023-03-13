import {FC} from 'react';
import { DeleteBoard } from '../DeleteBoard/DeleteBoard';
import { ModalFormLayout } from "../Layout/ModalFormLayout"

interface Props{
    boardAction:string
}
export const SelectBoardAction:FC <Props> = ({boardAction}) => {
  
  return (
    <ModalFormLayout formTitle={ boardAction==='delete'? `${boardAction} this board?`: `${boardAction} this board`}
    formTitleColor = {boardAction === 'delete' ? '#EA5555':''}
    >
      {
        boardAction === 'delete' ? <DeleteBoard/>: <h1>Edit</h1>
      }
   </ModalFormLayout>
  )
}
