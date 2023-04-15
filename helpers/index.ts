
import { kanbanApi } from "../api/kanbanApi";
import Swal from "sweetalert2";
import { BoardNamesListResponse,BoardName,BoardListResponse, BoardInput,Status, BoardResponse, Board} from "../types/types";
import { v4 as uuidv4 } from 'uuid';

export const isValidForm = (fields:any):boolean =>{
 
 const formFields = Object.values(fields);
 return formFields.every((field:any)=> field.length > 0)
    
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
    console.error(error)
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
    timer: 1500
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