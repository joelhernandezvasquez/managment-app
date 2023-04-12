import { FC } from "react";
import { RenderBoardColumn } from "../RenderBoardColumn/RenderBoardColumn";
import { BoardTask } from "../../types/types";
import { v4 as uuidv4 } from 'uuid';
import style from '../../styles/dashboard.module.css';

interface Props{
  listOfBoardColumns: string [] | undefined,
  listOfTasks: BoardTask []
}

export const ShowBoardColumnList:FC <Props> = ({listOfBoardColumns,listOfTasks}) => {
  return ( 
    <ul className={style.grid_board_columns} style={{marginTop:'24px'}}>
     {listOfBoardColumns?.map((boardColumn)=>{
      return <RenderBoardColumn key={uuidv4()} columnName = {boardColumn} listOfTasks={listOfTasks}/>
     })}
    </ul>
  )
}
