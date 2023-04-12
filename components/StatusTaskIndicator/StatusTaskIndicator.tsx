import {FC} from 'react';
import style from '../../styles/dashboard.module.css';

interface Props{
    status:string
}

const statusIndicator:any= {
  todo:'#49C4E5',
  doing:'#8471F2',
  done:'#67E2AE',
  unknown:'#2E88C2'
}

const getStatusColorIndicator = (status:string):string =>{
  const statusType = status.toLowerCase();
  return statusIndicator[statusType] ?? statusIndicator.unknown;
}

export const StatusTaskIndicator:FC<Props> = ({status}) => {
 
   return (
    <span style={{backgroundColor:getStatusColorIndicator(status)}} className={style.status_task_indicator}>
       
    </span>
  )
}
