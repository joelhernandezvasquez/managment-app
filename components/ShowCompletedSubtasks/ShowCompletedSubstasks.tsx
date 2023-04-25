import {FC} from 'react';
import { SubsTask } from '../../types/types';
import { v4 as uuidv4 } from 'uuid'; 
import dashboard  from '../../styles/dashboard.module.css';

interface Props{
    substasks: SubsTask [],
    taskStatus: string
}
const ShowCompletedSubstasks:FC <Props> = ({substasks,taskStatus}) => {
    
  // const completedSubstasks = substasks.reduce((accumulator:number,substask)=>{
  //    if(substask.complete){
  //     accumulator++;
  //    }
  //    return accumulator
  // },0)

    return (
    <div className={dashboard.view_substasks}>
      <p className={dashboard.view_substasks_text}>Subtasks (0 of 3)</p>

      <ul>
        {substasks.map((substask)=>{
          return (
          <li className={dashboard.view_substasks_item} key={uuidv4()}>
              <label className={dashboard.custom_checkbox_container}>
                <input className={dashboard.custom_checkbox}  type="checkbox" id={uuidv4()}/>
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
          <span className={dashboard.status_list_item}>{taskStatus}</span>
       </div>
    </div>
  )
}

export default ShowCompletedSubstasks