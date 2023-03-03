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
    id:string,
    name:string,
    onChangeHandler:({target}:ChangeEvent<HTMLInputElement>) => void
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






  