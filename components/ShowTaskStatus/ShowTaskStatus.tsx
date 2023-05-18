import {FC,useState,memo,useMemo} from 'react';
import { useModal,useFetchBoard } from '../../hooks';
import { Status } from '../../types/types';
import dashboard from '../../styles/dashboard.module.css';
import { mappedListOfStatus } from '../../helpers';
interface StatusProps {
 setTaskStatus:(status:string) => void
}

export const ShowTaskStatus:FC<StatusProps> = memo( ({setTaskStatus}) => {
  
    const {board_columns} = useFetchBoard();
    const [currentStatus,setCurrentStatus] = useState({id:'0',status:'Select a Status'});
    const {isModalOpen,toggleModal} = useModal();

    const listOfStatus = useMemo(()=>{
      return mappedListOfStatus(board_columns ?? [])
    },[board_columns])
  
     const selectStatusItem = ({id,status}:Status) =>{
       setCurrentStatus({id,status});
       setTaskStatus(status);
       toggleModal();
     }

    return (
   <section>
       <div className={dashboard.header_status_list} onClick={toggleModal}>
          <span className={dashboard.status_list_item}>{currentStatus?.status}</span>
          <svg  width="9" height="7" viewBox="0 0 9 7" fill="none">
               <path d="M1 1L5 5L9 1" stroke="#635FC7" strokeWidth="2"/>
          </svg>
       </div>

       <div className={`${dashboard.body_status_list} ${isModalOpen && dashboard.open_list}`}>
           <ul>
           {listOfStatus.map(({id,status})=>{
            return <li className={dashboard.body_status_list_item} key={id} onClick={()=>selectStatusItem({id,status})}> {status} </li>
           })}
        </ul>
       </div>   
   </section>
  )
})

ShowTaskStatus.displayName = 'ShowTaskStatus';
