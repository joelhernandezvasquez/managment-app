import {FC,useMemo} from 'react'
import { useBoardContext} from "../../hooks";
import { TaskCard } from '../TaskCard/TaskCard';
import { StatusTaskIndicator } from '../StatusTaskIndicator/StatusTaskIndicator';
import style from '../../styles/dashboard.module.css';
import share from '../../styles/share.module.css';

interface Props{
    columnName:string,
}

export const RenderBoardColumn:FC <Props> = ({columnName}) => {
  const {getBoardById} = useBoardContext();

  const listOfTasksByStatus = useMemo(()=> {
   return getBoardById?.tasks.filter((task)=> task.status === columnName)
 },[getBoardById?.tasks,columnName])


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
