import { create } from 'zustand';
import { devtools} from 'zustand/middleware';
import { BoardTask } from '../../types/types';

interface TaskStoreProps{
    activeTask:BoardTask,
    setActiveTask:(payload:BoardTask) => void,
    resetActiveTask:() => void
}

export const TaskStore = create <TaskStoreProps>()(
    devtools(
        (set) => ({
            activeTask:{
                name:'',
                description:'',
                substasks:[],
                status:'',
                _id:''
              },

              setActiveTask:(payload) =>  set((state)=> ({
                activeTask:payload
              })),
    
              resetActiveTask:() =>  set((state)=> ({
                activeTask:{
                    name:'',
                    description:'',
                    substasks:[],
                    status:'',
                    _id:''
                  }
              })),

        }),
))