import { ShowBoardColumnList } from "../ShowBoardColumnList/ShowBoardColumnList";
import {MaxWidthWrapper} from "../MaxWidthWrapper/MaxWidthWrapper";
import { EmptyBoard } from "../EmptyBoard/EmptyBoard"
import { useBoardContext} from "../../hooks";

export const RenderMain = () => {

 const {getBoardById} = useBoardContext();
 
 return (
    <MaxWidthWrapper>
     {
            getBoardById?.tasks?.length ?? 0 > 0 ? (
            <ShowBoardColumnList
             listOfBoardColumns={getBoardById?.columns ?? []} 
             />
             )
             :  
             <EmptyBoard/> 
      }  
    </MaxWidthWrapper>
  )
}
