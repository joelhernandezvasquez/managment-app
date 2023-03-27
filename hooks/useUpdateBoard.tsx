import {useState,useEffect,ChangeEvent} from 'react';
import { useFetchBoard,useInputList } from './index'

export const useUpdateBoard = () => {
    
    const [boardNameInput,setBoardNameInput] = useState('');
    const [isUpdateBoardFormSubmitted,setIsUpdateBoardFormSubmitted] = useState(false);
    const {board_columns,board_name,isLoading,isSuccess} = useFetchBoard();
    const {insertEntireInputList} = useInputList();

    useEffect(()=>{
        if(isSuccess){
         insertEntireInputList(board_columns);
         handleUpdateNameinput(board_name);
        }
       },[isSuccess])


   const handleUpdateNameinput = (inputValue:string)=>{
    setBoardNameInput(inputValue);
   }

    const updateBoardNameInput = ({target}:ChangeEvent<HTMLInputElement>):void =>{
        setBoardNameInput(target.value);
      }

      const handleUpdateBoardFormSubmitted = (formState:boolean) =>{
        setIsUpdateBoardFormSubmitted(formState);
      }

      return{
        boardNameInput,
        isUpdateBoardFormSubmitted,
        isBoardDataLoading:isLoading,
        updateBoardNameInput,
        handleUpdateNameinput,
        handleUpdateBoardFormSubmitted
      }

    
}
    
