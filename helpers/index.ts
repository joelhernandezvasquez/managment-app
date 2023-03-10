
import { kanbanApi } from "../api/kanbanApi";
import Swal from "sweetalert2";
import { BoardNamesListResponse,BoardName} from "../types/types";

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

const mapNamesOfBoards = (data:BoardNamesListResponse) =>{
  return data.board_names.map((board:BoardName)=> board)
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
    timer: 2500
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