import { FC } from 'react';
import { useModal } from '../../hooks';
import navigation from '../../styles/navigation.module.css';
import RenderViewTaskMenu from '../RenderViewTaskMenu/RenderViewTaskMenu';
interface Props {
  taskName:string
}
const ShowViewTaskMenu:FC<Props> = ({taskName}) => {
 
  const {isModalOpen,toggleModal} = useModal();
 
  return (
    <div className={navigation.show_board_menu} onClick={() => toggleModal()}>
      
    <span className={navigation.show_board_menu_button}></span>
    <span className={navigation.show_board_menu_button}></span>
    <span className={navigation.show_board_menu_button}></span>
  
   {isModalOpen && 
    <RenderViewTaskMenu closeModal={toggleModal} taskName = {taskName}/>
   }
</div>
  )
}

export default ShowViewTaskMenu