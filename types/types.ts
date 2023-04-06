import { ChangeEvent } from 'react';
export interface FormData {
    email:string,
    password:string
  }

  export interface registerFormData {
    name:string
    email:string,
    password:string
  }
  export interface RequiredInputArgs {
    labelName:string,
    type:string,
    isTextArea?:boolean
    id:string,
    name:string,
    onChangeHandler:({target}:ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> ) => void
    fieldState:string,
    placeholderText?:string,
    isFormSubmitted:boolean
}

export interface user {
  email:string,
  password:string,
  name?:string,
 }

 export interface BoardNamesListResponse {
  success:          boolean;
  board_names: BoardName[];
}

export interface BoardName {
  _id:  string;
  name: string;
}

export interface BoardInputList{
  boardList: BoardInput []
}

export interface BoardInput{
  id:string,
  column:string
}

export interface Board{
  boardName:string,
  boardColumns: BoardInput []
}

export interface BoardListResponse {
  board_name:string,
  board_columns: string []
}

export interface StatusList {
  listOfStatus: Status []
 }
 
 export interface Status{
     id:string,
     status:string
 }

 export interface BoardTask{
  name:string,
  description:string,
  substasks: SubsTask [],
  status:string
 }
 export interface SubsTask{
  name:string,
  complete:boolean
 }

 export interface Task{
  taskTitle:string,
  taskDescription:string
}





  