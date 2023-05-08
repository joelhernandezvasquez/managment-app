
import {FC} from 'react';
import { useTask } from '../../hooks';
import dashboard from '../../styles/dashboard.module.css';
import button from '../../styles/buttons/buttons.module.css';
import { BoardTask } from '../../types/types';

interface Props{
  closeWindow: () => void;
  task:BoardTask
}

export const DeleteTask:FC<Props> = ({closeWindow,task}) => {
 const {deleteTaskMutation} = useTask();

 const onDeleteTask = () =>{
  deleteTaskMutation.mutate(task._id!);
 }

  return (
    <section>
    <p className={dashboard.prompt2}>{`Are you sure you want to delete the ‘${task.name}’  task and its substasks? 
      This action cannot be reversed.`}
   </p>
   <button className={button.delete_button} onClick={onDeleteTask}>Delete</button>
   <button className={button.input_list_btn} onClick={closeWindow}> Cancel </button>
  </section>
  )
}
