import { FC,FormEvent, useState,ChangeEvent} from "react";
import { useTask,useHelper} from "../../hooks";
import useSubstasks from "../../hooks/useSubstasks";
import { ShowTaskStatus } from "../ShowTaskStatus/ShowTaskStatus";
import { RenderInputList } from "../RenderInputList/RenderInputList";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import {formIsValid} from "../../helpers";
import layout from "../../styles/layouts.module.css";
import share from '../../styles/share.module.css';
import button from '../../styles/buttons/buttons.module.css';

interface Props{
  closeWindow:() => void
}

export const EditTask:FC<Props> = ({closeWindow}) => {
  const {getActiveTask,taskStatusRef,setTaskStatus,isTaskStatusValid,areSubtasksValid,updateTaskMutation} = useTask();
  const {totalTaskTitleCharacters,hasFormBeenSubmitted,modifyFormSubmissionState} = useHelper();
  const {substaskList,addSubstaskToList,updateSubstaskToList,deleteSubstaskFromList} = useSubstasks();

  const [taskInfo,setTaskInfo] = useState({
    taskName:getActiveTask().name,
    taskDescription:getActiveTask().description
  })

  const hasTaskStatusNotBeenSelected = ():boolean =>{
    return hasFormBeenSubmitted && !taskStatusRef.current
  }
  
  const onChangeTaskInfo = ({target}:ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) =>{
    const {name,value} = target;
    setTaskInfo({...taskInfo,[name]:value})
  }

  const onSubmitEditTaskForm = (event:FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
   modifyFormSubmissionState(true);

  if(formIsValid([taskInfo.taskName,taskInfo.taskDescription]) && isTaskStatusValid() && areSubtasksValid(substaskList)) {
   
     updateTaskMutation.mutate({
       _id:getActiveTask()._id,
       name:taskInfo.taskName,
       description:taskInfo.taskDescription,
       substasks:getActiveTask().substasks,
       status:taskStatusRef.current ?? ''
     })
  }
  
  }

  return (
    <form className={layout.modal_form} onSubmit={onSubmitEditTaskForm}>

       <div className={`${share.d_flex} ${share.d_flex_col} ${share.form_field} `}>
       <label className={share.label}>Title</label>
        
        {totalTaskTitleCharacters < 40
        ?
        <input
        className={`${share.primary_input}  ${share.d_flex_grow} ${taskInfo.taskName ==='' && share.invalid_input} `}
        type = "text"
        id="title_task"
        name="taskName"
        value={taskInfo.taskName}
         onChange = {onChangeTaskInfo}  
         placeholder = {taskInfo.taskName ==='' ? "cannot be empty":"e.g. Web Design"}
        />
        :
        <textarea className={`${share.primary_input} ${share.text_area_input} ${taskInfo.taskName ==='' && share.invalid_input}`}
        id="title_task"
        name="taskName"
        value={taskInfo.taskName}
        onChange = {onChangeTaskInfo}  
        placeholder = {taskInfo.taskName ==='' ? "cannot be empty":"e.g. Web Design"}
       >
        </textarea>
        }
       
       </div>

       <div className={`${share.d_flex} ${share.d_flex_col} ${share.form_field} ${share.padding_top} `}>
       <label className={share.label}>Description</label>
       <textarea className={`${share.primary_input} ${share.text_area_input} ${taskInfo.taskDescription ==='' && share.invalid_input} `}
        id="title_description"
        name="taskDescription"
        value={taskInfo.taskDescription}
        onChange = {onChangeTaskInfo}  
        placeholder = {taskInfo.taskDescription ==='' ? "cannot be empty":"e.g. Web Design"}
       >
        </textarea>

       </div>
       
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
      <label className={`${share.capitalize} ${share.label}`}> Status </label>
      
      <ShowTaskStatus 
         setTaskStatus = {setTaskStatus}
      />
    </div>
   
    {hasTaskStatusNotBeenSelected() &&  <ErrorMessage>Please select the status</ErrorMessage>}

    <div>
    <button className={`${button.btn_primary} ${button.auth_submit_btn}`} type="submit">
     Update Task
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
