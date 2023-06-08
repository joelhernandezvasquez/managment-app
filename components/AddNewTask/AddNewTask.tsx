import {useId,FormEvent,FC} from "react";
import {useTask,useHelper} from "../../hooks";
import useSubstasks from "../../hooks/useSubstasks";
import { RenderInputList } from "../RenderInputList/RenderInputList";
import FormFieldRequired from "../FormField/FormFieldRequired";
import {mappedBoardInputToSubstasks} from "../../helpers";
import { ShowTaskStatus } from "../ShowTaskStatus/ShowTaskStatus";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { v4 as uuidv4 } from 'uuid';
import layout from "../../styles/layouts.module.css";
import styles from '../../styles/share.module.css';
import button from '../../styles/buttons/buttons.module.css';
interface Props{
  closeWindow:() => void
}

export const AddNewTask:FC<Props> = ({closeWindow}) => {
   
    const {getActiveTask,task,setTaskStatus,submitAddTaskForm,onChangeTask,hasTaskStatusNotBeenSelected,resetTaskValues} = useTask();
    const {hasFormBeenSubmitted,modifyFormSubmissionState} = useHelper();
    const {substaskList,addSubstaskToList,updateSubstaskToList,deleteSubstaskFromList,resetSubstasks} = useSubstasks([{id:uuidv4(),column:''}]);
    const taskTitleID = useId();
    const taskDescriptionID = useId();
   
   
    const onSubmitAddTaskForm = async (event:FormEvent) =>{
      event.preventDefault();
     modifyFormSubmissionState(true);
       
     const response = await submitAddTaskForm({taskTitle:task.name,taskDescription:task.description},mappedBoardInputToSubstasks(getActiveTask().substasks,substaskList));
      
      if(response?.submitted){
        modifyFormSubmissionState(false);
        resetTaskValues();
        resetSubstasks();
       
        return;
      }
    }
    return (
     <form className={layout.modal_form} onSubmit={onSubmitAddTaskForm}>
   
     <FormFieldRequired
        labelName ={'Title'}
        type = "text"
        id={taskTitleID}
        name="name"
        placeholderText = "e.g. Take coffee break"
        fieldState={task.name} 
        onChangeHandler = {onChangeTask}
        isFormSubmitted = {hasFormBeenSubmitted}
    />

    <FormFieldRequired
        labelName ={'Description'}
        type = "text"
        isTextArea = {true}
        id={taskDescriptionID}
        name="description"
        fieldState={task.description} 
        onChangeHandler = {onChangeTask}
        isFormSubmitted = {hasFormBeenSubmitted}
    />

    <RenderInputList 
       listName={'Subtasks'} 
       buttonName={"Add New Subtask"}
       listOfInputs={substaskList}
       addInputToList={addSubstaskToList}
       updateInputToList={updateSubstaskToList}
       deleteInputFromList={deleteSubstaskFromList}
       formSent = {hasFormBeenSubmitted}
       />

    <div style={{marginTop:'24px', marginBottom:'8px'}}>
      <label className={`${styles.capitalize} ${styles.label}`}> Status </label>
      
      <ShowTaskStatus 
         setTaskStatus = {setTaskStatus}
      />
    </div>
    
    {hasFormBeenSubmitted && hasTaskStatusNotBeenSelected() ? <ErrorMessage>Please select the status</ErrorMessage>:''}
    
    <div>
    <button className={`${button.btn_primary} ${button.auth_submit_btn}`} type="submit">
     Create Task
    </button>

    <button className={`${button.btn_primary} ${button.auth_submit_btn}`}
     onClick={closeWindow}
    >
     Cancel
    </button>
    </div>

   </form>
  ) 
}