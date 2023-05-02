import {FC} from 'react';
import { statusIndicator } from '../../helpers';
import style from '../../styles/dashboard.module.css';
interface Props{
    status:string
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
