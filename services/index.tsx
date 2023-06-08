
import { kanbanApi } from "../api/kanbanApi";
import {mapNamesOfBoards} from '../helpers';
import { BoardNamesListResponse,BoardListResponse, TaskSubstaskUpdate,SuccessResponse, BoardTask,BoardListServerResponse} from "../types/types";


export const fetchAllBoards = async ():Promise<BoardListServerResponse> =>{
    try{
       const {data} = await kanbanApi.get('/board/getBoards');
       return data;
    }
    catch(error){
     console.log(error)
     let message
     if (error instanceof Error) 
      message = error.message
     else message = String(error)
   
     return Promise.reject(new Error(message))
    }
   }

   export const fetchNamesOfBoards = async (userId:string):Promise<BoardNamesListResponse>=>{
    
    try{
       
        const {data} = await kanbanApi.post('/board/names',{userId});
        const boardNames = mapNamesOfBoards(data);
       
          return{
            success:true,
            board_names:boardNames
           } 
      }
      catch(error){
        console.log(error)
        let message
        if (error instanceof Error) 
         message = error.message
        else message = String(error)
  
        return Promise.reject(new Error(message))
       
      }
  }

  export const fetchBoardById = async (id:string):Promise<BoardListResponse> =>{
    console.log(id);
    try{
       const {data} = await kanbanApi.post('/board/getBoard',{id});
       
       return{
         board_name:data.name,
         board_columns:data.columns,
         board_tasks:data.tasks
       }
    }
    catch(error){
      console.error(error)
      let message
      if (error instanceof Error) 
       message = error.message
      else message = String(error)
  
      return Promise.reject(new Error(message))
     
    }
  }

  export const updateSubstasks = async (updatedTaskSubtask:TaskSubstaskUpdate,boardId:string):Promise<TaskSubstaskUpdate> =>{

    const {taskId,substask} = updatedTaskSubtask;
  
    try{
     const {data}= await kanbanApi.put(`/board/substask/${boardId}`,{taskId:taskId,substask:substask});
     return data;
    }
    catch(error){
      console.error(error)
      let message
      if (error instanceof Error) 
       message = error.message
      else message = String(error)
  
      return Promise.reject(new Error(message))
    }
    
  }
  
  export const deleteTask = async(boardId:string,taskId:string):Promise<SuccessResponse> =>{
    try{
      const {data}= await kanbanApi.delete(`/board/task/${boardId}?taskId=${taskId}`);
      return data;
    }
    catch(error){
      console.error(error)
      let message
      if (error instanceof Error) 
       message = error.message
      else message = String(error)
  
      return Promise.reject(new Error(message))
    }
  }
  
  export const updateTask = async(boardId:string,task:BoardTask):Promise<SuccessResponse> =>{
  
    const {_id,name,description,substasks,status} = task;
    try{
      const {data} = await kanbanApi.put(`/board/update/task/${boardId}`,{_id:_id,name:name,description:description,substasks:substasks,status:status});
      return data;
    }
    catch(error) {
      let message
      if (error instanceof Error) 
       message = error.message
      else message = String(error)
  
      return Promise.reject(new Error(message))
    }
  }