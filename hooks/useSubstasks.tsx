import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { BoardInput } from "../types/types";


const useSubstasks = (list:BoardInput []) => {

const [substaskList,setSubstaskList] = useState<BoardInput []>(list);
  
    const addSubstaskToList = () =>{ 
        setSubstaskList([...substaskList,{id:uuidv4(),column:''} as unknown as BoardInput]);
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

      const resetSubstasks = () =>{
        setSubstaskList([{id:uuidv4(),column:''}])
      }
      const isSubstaskListEmpty = () =>{
        return substaskList.length === 0;
      }



      return{
        substaskList,
        addSubstaskToList,
        updateSubstaskToList,
        deleteSubstaskFromList,
        resetSubstasks,
        isSubstaskListEmpty
      }

}
export default useSubstasks

  