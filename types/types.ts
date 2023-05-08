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
  board_columns: string [],
  board_tasks: BoardTask []
}

export interface BoardResponse {
  _id:string,
  name:string,
  columns: string [],
  tasks: BoardTask [],
  user:string
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
  status:string,
  _id?:string 
 }
 export interface SubsTask{
  _id:string,
  name:string,
  complete:boolean
 }

 export interface Task{
  taskTitle:string,
  taskDescription:string
}

export interface TaskProp{
  task:BoardTask 
}

export interface TaskSubstaskUpdate  
{
  taskId:string,
 substask:SubsTask
}

export type StatusIndicator = {
  [key: string]: string;
  todo: string,
  doing: string,
  done: string,
  unknown: string
};

export type TaskDeleteResponse =  {
  success:boolean,
  message:string
}






  