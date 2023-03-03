
import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '../store/store';
import {kanbanApi} from '../api/kanbanApi';
import { fetchNamesOfBoards,notifySuccessAlert,notifyErrorAlert } from '../helpers';
import { Board } from '../types/types';

export const useBoard = () => {
    
const {user} = useAuthStore();
const {data,isLoading,isError,error} =  useQuery({queryKey:['boardNames'],queryFn:()=> fetchNamesOfBoards(user.uid)}) 

 const createBoard = async (board:Board) =>{
    const boardColumns =  mappedBoardColumns(board);
  try{
       await kanbanApi.post('/board/create',{name:board.boardName,columns:boardColumns,user:user.uid});
       notifySuccessAlert('Board has been saved');
    }
     catch(error){
       console.log(error);
       notifyErrorAlert('Board was not created, Please contact Admin');
     }
 }
 
 const mappedBoardColumns = (board:Board) =>{
   return board.boardColumns.map((board)=> board.column);
 }

return{
    ...data,
      data,
      error,
      isLoading,
      isError,
      createBoard
}
}
