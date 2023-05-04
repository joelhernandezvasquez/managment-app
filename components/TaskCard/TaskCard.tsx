import { FC } from "react";
import { ShowTotalSubstaskCompleted } from "../ShowTotalSubstasksCompleted/ShowTotalSubstaskCompleted";
import { useModal } from "../../hooks";
import ViewTask from "../ViewTask/ViewTask";
import {TaskProp } from "../../types/types";
import style from '../../styles/dashboard.module.css';

export const TaskCard:FC <TaskProp>= ({task}) => {

  const {isModalOpen,toggleModal} = useModal();

  return (
    <li className={style.task_card} onClick={toggleModal}>
      <p className={style.task_name}>{task.name}</p>
      
      <ShowTotalSubstaskCompleted substasks={task.substasks}/>

      {isModalOpen && <ViewTask task={task} closeViewTask = {toggleModal}/>}
     
    </li>
  )
}
