import { StatusIndicator } from '../types/types';
import { v4 as uuidv4 } from 'uuid';

export const activeBoardItems = [
    {
    id:0,
    item:'Edit Board',
    action:'edit'
   },
  
   {
    id:1,
    item:'Delete Board',
    action:'delete'
   }
  
  ]
  
  export const EDIT_TASK = 'update';
  export const DELETE_TASK = 'delete'
  
  export const taskMenu = [
    {
      id:uuidv4(),
      item:'Edit Task',
      action:EDIT_TASK
    },
    {
      id:uuidv4(),
      item:'Delete Task',
      action:DELETE_TASK
    }
  ]
  
  export const listOfStatus = [
    {
      id:uuidv4(),
      status:'Todo'
    },
    {
      id:uuidv4(),
      status:'Doing'
    },
    {
      id:uuidv4(),
      status:'Done'
    },
  
  ]
  
  export const statusIndicator:StatusIndicator= {
    todo:'#49C4E5',
    doing:'#8471F2',
    done:'#67E2AE',
    unknown:'#2E88C2'
  }