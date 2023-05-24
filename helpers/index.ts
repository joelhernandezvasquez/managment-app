
import { kanbanApi } from "../api/kanbanApi";
import Swal from "sweetalert2";
import { BoardNamesListResponse,BoardName,BoardListResponse, BoardInput,Status, TaskSubstaskUpdate,StatusIndicator,SuccessResponse,SubsTask, BoardTask} from "../types/types";
import { v4 as uuidv4 } from 'uuid';
import { BoardResponse } from "../types/types";


export const isValidForm = (fields:any):boolean =>{
 const formFields = Object.values(fields);
 return formFields.every((field:any)=> field.length > 0)
    
}

export const formIsValid = (fields:string []):boolean =>{
 return fields.every((field)=> field.length > 0);
}

export const fetchAllBoards = async ():Promise<BoardResponse []> =>{
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
  try{
     const {data} = await kanbanApi.post('/board/getBoard',{id});
     
     return{
       board_name:data.name,
       board_columns:data.columns,
       board_tasks:data.tasks
     }
  }
  catch(error){
    console.log('hi')
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

const mapNamesOfBoards = (data:BoardNamesListResponse) =>{
  return data.board_names.map((board:BoardName)=> board)
}

export const mappedBoardInputs = (inputList:string []):BoardInput [] =>{
  
 return inputList.map((input)=> {
    return{
      id:uuidv4(),
      column:input
    }
  })
  
}

export const mapSubtasksToBoardInputs= (substaskList:SubsTask []): BoardInput [] =>{
  
  return substaskList.map((substask)=> {
   return{
    id:uuidv4(),
    column:substask.name
  }
 })
}

export const mappedListOfStatus = (list: string [] | []):Status [] =>{
  
  return list.map((listItem)=>{
     return{
      id:uuidv4(),
      status:listItem
     }
  })
}



export const notifyErrorAlert = (errorMessage:string) =>{
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text:errorMessage
  })
}

export const notifySuccessAlert = (message:string) =>{
  Swal.fire({
    icon: 'success',
    title: 'Success',
    text:message,
    showConfirmButton: false,
    timer: 2000
  })
}

export const activeBoardItems = [
  {
  id:0,
  item:'Edit Board',
  action:'edit'
 },

 {
  id:1,
  item:'Delete Board',
  action:'delete'
 }

]

export const EDIT_TASK = 'update';
export const DELETE_TASK = 'delete'

export const taskMenu = [
  {
    id:uuidv4(),
    item:'Edit Task',
    action:EDIT_TASK
  },
  {
    id:uuidv4(),
    item:'Delete Task',
    action:DELETE_TASK
  }
]

export const listOfStatus = [
  {
    id:uuidv4(),
    status:'Todo'
  },
  {
    id:uuidv4(),
    status:'Doing'
  },
  {
    id:uuidv4(),
    status:'Done'
  },

]

export const statusIndicator:StatusIndicator= {
  todo:'#49C4E5',
  doing:'#8471F2',
  done:'#67E2AE',
  unknown:'#2E88C2'
}


