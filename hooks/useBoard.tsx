import { useQuery,useMutation,useQueryClient} from '@tanstack/react-query';
import { useAuthStore} from '../store';
import { useUIStates } from './useUIStates';
import {kanbanApi} from '../api/kanbanApi';
import {notifySuccessAlert,notifyErrorAlert, fetchAllBoards} from '../helpers';
import { Board,BoardListServerResponse,BoardName} from '../types/types';

interface UpdatedBoard{
  board:Board, 
  boardId:string
}

export const useBoard = () => {
    
const {user} = useAuthStore();
const {data,isLoading,isError,error} = useQuery({queryKey:['boards'],queryFn:()=> fetchAllBoards()})
const {setActiveBoard} = useUIStates();
const queryClient = useQueryClient();

const createBoardMutation = useMutation({
  mutationFn:(board:Board) => {
    return createBoard(board)
  },
  onMutate: async (newBoard) => {
    const{boardName,boardColumns} = newBoard;
    await queryClient.cancelQueries(["boards"]);
    
    const previousData = queryClient.getQueryData<BoardListServerResponse>(["boards"]);

    if(previousData){
     queryClient.setQueryData(["boards"],{
      ...previousData,
    boards:[
     ...previousData.boards,
      {
        _id:'',
        name:boardName,
        columns:[...boardColumns],
        tasks:[],
        user:user.uid
      }
     ],
        })

    return { previousData }
  }
    },
   
   onError: (error, variables, context) => {
    if (context?.previousData) {
      queryClient.setQueryData(["boards"], context.previousData)
    }
  },
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey:["boards"] })
  },
  
})

const updateBoardMutation = useMutation({
  mutationFn:({board,boardId}:UpdatedBoard )=>{
    return updateBoard({board,boardId})
  }
})


const createBoard = async (board:Board) =>{

  try{
       const response = await kanbanApi.post('/board/create',{name:board.boardName,columns:mappedBoardColumns(board),user:user.uid});
       notifySuccessAlert('Board has been saved');
       return response.data;
    }
     catch(error:any){
       console.log(error);
       const {response} = error;
        
       if(response.status == 401){
          notifyErrorAlert(response.data.msg);
          return;
        }

       notifyErrorAlert('Board was not created, Please contact Admin');
     }
 }

 const updateBoard = async({board,boardId}:UpdatedBoard) =>{
  try{
       const response = await kanbanApi.put(`/board/${boardId}`,{name:board.boardName,columns:mappedBoardColumns(board)});
       notifySuccessAlert('Board has been updated');
       return response.data;
    }
     catch(error:any){
       console.error(error);
       const {response} = error;
       notifyErrorAlert(response.data.msg);
     }
 } 

 const switchToBackupBoard = ():BoardName =>{
  const boardsCache = queryClient.getQueryData<BoardListServerResponse>(["boards"]);
  const boardToSwitch = boardsCache?.boards[0];
  return {
    _id:boardToSwitch?._id ?? '',
    name:boardToSwitch?.name ?? ''
  }
 }

 const removeBoard = async(boardId:string) =>{
    
  try{
   await kanbanApi.delete(`/board/${boardId}`);
   setActiveBoard(switchToBackupBoard())
   notifySuccessAlert('Board has been deleted');
  }
    catch(error){
      console.log(error);
      notifyErrorAlert('Board was not deleted, Please contact Admin');
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
      createBoardMutation,
      updateBoardMutation,
      removeBoard
}
}
