import {useState} from 'react';
import { SubsTask } from '../../types/types';
import { useTask } from '../../hooks';
import { ShowTotalSubstaskCompleted } from '../ShowTotalSubstasksCompleted/ShowTotalSubstaskCompleted'; 
import dashboard  from '../../styles/dashboard.module.css';
import CompletedSubstaskItem from '../CompletedSubstaskItem/CompletedSubstaskItem';


const ShowCompletedSubstasks = () => {
 const {getActiveTask,updateSubstaskMutation} = useTask();
 const [substasks,setSubstasks] = useState(getActiveTask().substasks);

 
const toggleCheckbox = (substask:SubsTask) =>{
  substask.complete = !substask.complete;
  const updatedCheckbox = substasks.map((substaskItem)=> substaskItem._id === substask._id ? substask : substaskItem);
  
  updateSubstaskMutation.mutate({
       taskId:getActiveTask()._id ?? '',
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
      <ShowTotalSubstaskCompleted substasks={getActiveTask().substasks}/>
      <ul>
        {substasks.map((substask)=>{
          return (
           <CompletedSubstaskItem key={substask._id} 
            substask={substask} 
            toggleCheckbox={toggleCheckbox}
            />
          )
        })}
      </ul>

      <p className={dashboard.view_substasks_text}>Current Status</p>
      <div style={{marginBottom:'32px'}} className={dashboard.header_status_list}>
          <span className={dashboard.status_list_item}>{getActiveTask().status}</span>
       </div>
    </div>
  )
}

export default ShowCompletedSubstasks