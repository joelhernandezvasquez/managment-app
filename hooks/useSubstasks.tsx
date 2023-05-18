import { useState } from "react";
import { useTask } from "./useTask";
import { mapSubtasksToBoardInputs } from "../helpers";
import { v4 as uuidv4 } from 'uuid';

const useSubstasks = () => {
    const {getActiveTask} = useTask();
    const [substaskList,setSubstaskList] = useState(mapSubtasksToBoardInputs(getActiveTask().substasks));
  
    const addSubstaskToList = () =>{ 
        setSubstaskList([...substaskList,{id:uuidv4(),column:''}]);
      }

      const updateSubstaskToList = (substaskId:string,text:string) =>{
        const substasksEdit = substaskList.map((substask)=>{
          if(substask.id === substaskId){
            return {
             id:substask.id,
             column:text
            }
          }
          return substask;
        })
    
        setSubstaskList(substasksEdit);
      }

      const deleteSubstaskFromList = (substaskId:string) =>{
        const updatedSubstasks = substaskList.filter((substask)=> substask.id !== substaskId);
        setSubstaskList(updatedSubstasks);
      }

      return{
        substaskList,
        addSubstaskToList,
        updateSubstaskToList,
        deleteSubstaskFromList
      }

}

export default useSubstasks