import { FormEvent } from "react";
import {useBoard, useHelper, useTask, useUIStates,useUpdateBoard} from "../../hooks";
import useSubstasks from '../../hooks/useSubstasks';
import { RenderInputList } from "../RenderInputList/RenderInputList";
import layout from "../../styles/layouts.module.css";
import button from '../../styles/buttons/buttons.module.css';
import share from '../../styles/share.module.css';
import { mappedBoardInputs } from "../../helpers";


export const UpdateBoard = () => {

   const {updateBoardMutation} = useBoard();
   const {areSubtasksValid} = useTask();
   const {getActiveBoard,closeBoardMenuWindow} = useUIStates();
   const {cacheBoardData,boardNameInput,updateBoardNameInput} = useUpdateBoard();
   const {substaskList,addSubstaskToList,updateSubstaskToList,deleteSubstaskFromList} = useSubstasks(mappedBoardInputs(cacheBoardData?.board_columns ?? []));
   const {hasFormBeenSubmitted,modifyFormSubmissionState} = useHelper();
   
  
  const onSubmitUpdateBoardForm = (event:FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    modifyFormSubmissionState(true);

    if(boardNameInput !=='' && areSubtasksValid(substaskList)){
       modifyFormSubmissionState(false);
  
       updateBoardMutation.mutate(
          { 
            board:{boardName:boardNameInput,boardColumns:substaskList},
             boardId:getActiveBoard()._id
          })
        
          closeBoardMenuWindow();
      return;
    }
  }

  return (
   <form className={layout.modal_form} onSubmit={onSubmitUpdateBoardForm}>
    <div className={`${share.d_flex} ${share.d_flex_col} ${share.form_field} `}>
    <label className={share.label}>
      Board Name</label>
      <input
        className={`${share.primary_input} ${share.d_flex_grow} ${hasFormBeenSubmitted && boardNameInput==='' && share.invalid_input}`}
        type = "text"
        id="boardName"
        name="boardName"
        value={boardNameInput}
        onChange = {updateBoardNameInput}
        placeholder = {boardNameInput ==='' ? "cannot be empty":"e.g. Web Design"}
     />
    </div>
    
       <RenderInputList 
       listName={'Board Columns'} 
       buttonName={"Add New Column"}
       listOfInputs={substaskList}
       addInputToList={addSubstaskToList}
       updateInputToList={updateSubstaskToList}
       deleteInputFromList={deleteSubstaskFromList}
       formSent = {hasFormBeenSubmitted}
       />
  
    <button className={`${button.btn_primary} ${button.auth_submit_btn}`} type="submit">
     Save Changes
    </button>
   </form>
  )
}
