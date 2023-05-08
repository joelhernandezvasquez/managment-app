import { FC } from "react";
import { ShowTotalSubstaskCompleted } from "../ShowTotalSubstasksCompleted/ShowTotalSubstaskCompleted";
import { useModal, useTask } from "../../hooks";
import ViewTask from "../ViewTask/ViewTask";
import {TaskProp } from "../../types/types";
import style from '../../styles/dashboard.module.css';

export const TaskCard:FC <TaskProp>= ({task}) => {

  const {isModalOpen,toggleModal} = useModal();
  const {setCurrentTask} = useTask();

  const onToggleModal = () =>{
    setCurrentTask(task)
    toggleModal();
  }

  return (
    <li className={style.task_card} onClick={onToggleModal}>
      <p className={style.task_name}>{task.name}</p>
      
      <ShowTotalSubstaskCompleted substasks={task.substasks}/>

      {isModalOpen && <ViewTask  closeViewTask = {toggleModal}/>}
     
    </li>
  )
}
