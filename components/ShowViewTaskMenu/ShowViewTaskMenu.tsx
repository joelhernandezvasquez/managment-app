import { useModal } from '../../hooks';
import navigation from '../../styles/navigation.module.css';
import dashboard from '../../styles/dashboard.module.css';

const ShowViewTaskMenu = () => {
 const {isModalOpen,toggleModal} = useModal();
 
  return (
    <div className={navigation.show_board_menu} onClick={toggleModal}>
      
    <span className={navigation.show_board_menu_button}></span>
    <span className={navigation.show_board_menu_button}></span>
    <span className={navigation.show_board_menu_button}></span>
  
   {isModalOpen && 
    <aside className={navigation.active_board_menu}>
      <ul>
        <li>Edit Task</li>
        <li> Delete Task</li>
      </ul>
    </aside>
}
</div>
  )
}

export default ShowViewTaskMenu