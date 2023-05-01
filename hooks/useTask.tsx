import { useCallback, useRef } from 'react';
import {useMutation,useQueryClient} from '@tanstack/react-query';
import { useAuthStore} from '../store/store';
import { useUIStates,useInputList} from '../hooks';
import { kanbanApi } from '../api/kanbanApi';
import { notifySuccessAlert,notifyErrorAlert, isValidForm,updateSubstasks} from '../helpers';
import { BoardInput, BoardListResponse, BoardTask, SubsTask,Task,TaskSubstaskUpdate} from '../types/types';

export const useTask = () => {
  const {user} = useAuthStore();
  const {getActiveBoard} = useUIStates();
  const {areInputListItemsValid,listInput,resetInputList} = useInputList();
  const taskStatusRef = useRef<string>();
  const queryClient = useQueryClient();

  const createTaskMutation = useMutation({
    mutationFn:(task:BoardTask) => {
      return createTask(task)
    },
    onMutate: async (newTask) => {
     await queryClient.cancelQueries(["getBoard",getActiveBoard()._id]);
     
     const previousData = queryClient.getQueryData<BoardListResponse>(["getBoard",getActiveBoard()._id]);

      if(previousData){
        queryClient.setQueryData(["getBoard",getActiveBoard()._id],{
          ...previousData,
          board_tasks:[
            ...previousData.board_tasks,
            newTask

          ],
        })

        return { previousData }
      }
    },
    onError: (error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["getBoard",getActiveBoard()._id], context.previousData)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey:["getBoard",getActiveBoard()._id] })
    },

  })

  const updateSubstaskMutation = useMutation({

    mutationFn:(updatedTaskSubtask:TaskSubstaskUpdate) => {
      return updateSubstasks(updatedTaskSubtask,getActiveBoard()._id);
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

const getTotalOfSubstasksCompleted = (substasks:SubsTask []):number =>{
  
  const completedSubstasks = substasks.reduce((accumulator:number,substask:SubsTask)=>{ 
    if(substask.complete){
      accumulator++;
     }
     return accumulator
  },0)
  
  return completedSubstasks;
}

  return {
    taskStatusRef,
    setTaskStatus,
    resetTaskStatus,
    isTaskStatusValid,
    mappedSubstask,
    submitAddTaskForm,
    getTotalOfSubstasksCompleted,
    updateSubstaskMutation
}
}

