
import {FC} from 'react';
import dashboard from '../../styles/dashboard.module.css';
import button from '../../styles/buttons/buttons.module.css';

interface Props{
  closeWindow: () => void;
  taskName:string
}

export const DeleteTask:FC<Props> = ({closeWindow,taskName}) => {
 
  return (
    <section>
    <p className={dashboard.prompt2}>{`Are you sure you want to delete the ‘${taskName}’  task and its substasks? 
      This action cannot be reversed.`}
   </p>
   <button className={button.delete_button}>Delete</button>
   <button className={button.input_list_btn} onClick={closeWindow}> Cancel </button>
  </section>
  )
}
