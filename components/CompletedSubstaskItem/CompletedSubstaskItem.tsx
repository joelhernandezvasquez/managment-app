import { FC} from "react";
import { SubsTask } from "../../types/types";
import { v4 as uuidv4 } from 'uuid'; 
import dashboard  from '../../styles/dashboard.module.css';

interface Props{
    substask:SubsTask,
    toggleCheckbox:(substask:SubsTask)=> void
}

const CompletedSubstaskItem:FC <Props> = ({substask,toggleCheckbox}) => {

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
}

export default CompletedSubstaskItem