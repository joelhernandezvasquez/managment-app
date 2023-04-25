import { FC } from "react";
import { useModal } from "../../hooks";
import ViewTask from "../ViewTask/ViewTask";
import {TaskProp } from "../../types/types";
import style from '../../styles/dashboard.module.css';

export const TaskCard:FC <TaskProp>= ({task}) => {

  const {isModalOpen,toggleModal} = useModal();
  
  return (
    <li className={style.task_card} onClick={toggleModal}>
      <p className={style.task_name}>{task.name}</p>
      <span className={style.task_substask_count}>0 of {task.substasks.length} substasks</span>
     
     {isModalOpen && <ViewTask task={task}/>}
     
    </li>
  )
}
