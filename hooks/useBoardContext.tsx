import {useMemo} from 'react';
import { BoardStore } from "../store"
import { BoardResponse, BoardTask } from '../types/types';
import { useUIStates } from "./useUIStates";

export const useBoardContext = () => {
 const {boards,addTaskToBoard} =  BoardStore();
 const {getActiveBoard} = useUIStates()
 
 const getBoardById = useMemo(() =>{
   return boards.find((board)=> board._id === getActiveBoard()._id); 
 },[getActiveBoard()._id,boards])


 const addTaskToBoardContext = (task:BoardTask) =>{
  
   const newBoard:BoardResponse = {
    _id:getBoardById?._id ?? '',
    name:getBoardById?.name ?? '',
    columns:getBoardById?.columns ?? [],
    tasks:[...getBoardById?.tasks ?? [],task],
    user:getBoardById?.user ??''
   }
  
   addTaskToBoard(newBoard);
 }


 return{
    ...boards,
    boards,

    getBoardById,
    addTaskToBoardContext
 }
}


