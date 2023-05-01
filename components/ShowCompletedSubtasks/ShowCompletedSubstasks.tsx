import {FC,useEffect, useState} from 'react';
import { BoardTask, SubsTask } from '../../types/types';
import { v4 as uuidv4 } from 'uuid'; 
import dashboard  from '../../styles/dashboard.module.css';
import { useTask } from '../../hooks';
import { ShowTotalSubstaskCompleted } from '../ShowTotalSubstasksCompleted/ShowTotalSubstaskCompleted';
interface Props{
 task:BoardTask
}
const ShowCompletedSubstasks:FC <Props> = ({task}) => {
 const {status} = task;
 const [substasks,setSubstasks] = useState(task.substasks);
 const {updateSubstaskMutation} = useTask();
 
  
const toggleCheckbox = (substask:SubsTask) =>{
  substask.complete = !substask.complete;
  const updatedCheckbox = substasks.map((substaskItem)=> substaskItem._id === substask._id ? substask : substaskItem);
  
  updateSubstaskMutation.mutate({
        taskId:task._id ?? '',
        substask:{
          _id:substask._id,
         name:substask.name,
         complete: substask.complete
        }
      })
      setSubstasks(updatedCheckbox);
}

    return (
    <div className={dashboard.view_substasks}>
      <ShowTotalSubstaskCompleted substasks={task.substasks}/>
      <ul>
        {substasks.map((substask)=>{
          return (
          <li className={dashboard.view_substasks_item} key={substask._id}>
              <label className={`${dashboard.custom_checkbox_container} ${substask.complete && dashboard.completed_substask_status}`}>
                <input className={dashboard.custom_checkbox}  type="checkbox" id={uuidv4()} 
                 defaultChecked = {substask.complete}
                 onChange={() => toggleCheckbox(substask)}
                 
                />
                  <svg className={dashboard.checkmark_icon}  viewBox="0 0 10 8" fill="none">
                   <path d="M1.27583 3.0658L4.03229 5.82227L9.03229 0.822266" stroke="white" stroke-width="2"/>
                  </svg>
               {substask.name}
            </label>
             
          </li>
          )
        })}
      </ul>

      <p className={dashboard.view_substasks_text}>Current Status</p>
      <div style={{marginBottom:'32px'}} className={dashboard.header_status_list}>
          <span className={dashboard.status_list_item}>{status}</span>
       </div>
    </div>
  )
}

export default ShowCompletedSubstasks