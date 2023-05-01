import {FC,useMemo} from 'react'
import { useBoardContext} from "../../hooks";
import { TaskCard } from '../TaskCard/TaskCard';
import { StatusTaskIndicator } from '../StatusTaskIndicator/StatusTaskIndicator';
import style from '../../styles/dashboard.module.css';
import share from '../../styles/share.module.css';
import { BoardTask } from '../../types/types';

interface Props{
    columnName:string,
    tasks:BoardTask []
}

export const RenderBoardColumn:FC <Props> = ({columnName,tasks}) => {
 
const listOfTasksByStatus = useMemo(()=> {
  return tasks.filter((task)=> task.status === columnName)
},[tasks,columnName])

 return (
    <li className={style.board_column}>
       
       <p className={`${style.board_column_name} ${share.d_flex} ${share.d_align_flex_center}`}>
        <StatusTaskIndicator status={columnName}/>
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
