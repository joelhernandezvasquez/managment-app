import { FC } from 'react';
import { useTask } from '../../hooks';
import dashboard  from '../../styles/dashboard.module.css';
import { SubsTask } from '../../types/types';

interface Props{
    substasks: SubsTask []
}

export const ShowTotalSubstaskCompleted:FC <Props> = ({substasks}) => {
 
    const {getTotalOfSubstasksCompleted} = useTask();
    const totalOfSubstasksCompleted = getTotalOfSubstasksCompleted(substasks);

    return (
    <p className={dashboard.view_substasks_text}>Subtasks ({totalOfSubstasksCompleted} of {substasks.length})</p> 
  )
}
