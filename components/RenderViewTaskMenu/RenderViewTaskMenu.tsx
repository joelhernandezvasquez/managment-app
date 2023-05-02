
import navigation from '../../styles/navigation.module.css';

const RenderViewTaskMenu = () => {
  return (
    <aside className={navigation.active_board_menu}>
    <ul>
      <li>Edit Task</li>
      <li> Delete Task</li>
    </ul>
  </aside>
  )
}

export default RenderViewTaskMenu