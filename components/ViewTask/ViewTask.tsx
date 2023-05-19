import {FC,MouseEvent} from 'react';
import { useTask } from '../../hooks';
import ShowViewTaskMenu from '../ShowViewTaskMenu/ShowViewTaskMenu';
import ShowCompletedSubstasks from '../ShowCompletedSubtasks/ShowCompletedSubstasks';
import dashboard  from '../../styles/dashboard.module.css';
import layouts from '../../styles/layouts.module.css';
import share from '../../styles/share.module.css';
import button from '../../styles/buttons/buttons.module.css';

interface Props{
  closeViewTask:() => void
}

const ViewTask:FC <Props> = ({closeViewTask}) => {

  const {getActiveTask,clearActiveTask} = useTask();
  const {name,description} = getActiveTask(); 

  const handleClick = (event:MouseEvent) =>{
   event.stopPropagation();
  }

  const closeTaskWindow = () =>{
    clearActiveTask();
    closeViewTask();
  }
  
  return (
    <section className={layouts.modal_container} onClick={(event)=>handleClick(event)}>
  
      <div className={layouts.modal_inner_form}>

        <button className={button.close_button} onClick={closeTaskWindow}>
        <svg viewBox="0 0 24 24">
              <path
              d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
              />
       </svg>
        </button>
            
          <div style={{width:'100%'}} className={`${share.d_flex} ${share.d_align_flex_center} ${share.d_flex_space_between} ${share.d_position_relative}`}>
             <h2 className={dashboard.view_task_heading}>{name}</h2>
              <ShowViewTaskMenu/>
          </div>

          <p className={dashboard.view_task_description}>{description}</p>
          <ShowCompletedSubstasks/>
       </div>
    </section>
  )
}

export default ViewTask