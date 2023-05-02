import { useModal } from '../../hooks';
import navigation from '../../styles/navigation.module.css';
import RenderViewTaskMenu from '../RenderViewTaskMenu/RenderViewTaskMenu';

const ShowViewTaskMenu = () => {
 const {isModalOpen,toggleModal} = useModal();
 
  return (
    <div className={navigation.show_board_menu} onClick={toggleModal}>
      
    <span className={navigation.show_board_menu_button}></span>
    <span className={navigation.show_board_menu_button}></span>
    <span className={navigation.show_board_menu_button}></span>
  
   {isModalOpen && 
    <RenderViewTaskMenu/>
   }
</div>
  )
}

export default ShowViewTaskMenu