import { FC,DragEvent } from "react";
import { ShowTotalSubstaskCompleted } from "../ShowTotalSubstasksCompleted/ShowTotalSubstaskCompleted";
import { useModal, useTask,useDragAndDrop } from "../../hooks";
import ViewTask from "../ViewTask/ViewTask";
import {TaskProp } from "../../types/types";
import style from '../../styles/dashboard.module.css';

export const TaskCard:FC <TaskProp>= ({task}) => {

  const {isModalOpen,toggleModal} = useModal();
  const {setCurrentTask,clearActiveTask} = useTask();
  const {startDraggingActive} = useDragAndDrop();

  const onToggleModal = () =>{
    setCurrentTask(task);
    toggleModal();
  }

  const onDragStart = (event:DragEvent) =>{
    event.dataTransfer.setData('text',task._id as string);
    startDraggingActive();
    setCurrentTask(task);
  }

  const onDragEnd = () =>{
  
  }

  return (
    <li className={style.task_card} 
        onClick={onToggleModal} 
        draggable
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        >
      <p className={style.task_name}>{task.name}</p>
      
      <ShowTotalSubstaskCompleted substasks={task.substasks}/>

      {isModalOpen && <ViewTask  closeViewTask = {toggleModal}/>}
     
    </li>
  )
}
