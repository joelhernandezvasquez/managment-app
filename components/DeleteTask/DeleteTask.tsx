import {FC} from 'react';
import { useTask } from '../../hooks';
import dashboard from '../../styles/dashboard.module.css';
import button from '../../styles/buttons/buttons.module.css';

interface Props{
  closeWindow: () => void;
}

export const DeleteTask:FC<Props> = ({closeWindow}) => {
 const {deleteTaskMutation,getActiveTask} = useTask();

 const onDeleteTask = () =>{
  deleteTaskMutation.mutate(getActiveTask()._id!);
 }
  return (
    <section>
    <p className={dashboard.prompt}>{`Are you sure you want to delete the ‘${getActiveTask().name}’  task and its substasks? 
      This action cannot be reversed.`}
   </p>

   <div className={button.group_flex_btn}>
      <button className={button.delete_button} onClick={onDeleteTask}>Delete</button>
      <button className={button.input_list_btn} onClick={closeWindow}> Cancel </button>
   </div>
   
  </section>
  )
}
