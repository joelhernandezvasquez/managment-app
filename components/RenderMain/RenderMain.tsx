
import { ShowBoardColumnList } from "../ShowBoardColumnList/ShowBoardColumnList";
import {MaxWidthWrapper} from "../MaxWidthWrapper/MaxWidthWrapper";
import { EmptyBoard } from "../EmptyBoard/EmptyBoard"
import { useFetchBoard } from "../../hooks"


export const RenderMain = () => {
const {board_columns,board_tasks} = useFetchBoard();
 
  return (
    <MaxWidthWrapper>
      { 
            board_tasks?.length !==undefined && board_tasks.length > 0 ? (
            <ShowBoardColumnList listOfBoardColumns={board_columns} 
             listOfTasks = {board_tasks}
             />
             )
             :  
             <EmptyBoard/> 
      }
    </MaxWidthWrapper>
  )
}
