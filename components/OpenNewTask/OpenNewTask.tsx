import {useUIStates } from '../../hooks';
import { ModalFormLayout } from '../Layout/ModalFormLayout';
import { AddNewTask } from '../AddNewTask/AddNewTask';
import button from '../../styles/buttons/buttons.module.css';

export const OpenNewTask = () => {

  const {isBoardMenuCurrentlyOpen,onToogleBoardMenu} = useUIStates();
  
  return (
    <>
    <button 
    className={`${button.btn_primary} ${button.add_task_btn}`}
    onClick={onToogleBoardMenu}
    >
       <span>+</span>
    </button>

      {isBoardMenuCurrentlyOpen() && (
        <ModalFormLayout formTitle='Add New Task'>
           <AddNewTask/>
        </ModalFormLayout>
      )}
  </>
  )
}
