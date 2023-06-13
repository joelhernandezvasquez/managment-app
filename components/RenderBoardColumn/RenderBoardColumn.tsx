import {FC} from 'react'
import { useTask } from '../../hooks';
import { TaskCard } from '../TaskCard/TaskCard';
import { BoardTask } from '../../types/types';
import style from '../../styles/dashboard.module.css';
import share from '../../styles/share.module.css';

interface PropsRenderBoard{
    columnName:string,
    tasks:BoardTask []
}

export const RenderBoardColumn:FC <PropsRenderBoard> = ({columnName,tasks}) => {
 
  const {getListOfTasksByStatus} = useTask();
  const listOfTasksByStatus = getListOfTasksByStatus(tasks,columnName);

 return (
    <li className={style.board_column}>
       
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
