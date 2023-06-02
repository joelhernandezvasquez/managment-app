
import {FormEvent,FC} from 'react'
import { useBoard, UseForm,useTask} from "../../hooks";
import useSubstasks from '../../hooks/useSubstasks';
import { RenderInputList } from '../RenderInputList/RenderInputList';
import FormFieldRequired from "../FormField/FormFieldRequired";
import { isValidForm} from '../../helpers';
import { v4 as uuidv4 } from 'uuid';
import layout from "../../styles/layouts.module.css";
import button from '../../styles/buttons/buttons.module.css';

interface Props{
 closeModal:() => void;
}
interface BoardProps{
  boardName:string,
}
const boardForm:BoardProps = {boardName:''}

export const AddNewBoard:FC <Props>= ({closeModal}) => {

  const {boardName,formSubmitted,setFormSubmitted,handleChange} = UseForm<BoardProps>(boardForm);
  const {substaskList,addSubstaskToList,updateSubstaskToList,deleteSubstaskFromList} = useSubstasks([{id:uuidv4(),column:''}]);
  const {areSubtasksValid} = useTask();
  const {createBoardMutation} = useBoard();
  
  const onSubmitBoardForm = (event:FormEvent<HTMLFormElement>) =>{
  event.preventDefault();
  setFormSubmitted(true);
  
  if(isValidForm({boardName}) &&  areSubtasksValid(substaskList)){
      setFormSubmitted(false);
      createBoardMutation.mutate({boardName:boardName,boardColumns:substaskList});
      closeModal();
      return;
    }
 }

  return (
    <form className={layout.modal_form} onSubmit={onSubmitBoardForm}>
     <FormFieldRequired
        labelName ={'Board Name'}
        type = "text"
        id="boardName"
        name="boardName"
        placeholderText = "e.g. Web Design"
        fieldState={boardName} 
        onChangeHandler = {handleChange}
        isFormSubmitted = {formSubmitted}
    />

     <RenderInputList
     listName={'Board Columns'} 
     buttonName={"Add New Column"}
     listOfInputs={substaskList}
     addInputToList={addSubstaskToList}
     updateInputToList={updateSubstaskToList}
     deleteInputFromList={deleteSubstaskFromList}
     formSent = {formSubmitted}
     />
   
    <button className={`${button.btn_primary} ${button.auth_submit_btn}`} type="submit">
     Create New Board
    </button>
    </form>
  )
}
