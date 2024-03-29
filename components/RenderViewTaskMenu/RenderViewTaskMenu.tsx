import { FC, useState} from 'react';
import {DeleteTask} from '../DeleteTask/DeleteTask';
import { EditTask } from '../EditTask/EditTask';
import { Modal } from '../Modal/Modal';
import { taskMenu,DELETE_TASK} from '../../constants';
import navigation from '../../styles/navigation.module.css';

interface Props{
  closeModal:()=> void;
}

const RenderViewTaskMenu:FC<Props> = ({closeModal}) => {

  const [openModal,setOpenModal] = useState(false);
  const [action,setAction] = useState('');

  const handleOpenModal = (action:string) =>{
    setOpenModal(!openModal);
    setAction(action);
  }

  return (
    <aside className={navigation.active_task_menu} onClick={(e) => e.stopPropagation()}>
    <ul>
      {
        taskMenu.map(({id,item,action})=>{
          return <li key={id} onClick={()=> handleOpenModal(action)}>{item}</li>
        })
      }
    </ul>
    {openModal && (
       <Modal taskAction= {action} closeModal={closeModal} > 
      { action === DELETE_TASK ? <DeleteTask closeWindow={closeModal}/> : <EditTask closeWindow = {closeModal}/>} 
       </Modal>)
    }
  </aside>
  )
}

export default RenderViewTaskMenu