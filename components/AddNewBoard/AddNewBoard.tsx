
import {FormEvent} from 'react'
import { UseForm,useInputList} from "../../hooks"
import { CreateInputList } from "../CreateInputsLists/CreateInputList";
import FormFieldRequired from "../FormField/FormFieldRequired";
import layout from "../../styles/layouts.module.css";
import button from '../../styles/buttons/buttons.module.css';

interface BoardProps{
  boardName:string
}

const boardForm:BoardProps = {boardName:''}

export const AddNewBoard = () => {
  const {boardName,formSubmitted,setFormSubmitted,handleChange} = UseForm<BoardProps>(boardForm);
  const {listInput} = useInputList();
  
  const handleSubmitForm = (event:FormEvent<HTMLFormElement>) =>{
  event.preventDefault();
  console.log(listInput);
 }

  return (
    <form className={layout.modal_form} onSubmit={handleSubmitForm}>
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
