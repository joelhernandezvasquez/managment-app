import {FC,useState} from 'react';
import { useModal } from '../../hooks';
import { Status } from '../../types/types';
import dashboard from '../../styles/dashboard.module.css';

interface StatusProps {
 listOfStatus: Status [],
 setTaskStatus:(status:string) => void
}

export const ShowTaskStatus:FC<StatusProps> = ({listOfStatus,setTaskStatus}) => {
  
    const [currentStatus,setCurrentStatus] = useState(listOfStatus.at(0));
    const {isModalOpen,toggleModal} = useModal();

     const selectStatusItem = ({id,status}:Status) =>{
       setCurrentStatus({id,status});
       setTaskStatus(status);
       toggleModal();
     }
    return (
   
   <section>
       <div className={dashboard.header_status_list} onClick={toggleModal}>
          <span className={dashboard.status_list_item}>{currentStatus?.status}</span>
          <svg className={``} width="9" height="7" viewBox="0 0 9 7" fill="none">
               <path d="M1 1L5 5L9 1" stroke="#635FC7" strokeWidth="2"/>
          </svg>
       </div>

       <div className={`${dashboard.body_status_list} ${ isModalOpen && dashboard.open_list}`}>
           <ul>
           {listOfStatus.map(({id,status})=>{
            return <li className={dashboard.body_status_list_item} key={id} onClick={()=>selectStatusItem({id,status})}> {status} </li>
           })}
        </ul>
       </div>
        
   </section>
  )
}
