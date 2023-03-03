
import {FormEvent,FC} from 'react'
import { useBoard, UseForm,useInputList} from "../../hooks"
import { CreateInputList } from "../CreateInputsLists/CreateInputList";
import FormFieldRequired from "../FormField/FormFieldRequired";
import { isValidForm} from '../../helpers';
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
  const {listInput,areInputListItemsValid,updateIsCurrentInputEmpty,resetInputList} = useInputList();
  const {createBoard} = useBoard();
  
  const onSubmitBoardForm = (event:FormEvent<HTMLFormElement>) =>{
  event.preventDefault();
  setFormSubmitted(true);
 
  if(isValidForm({boardName}) && areInputListItemsValid()){
      setFormSubmitted(false);
      createBoard({boardName:boardName,boardColumns:listInput});
      resetInputList();
      closeModal();
      return;
    }
    updateIsCurrentInputEmpty(true);
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

     <CreateInputList 
     listName={'Board Columns'} 
     buttonName={"Add New Column"}
     />
   
    <button className={`${button.btn_primary} ${button.auth_submit_btn}`} type="submit">
     Create New Board
    </button>
    </form>
  )
}
