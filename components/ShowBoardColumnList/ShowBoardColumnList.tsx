import { FC } from "react";
import { RenderBoardColumn } from "../RenderBoardColumn/RenderBoardColumn";
import { BoardListResponse} from "../../types/types";
import { v4 as uuidv4 } from 'uuid';
import style from '../../styles/dashboard.module.css';
interface Props{
  board:BoardListResponse
}

export const ShowBoardColumnList:FC <Props> = ({board}) => {
  
  return ( 
    <ul className={style.grid_board_columns} style={{marginTop:'24px'}}>
     {board?.board_columns.map((boardColumn)=>{
      return <RenderBoardColumn key={uuidv4()} columnName = {boardColumn} tasks = {board?.board_tasks}/>
     })}
    </ul>
  )
}
