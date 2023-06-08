import { useModal } from '../../hooks';
import { ModalFormLayout } from '../Layout/ModalFormLayout';
import style from '../../styles/dashboard.module.css';
import button from '../../styles/buttons/buttons.module.css';
import { AddNewBoard } from '../AddNewBoard/AddNewBoard';

const DefaultScreen = () => {

    const {toggleModal,isModalOpen} = useModal();
  return (
    <div className={style.default_screen}>
    
    <h1>Welcome to Your TaskApp</h1>
    
    <p>
     Start organizing your tasks today. Click the button below to create your first board and get productive!
    </p>

    <button 
     className={`${button.btn_primary} ${button.add_column_btn}`}
     onClick = {toggleModal}
     >
    Create your first Board
    </button>
 
  {
   isModalOpen && (
     <ModalFormLayout formTitle='Add New Board' closeModal={toggleModal}>
       <AddNewBoard closeModal={toggleModal}/>
     </ModalFormLayout>
   )
  } 

 </div>
  )
}

export default DefaultScreen