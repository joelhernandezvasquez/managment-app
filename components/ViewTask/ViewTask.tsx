import {FC,MouseEvent} from 'react';
import ShowViewTaskMenu from '../ShowViewTaskMenu/ShowViewTaskMenu';
import ShowCompletedSubstasks from '../ShowCompletedSubtasks/ShowCompletedSubstasks';
import { TaskProp } from '../../types/types';
import dashboard  from '../../styles/dashboard.module.css';
import layouts from '../../styles/layouts.module.css';
import share from '../../styles/share.module.css';


const ViewTask:FC <TaskProp> = ({task}) => {

  const handleClick = (event:MouseEvent) =>{
   event.stopPropagation();
  }
  
  return (
    <section className={layouts.modal_container} onClick={(event)=>handleClick(event)}>
        <div className={layouts.modal_inner_form}>
         
          <div style={{width:'100%'}} className={`${share.d_flex} ${share.d_align_flex_center} ${share.d_flex_space_between}`}>
              <h2 className={dashboard.view_task_heading}>{task.name}</h2>
              <ShowViewTaskMenu/>
          </div>

          <p className={dashboard.view_task_description}>{task.description}</p>
          <ShowCompletedSubstasks substasks={task.substasks} taskStatus = {task.status}/>
       </div>
    </section>
  )
}

export default ViewTask