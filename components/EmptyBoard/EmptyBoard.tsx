import { useModal } from '../../hooks';
import { ModalFormLayout } from '../Layout/ModalFormLayout';
import button from '../../styles/buttons/buttons.module.css';
import style from '../../styles/dashboard.module.css';
import { AddNewTask } from '../AddNewTask/AddNewTask';

export const EmptyBoard = () => {

  const {isModalOpen,toggleModal} = useModal();

  return (
    <div className={style.empty_board}>
       <p className={style.empty_board_message}>
         This board is empty. Create a new task to get started.
       </p>

       <button 
        className={`${button.btn_primary} ${button.add_column_btn}`}
        onClick = {toggleModal}
        >
        <span>+</span>
        Add task
       </button>
     
     {
      isModalOpen && (
        <ModalFormLayout formTitle='Add New Task'>
          <AddNewTask closeWindow={toggleModal}/>
        </ModalFormLayout>
      )
     }

    </div>
  )
}
