import { FC } from "react";
import { BoardTask } from "../../types/types";
import style from '../../styles/dashboard.module.css';

interface TaskProp{
    task:BoardTask 
}

export const TaskCard:FC <TaskProp>= ({task}) => {
  return (
    <li className={style.task_card}>
      <p className={style.task_name}>{task.name}</p>
      <span className={style.task_substask_count}>0 of {task.substasks.length} substasks</span>
    </li>
  )
}
