import { FC } from 'react';
import { useTask } from '../../hooks';
import { SubsTask } from '../../types/types';
import dashboard  from '../../styles/dashboard.module.css';
interface Props{
    substasks: SubsTask []
}

export const ShowTotalSubstaskCompleted:FC <Props> = ({substasks}) => {
 
    const {getTotalOfSubstasksCompleted} = useTask();
    const totalOfSubstasksCompleted = getTotalOfSubstasksCompleted(substasks);

    return (
    <p className={dashboard.view_substasks_text}>{totalOfSubstasksCompleted} of {substasks.length} Subtasks </p> 
  )
}
