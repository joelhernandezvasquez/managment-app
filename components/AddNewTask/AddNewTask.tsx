import { useId,useRef,FormEvent} from "react";
import { useFetchBoard, UseForm, useInputList } from "../../hooks";
import { CreateInputList } from "../CreateInputsLists/CreateInputList";
import FormFieldRequired from "../FormField/FormFieldRequired";
import { ShowTaskStatus } from "../ShowTaskStatus/ShowTaskStatus";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { isValidForm, mappedListOfStatus } from "../../helpers";
import layout from "../../styles/layouts.module.css";
import styles from '../../styles/share.module.css';
import button from '../../styles/buttons/buttons.module.css';

interface TaskProps{
    taskTitle:string,
    taskDescription:string
}
const taskForm:TaskProps = {
    taskTitle:'',
    taskDescription:''
}

export const AddNewTask = () => {
    const {taskTitle,taskDescription,formSubmitted,setFormSubmitted,handleChange} = UseForm<TaskProps>(taskForm);
    const {board_columns,isLoading} = useFetchBoard();
    const {areInputListItemsValid,updateIsCurrentInputEmpty} = useInputList();
    const taskTitleID = useId();
    const taskDescriptionID = useId();
    const taskStatusRef = useRef<string>();

    if(isLoading) return;
    
    const getTaskStatus = (status:string) =>{
        taskStatusRef.current = status;
    }

    const onSubmitAddTaskForm = (event:FormEvent) =>{
      event.preventDefault();
      setFormSubmitted(true);
       
      if(isValidForm({taskTitle,taskDescription}) && taskStatusRef.current!==undefined && areInputListItemsValid()){
        console.log('form can be sent');
        setFormSubmitted(false);
        return;
       }
       console.log('form cannot be sent');
       updateIsCurrentInputEmpty(true);
    }

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
        //placeholderText = "e.g. It’s always good to take a break. This 15 minute break will  recharge the batteries a little."
        fieldState={taskDescription} 
        onChangeHandler = {handleChange}
        isFormSubmitted = {formSubmitted}
    />

    <CreateInputList 
        listName={'Subtasks'} 
        buttonName={"Add New Subtask"}
        />

    <div style={{marginTop:'24px', marginBottom:'8px'}}>
      <label className={`${styles.capitalize} ${styles.label}`}> Status </label>
      <ShowTaskStatus 
         listOfStatus={mappedListOfStatus(board_columns || [])}
         setTaskStatus = {getTaskStatus}
      />
    </div>
    {formSubmitted && !taskStatusRef.current && <ErrorMessage>Please select the status</ErrorMessage>}
    
    <button className={`${button.btn_primary} ${button.auth_submit_btn}`} type="submit">
     Create Task
    </button>
   </form>
  )
}
