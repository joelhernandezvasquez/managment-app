import {FC,useMemo} from 'react'
import { BoardTask } from '../../types/types';
import { TaskCard } from '../TaskCard/TaskCard';
import { StatusTaskIndicator } from '../StatusTaskIndicator/StatusTaskIndicator';
import style from '../../styles/dashboard.module.css';
import share from '../../styles/share.module.css';

interface Props{
    columnName:string,
    listOfTasks :BoardTask []
}

export const RenderBoardColumn:FC <Props> = ({columnName,listOfTasks}) => {
  
 const listOfTasksByStatus = useMemo(()=> {
   return listOfTasks.filter((task)=> task.status === columnName)
 },[listOfTasks])

 return (
    <li className={style.board_column}>
       
       <p className={`${style.board_column_name} ${share.d_flex} ${share.d_align_flex_center}`}>
        <StatusTaskIndicator status={columnName}/>
        {columnName} ({listOfTasksByStatus.length})
      
       </p>
      
       
       <ul>
        {listOfTasksByStatus.map((task) =>{
            return <TaskCard key={task._id} task = {task}/>
        })}
       </ul>
    </li>
  )
}
