import { FC } from 'react';
import { useModal } from '../../hooks';
import navigation from '../../styles/navigation.module.css';
import RenderViewTaskMenu from '../RenderViewTaskMenu/RenderViewTaskMenu';
import { BoardTask } from '../../types/types';
interface Props {
  task:BoardTask
}
const ShowViewTaskMenu:FC<Props> = ({task}) => {
 
  const {isModalOpen,toggleModal} = useModal();
 
  return (
    <div className={navigation.show_board_menu} onClick={() => toggleModal()}>
      
    <span className={navigation.show_board_menu_button}></span>
    <span className={navigation.show_board_menu_button}></span>
    <span className={navigation.show_board_menu_button}></span>
  
   {isModalOpen && 
    <RenderViewTaskMenu closeModal={toggleModal} task = {task}/>
   }
</div>
  )
}

export default ShowViewTaskMenu