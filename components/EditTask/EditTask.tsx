import { FC,FormEvent,useMemo} from "react";
import { useTask,useHelper} from "../../hooks";
import useSubstasks from "../../hooks/useSubstasks";
import { ShowTaskStatus } from "../ShowTaskStatus/ShowTaskStatus";
import { RenderInputList } from "../RenderInputList/RenderInputList";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import {formIsValid,mappedBoardInputToSubstasks,mapSubtasksToBoardInputs} from "../../helpers";
import layout from "../../styles/layouts.module.css";
import share from '../../styles/share.module.css';
import button from '../../styles/buttons/buttons.module.css';

interface Props{
  closeWindow:() => void
}

export const EditTask:FC<Props> = ({closeWindow}) => {
  const {task,getActiveTask,taskStatusRef,setTaskStatus,isTaskStatusValid,areSubtasksValid,updateTaskMutation,hasTaskStatusNotBeenSelected,onChangeTask} = useTask();
  const {totalTaskTitleCharacters,hasFormBeenSubmitted,modifyFormSubmissionState} = useHelper();
  const listOfSubstasks = useMemo(()=>mapSubtasksToBoardInputs(getActiveTask().substasks),[]);
  const {substaskList,addSubstaskToList,updateSubstaskToList,deleteSubstaskFromList} = useSubstasks(listOfSubstasks);


  const isEditTaskFormValid = () =>{
    return formIsValid([task.name,task.description]) && isTaskStatusValid() && areSubtasksValid(substaskList);
   }

  const onSubmitEditTaskForm = (event:FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
   modifyFormSubmissionState(true);

  if(isEditTaskFormValid()) {
    
    updateTaskMutation.mutate({
       _id:getActiveTask()._id,
       name:task.name,
       description:task.description,
       substasks:mappedBoardInputToSubstasks(getActiveTask().substasks,substaskList),
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
         className={`${share.primary_input}  ${share.d_flex_grow} ${task.name ==='' && share.invalid_input} `}
         type = "text"
         id="title_task"
         name="name"
         value={task.name}
         onChange = {onChangeTask}  
         placeholder = {task.name ==='' ? "cannot be empty":"e.g. Web Design"}
        />
        :
        <textarea className={`${share.primary_input} ${share.text_area_input} ${task.name ==='' && share.invalid_input}`}
        id="title_task"
        name="name"
        value={task.name}
        onChange = {onChangeTask}  
        placeholder = {task.name ==='' ? "cannot be empty":"e.g. Web Design"}
       >
       </textarea>
      }
       </div>

       <div className={`${share.d_flex} ${share.d_flex_col} ${share.form_field} ${share.padding_top} `}>
       <label className={share.label}>Description</label>
       <textarea className={`${share.primary_input} ${share.text_area_input} ${task.description ==='' && share.invalid_input} `}
        id="title_description"
        name="description"
        value={task.description }
        onChange = {onChangeTask}  
        placeholder = {task.description  ==='' ? "cannot be empty":"e.g. Web Design"}
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
       statusSent={getActiveTask().status}
      setTaskStatus = {setTaskStatus}
      />
    </div>
   
    {hasFormBeenSubmitted && hasTaskStatusNotBeenSelected() ? <ErrorMessage>Please select the status</ErrorMessage>:''}

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
