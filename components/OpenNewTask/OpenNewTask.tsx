import {useModal} from '../../hooks';
import { ModalFormLayout } from '../Layout/ModalFormLayout';
import { AddNewTask } from '../AddNewTask/AddNewTask';
import button from '../../styles/buttons/buttons.module.css';

export const OpenNewTask = () => {
  const {isModalOpen,toggleModal} = useModal()

  return (
    <>
    <button 
    className={`${button.btn_primary} ${button.add_task_btn}`}
    onClick={toggleModal}
    >
       <span>+</span>
       <span className={button.add_task_btn_text}>Add New Task</span>
    </button>

      {isModalOpen && (
        <ModalFormLayout formTitle='Add New Task' closeModal={toggleModal}>
           <AddNewTask closeWindow = {toggleModal}/>
        </ModalFormLayout>
      )}
  </>
  )
}
