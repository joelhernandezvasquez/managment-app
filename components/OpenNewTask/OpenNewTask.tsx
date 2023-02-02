import button from '../../styles/buttons/buttons.module.css';

export const OpenNewTask = () => {
  return (
   <button className={`${button.btn_primary} ${button.add_task_btn}`}>
    <span>+</span>
  </button>
  )
}
