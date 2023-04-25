import { ShowBoardColumnList } from "../ShowBoardColumnList/ShowBoardColumnList";
import {MaxWidthWrapper} from "../MaxWidthWrapper/MaxWidthWrapper";
import { EmptyBoard } from "../EmptyBoard/EmptyBoard"
import { useBoardContext, useFetchBoard} from "../../hooks";

export const RenderMain = () => {

 const {board,board_tasks,board_columns,isLoading} = useFetchBoard();

 if(isLoading) return <p>Loading...</p>

 return (
    <MaxWidthWrapper>
     {
            board_tasks?.length ?? 0 > 0 ? (
            <ShowBoardColumnList
             board = {board}
             />
             )
             :  
             <EmptyBoard/> 
      }  
    </MaxWidthWrapper>
  )
}
