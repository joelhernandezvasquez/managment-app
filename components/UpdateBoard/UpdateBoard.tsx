
import { useEffect,ChangeEvent, useState } from "react";
import {useFetchBoard, useInputList} from "../../hooks";
import { CreateInputList } from "../CreateInputsLists/CreateInputList";
import layout from "../../styles/layouts.module.css";
import button from '../../styles/buttons/buttons.module.css';
import share from '../../styles/share.module.css';

export const UpdateBoard = () => {

   const {insertEntireInputList} = useInputList();
   const {board_columns,board_name,isLoading,isSuccess} = useFetchBoard();
   const [boardNameInput,setBoardNameInput] = useState('');
   
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

  return (
   
   <form className={layout.modal_form}>
    <div className={`${share.d_flex} ${share.d_flex_col} ${share.form_field} `}>
    <label className={share.label}>
      Board Name</label>
      <input
       className={`${share.primary_input} ${share.d_flex_grow}`}
        type = "text"
        id="boardName"
        name="boardName"
        value={boardNameInput}
        onChange = {updateBoardNameInput}
        placeholder = "e.g. Web Design"
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
