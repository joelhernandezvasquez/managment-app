import {FC,DragEvent} from 'react'
import { useDragAndDrop, useTask } from '../../hooks';
import { TaskCard } from '../TaskCard/TaskCard';
import { BoardTask } from '../../types/types';
import style from '../../styles/dashboard.module.css';
import share from '../../styles/share.module.css';

interface PropsRenderBoard{
    columnName:string,
    tasks:BoardTask []
}

export const RenderBoardColumn:FC <PropsRenderBoard> = ({columnName,tasks}) => {
 
  const {getListOfTasksByStatus,getActiveTask,updateTaskMutation} = useTask();
  const listOfTasksByStatus = getListOfTasksByStatus(tasks,columnName);
  const {isDraggingActive,endDraggingActive} = useDragAndDrop()
  

  const onDropEntry = (event:DragEvent<HTMLLIElement>) =>{
   const id = event.dataTransfer.getData('text');
    const {name,description,substasks} = getActiveTask();
   
    updateTaskMutation.mutate({
    _id:id,
    name,
    description,
    substasks,
    status:columnName
   })
   endDraggingActive();
  }

  const allowDrop = (event:DragEvent<HTMLLIElement>) =>{
   event.preventDefault();
  }

 return (
    <li className={`${style.board_column} ${isDraggingActive() ? style.isDraggingTask :''}`}
     onDrop={onDropEntry}
     onDragOver={allowDrop}
    >
       
       <p className={`${style.board_column_name} ${share.d_flex} ${share.d_align_flex_center}`}>
      
        {columnName} ({listOfTasksByStatus?.length})
      </p>
      
       <ul>
        {listOfTasksByStatus?.map((task) =>{
            return <TaskCard key={task._id} task = {task}/>
        })}
       </ul>
    </li>
  )
}
