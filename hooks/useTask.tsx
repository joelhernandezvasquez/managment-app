import { useCallback, useRef } from 'react';
import {useMutation} from '@tanstack/react-query';
import { useAuthStore} from '../store/store';
import { useUIStates,useInputList, useBoardContext } from '../hooks';
import { kanbanApi } from '../api/kanbanApi';
import { notifySuccessAlert,notifyErrorAlert, isValidForm} from '../helpers';
import { BoardInput, BoardTask, SubsTask,Task} from '../types/types';

export const useTask = () => {
  const {user} = useAuthStore();
  const {getActiveBoard} = useUIStates();
  const {areInputListItemsValid,listInput,resetInputList} = useInputList();
  const taskStatusRef = useRef<string>();
  const {addTaskToBoardContext} = useBoardContext();

  const createTaskMutation = useMutation({
    mutationFn:(task:BoardTask) => {
      return createTask(task)
    }
  })

  const createTask = async (task:BoardTask) =>{
  
    try{
      const response  = await kanbanApi.post('/board/create/task',{
        boardId:getActiveBoard()._id, 
        userId:user.uid,
        name:task.name, 
        description:task.description,
        substasks:task.substasks, 
        status:task.status
      })
      addTaskToBoardContext(task);
      notifySuccessAlert('Task has been created.');
      
      return response.data;
    }
    catch(error:any){
      console.error(error);
      const {response} = error;
      notifyErrorAlert(response.data.message);
    }

  }

  const isTaskStatusValid = ():boolean =>{
    return taskStatusRef.current!==undefined
  }

  const mappedSubstask = (listOfInput:BoardInput []):SubsTask [] =>{
    return listOfInput.map((substask)=> {
      return{
        name:substask.column,
        complete:false
      }
   })

  }

  const setTaskStatus = useCallback((status:string) =>{
    taskStatusRef.current = status;
},[])

const resetTaskStatus = () =>{
  taskStatusRef.current = undefined;
}

  const submitAddTaskForm = async ({taskTitle,taskDescription}:Task) =>{
     
    try{
      if(isValidForm({taskTitle,taskDescription}) && isTaskStatusValid() && areInputListItemsValid() ){
        createTaskMutation.mutate({
          name:taskTitle,
          description:taskDescription,
          substasks:mappedSubstask(listInput),
          status:taskStatusRef.current || " "
      })
      resetInputList();
      resetTaskStatus();

       return{
        submitted:true
       }
    }
  }
   catch(error){
    console.error(error);
    return{
      submitted:false
    }
   }

}

  return {
    taskStatusRef,
    setTaskStatus,
    resetTaskStatus,
    isTaskStatusValid,
    mappedSubstask,
    submitAddTaskForm
}
}

