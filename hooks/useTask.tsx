import { useCallback, useRef,useState,ChangeEvent} from 'react';
import {useMutation,useQueryClient} from '@tanstack/react-query';
import { useAuthStore} from '../store/store';
import { useUIStates,useInputList} from '../hooks';
import { kanbanApi } from '../api/kanbanApi';
import { notifySuccessAlert,notifyErrorAlert, isValidForm,updateSubstasks, deleteTask,updateTask} from '../helpers';
import { BoardInput, BoardListResponse, BoardTask, SubsTask,Task,TaskSubstaskUpdate} from '../types/types';
import { TaskStore } from '../store/TaskStore/store';

export const useTask = () => {
  
  const {user} = useAuthStore();
  const {getActiveBoard} = useUIStates();
  const {areInputListItemsValid,listInput,resetInputList} = useInputList();
  const taskStatusRef = useRef<string>();
  const queryClient = useQueryClient();
  const {activeTask,setActiveTask,resetActiveTask} = TaskStore();
 
  const [task,setTask] = useState({
    name:activeTask.name,
    description:activeTask.description
  })

  const onChangeTask = ({target}:ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) =>{
    const {name,value} = target;
    setTask({...task,[name]:value})
  }

  
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

  const deleteTaskMutation = useMutation({
    mutationFn:(taskId:string) =>{
      return deleteTask(getActiveBoard()._id,taskId);
    },
    onMutate:async (taskId) =>{

      await queryClient.cancelQueries(["getBoard",getActiveBoard()._id]);
      const previousData = queryClient.getQueryData<BoardListResponse>(["getBoard",getActiveBoard()._id]);
     
      if(previousData){
        const updatedTasks = previousData.board_tasks.filter((task)=> task._id !== taskId)
        queryClient.setQueryData(["getBoard",getActiveBoard()._id],{
          ...previousData,
          board_tasks:[
           ...updatedTasks
          ],
        })

        return { previousData }
      }
    },
    onError: (error, variables, context) => {
      if (context?.previousData) {
        notifyErrorAlert('an error occured task was not deleted');
        queryClient.setQueryData(["getBoard",getActiveBoard()._id], context.previousData)
        clearActiveTask();
      }
    },
    onSettled: () => {
      notifySuccessAlert('task has been deleted');
      queryClient.invalidateQueries({ queryKey:["getBoard",getActiveBoard()._id] })
      clearActiveTask();
    },

  })

  const updateTaskMutation = useMutation({
    mutationFn:(task:BoardTask) =>{
     return updateTask((getActiveBoard()._id),task);
    },
    onMutate: async (task) =>{
      const {_id:taskId} = task;
      await queryClient.cancelQueries(["getBoard",getActiveBoard()._id]);
      const previousData = queryClient.getQueryData<BoardListResponse>(["getBoard",getActiveBoard()._id]);

    
      if(previousData){
        const updatedTasks = previousData.board_tasks.map((taskElement)=>{
          if(taskElement._id === taskId ){
            return {...task}
          }
          return taskElement;
        })
        queryClient.setQueryData(["getBoard",getActiveBoard()._id],{
          ...previousData,
          board_tasks:[
           ...updatedTasks
          ],
        })
        return { previousData }
      }
       
    },
   onError(error, variables, context) {
    if (context?.previousData) {
      notifyErrorAlert('an error occured task was not updated');
      queryClient.setQueryData(["getBoard",getActiveBoard()._id], context.previousData)
      clearActiveTask();
    }
   },
   onSettled(data, error, variables, context) {
    notifySuccessAlert('task has been updated');
    queryClient.invalidateQueries({ queryKey:["getBoard",getActiveBoard()._id] })
    clearActiveTask();
   },
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

const getListOfTasksByStatus = useCallback( (listOfTasks: BoardTask [],status:string) =>{
return listOfTasks.filter((task)=> task.status === status)
},[])

const getTotalOfSubstasksCompleted = (substasks:SubsTask []):number =>{
  
  const completedSubstasks = substasks.reduce((accumulator:number,substask:SubsTask)=>{ 
    if(substask.complete){
      accumulator++;
     }
     return accumulator
  },0)
  
  return completedSubstasks;
}

const getActiveTask = () =>{
 return activeTask;
}

const setCurrentTask = (task:BoardTask) =>{
  setActiveTask(task);
}

const clearActiveTask = () =>{
  resetActiveTask();
}

const areSubtasksValid = (substaskList:BoardInput[]):boolean =>{
 
 if(substaskList.length === 0) return false;
 
  return substaskList.map((subtask)=> subtask.column)
        .every((substask)=> substask.length > 0);
}

const hasTaskStatusNotBeenSelected = ():boolean =>{
  return !taskStatusRef.current
}

  return {
    task,
    onChangeTask,
    taskStatusRef,
    setTaskStatus,
    resetTaskStatus,
    isTaskStatusValid,
    mappedSubstask,
    submitAddTaskForm,
    getTotalOfSubstasksCompleted,
    updateSubstaskMutation,
    getListOfTasksByStatus,
    deleteTaskMutation,
    updateTaskMutation,
    areSubtasksValid,
    getActiveTask,
    setCurrentTask,
    clearActiveTask,
    hasTaskStatusNotBeenSelected

}
}

