
import { BoardNamesListResponse,BoardName,BoardInput,Status,SubsTask} from "../types/types";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from 'uuid';


export const isValidForm = (fields:any):boolean =>{
 const formFields = Object.values(fields);
 return formFields.every((field:any)=> field.length > 0)   
}

export const formIsValid = (fields:string []):boolean =>{
 return fields.every((field)=> field.length > 0);
}


export const mapNamesOfBoards = (data:BoardNamesListResponse) =>{
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



