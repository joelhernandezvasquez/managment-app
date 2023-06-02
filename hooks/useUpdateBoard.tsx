import {useState,useEffect,ChangeEvent} from 'react';
import { useUIStates } from './index';
import {useQueryClient} from '@tanstack/react-query';
import { BoardListResponse } from '../types/types';


export const useUpdateBoard = () => {
    
    const queryClient = useQueryClient();
    const {getActiveBoard} = useUIStates();
    const cacheBoardData = queryClient.getQueryData<BoardListResponse>(["getBoard",getActiveBoard()._id]);
    const [boardNameInput,setBoardNameInput] = useState('');
    const [isUpdateBoardFormSubmitted,setIsUpdateBoardFormSubmitted] = useState(false);
 

    useEffect(()=>{
        if(cacheBoardData){
        handleUpdateNameinput( cacheBoardData?.board_name);
        }
       },[ cacheBoardData?.board_name])


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
        updateBoardNameInput,
        handleUpdateNameinput,
        handleUpdateBoardFormSubmitted,
        cacheBoardData
      }

    
}
    
