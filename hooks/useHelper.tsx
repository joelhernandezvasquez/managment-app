import {useMemo,useState} from 'react';
import { useTask } from "./useTask";

export const useHelper = () => {
  
    const {getActiveTask} = useTask();
    const [hasFormBeenSubmitted,setFormSubmitted] = useState(false);

    const totalTaskTitleCharacters = useMemo(()=>{
        return getActiveTask().name.length;
      },[])

      const modifyFormSubmissionState = (formState:boolean) =>{
        setFormSubmitted(formState);
      }

return{
    totalTaskTitleCharacters,
    hasFormBeenSubmitted,
    modifyFormSubmissionState
}

}
