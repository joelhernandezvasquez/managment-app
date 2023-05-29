import {useId,FormEvent,FC} from "react";
import { useInputList,useTask,useHelper} from "../../hooks";
import { CreateInputList } from "../CreateInputsLists/CreateInputList";
import FormFieldRequired from "../FormField/FormFieldRequired";
import { ShowTaskStatus } from "../ShowTaskStatus/ShowTaskStatus";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import layout from "../../styles/layouts.module.css";
import styles from '../../styles/share.module.css';
import button from '../../styles/buttons/buttons.module.css';
interface Props{
  closeWindow:() => void
}

export const AddNewTask:FC<Props> = ({closeWindow}) => {
   
    const {task,setTaskStatus,submitAddTaskForm,onChangeTask,hasTaskStatusNotBeenSelected,resetTaskValues} = useTask();
    const {hasFormBeenSubmitted,modifyFormSubmissionState} = useHelper();
    const {updateIsCurrentInputEmpty} = useInputList();
    const taskTitleID = useId();
    const taskDescriptionID = useId();
   
    const onSubmitAddTaskForm = async (event:FormEvent) =>{
      event.preventDefault();
     modifyFormSubmissionState(true);
       
     const response = await submitAddTaskForm({taskTitle:task.name,taskDescription:task.description});
      
      if(response?.submitted){
       modifyFormSubmissionState(false);
       resetTaskValues();
        return;
      }
      updateIsCurrentInputEmpty(true);
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

    <CreateInputList listName={'Subtasks'} buttonName={"Add New Subtask"} />

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