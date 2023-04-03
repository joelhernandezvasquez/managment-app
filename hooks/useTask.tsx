import {useMutation} from '@tanstack/react-query';
import { useAuthStore} from '../store/store';
import { useUIStates } from './useUIStates';
import { BoardInput, BoardTask, SubsTask } from '../types/types';
import { kanbanApi } from '../api/kanbanApi';
import { notifySuccessAlert,notifyErrorAlert } from '../helpers';

export const useTask = () => {
  
  const {user} = useAuthStore();
  const {getActiveBoard} = useUIStates();

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
      notifySuccessAlert('Task has been created.');
      return response.data;
    }
    catch(error:any){
      console.error(error);
      const {response} = error;
      notifyErrorAlert(response.data.message);
    }

  }

  const mappedSubstask = (listOfInput:BoardInput []):SubsTask [] =>{
    return listOfInput.map((substask)=> {
      return{
        name:substask.column,
        complete:false
      }
   })

  }
  
  return {
    mappedSubstask,
    createTaskMutation
}
}
