import { useId,FormEvent,FC} from "react";
import { useFetchBoard, UseForm, useInputList,useTask} from "../../hooks";
import { CreateInputList } from "../CreateInputsLists/CreateInputList";
import FormFieldRequired from "../FormField/FormFieldRequired";
import { ShowTaskStatus } from "../ShowTaskStatus/ShowTaskStatus";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import {mappedListOfStatus } from "../../helpers";
import {Task} from "../../types/types";
import layout from "../../styles/layouts.module.css";
import styles from '../../styles/share.module.css';
import button from '../../styles/buttons/buttons.module.css';
interface Props{
  closeWindow:() => void
}

const taskForm:Task = {
    taskTitle:'',
    taskDescription:''
}

export const AddNewTask:FC<Props> = ({closeWindow}) => {
    const {taskTitle,taskDescription,formSubmitted,setFormSubmitted,handleChange,resetForm} = UseForm<Task>(taskForm);
    const {board_columns,isLoading} = useFetchBoard();
    const {updateIsCurrentInputEmpty} = useInputList();
    const taskTitleID = useId();
    const taskDescriptionID = useId();
    const {taskStatusRef,setTaskStatus,submitAddTaskForm} = useTask();
    
    const onSubmitAddTaskForm = async (event:FormEvent) =>{
      event.preventDefault();
      setFormSubmitted(true);
       
     const response = await submitAddTaskForm({taskTitle,taskDescription});
      
      if(response?.submitted){
        setFormSubmitted(false);
        resetForm();
        return;
      }
      updateIsCurrentInputEmpty(true);
    }
    
    const hasTaskStatusNotBeenSelected = ():boolean =>{
      return formSubmitted && !taskStatusRef.current
    }

  if(isLoading) return <></>;

    return (
     <form className={layout.modal_form} onSubmit={onSubmitAddTaskForm}>
   
     <FormFieldRequired
        labelName ={'Title'}
        type = "text"
        id={taskTitleID}
        name="taskTitle"
        placeholderText = "e.g. Take coffee break"
        fieldState={taskTitle} 
        onChangeHandler = {handleChange}
        isFormSubmitted = {formSubmitted}
    />

    <FormFieldRequired
        labelName ={'Description'}
        type = "text"
        isTextArea = {true}
        id={taskDescriptionID}
        name="taskDescription"
        fieldState={taskDescription} 
        onChangeHandler = {handleChange}
        isFormSubmitted = {formSubmitted}
    />

    <CreateInputList listName={'Subtasks'} buttonName={"Add New Subtask"} />

    <div style={{marginTop:'24px', marginBottom:'8px'}}>
      <label className={`${styles.capitalize} ${styles.label}`}> Status </label>
      
      <ShowTaskStatus 
         listOfStatus={mappedListOfStatus(board_columns || [])}
         setTaskStatus = {setTaskStatus}
      />
    </div>
    
    {hasTaskStatusNotBeenSelected() && <ErrorMessage>Please select the status</ErrorMessage>}
    
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