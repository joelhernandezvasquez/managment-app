import { useEffect,ChangeEvent, useState,FormEvent } from "react";
import {useBoard, useFetchBoard, useInputList, useUIStates} from "../../hooks";
import { CreateInputList } from "../CreateInputsLists/CreateInputList";
import layout from "../../styles/layouts.module.css";
import button from '../../styles/buttons/buttons.module.css';
import share from '../../styles/share.module.css';

export const UpdateBoard = () => {

   const {updateBoardMutation} =useBoard();
   const {getActiveBoard,closeBoardMenuWindow} = useUIStates();
   const {insertEntireInputList,listInput,areInputListItemsValid,updateIsCurrentInputEmpty} = useInputList();
   const {board_columns,board_name,isLoading,isSuccess} = useFetchBoard();
   const [boardNameInput,setBoardNameInput] = useState('');
   const [isFormSubmitted,setIsFormSubmitted] = useState(false);
   
   useEffect(()=>{
    if(isSuccess){
     insertEntireInputList(board_columns);
     setBoardNameInput(board_name);
    }
   },[isSuccess])

  if(isLoading) return;

  const updateBoardNameInput = ({target}:ChangeEvent<HTMLInputElement>):void =>{
    setBoardNameInput(target.value);
  }

  const onSubmitUpdateBoardForm = (event:FormEvent<HTMLFormElement>) =>{
    event.preventDefault();

    if(boardNameInput !=='' && areInputListItemsValid()){
        setIsFormSubmitted(false);
        updateBoardMutation.mutate(
          { 
            board:{boardName:boardNameInput,boardColumns:listInput},
             boardId:getActiveBoard()._id
          }
          )
       closeBoardMenuWindow();
      return;
    }
    setIsFormSubmitted(true);
    updateIsCurrentInputEmpty(true);

  }

  return (
   <form className={layout.modal_form} onSubmit={onSubmitUpdateBoardForm}>
    <div className={`${share.d_flex} ${share.d_flex_col} ${share.form_field} `}>
    <label className={share.label}>
      Board Name</label>
      <input
        className={`${share.primary_input} ${share.d_flex_grow} ${isFormSubmitted && boardNameInput==='' && share.invalid_input}`}
        type = "text"
        id="boardName"
        name="boardName"
        value={boardNameInput}
        onChange = {updateBoardNameInput}
        placeholder = {boardNameInput ==='' ? "cannot be empty":"e.g. Web Design"}
     />
    </div>
    
      <CreateInputList 
     listName={'Board Columns'} 
     buttonName={"Add New Column"}
     />
    
    <button className={`${button.btn_primary} ${button.auth_submit_btn}`} type="submit">
     Save Changes
    </button>
   </form>
  )
}
