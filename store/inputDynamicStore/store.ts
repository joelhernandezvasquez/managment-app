
import { create } from 'zustand';
import { devtools} from 'zustand/middleware'
import { BoardInput } from '../../types/types';
import { v4 as uuidv4 } from 'uuid';

interface InputListProps{
    inputList:BoardInput [],
    isCurrentInputEmpty:boolean,
    addNewListItem:(payload:BoardInput ) => void,
    insertAnEntireList:(payload:BoardInput []) => void,
    updateListItem:(payload:BoardInput []) => void,
    deleteItemFromInputList:(itemId:string) => void,
    updateIsCurrentInputEmpty:(payload:boolean) => void,
    resetListItem:() => void
}

export const InputListStore = create <InputListProps>()(
    devtools(
        (set) => ({
            inputList:[{id:uuidv4(),column:''}],
            isCurrentInputEmpty:false,

           addNewListItem:(payload) =>  set((state)=> ({
            inputList: [...state.inputList,payload] 
          })),

          insertAnEntireList:(payload) =>  set((state)=> ({
            inputList: payload 
            
          })),

          updateListItem:(payload) =>  set((state)=> ({
            inputList: payload 
          })),

          deleteItemFromInputList:(itemId) =>  set((state)=> ({
            inputList: state.inputList.filter((itemInput:BoardInput)=> itemInput.id !== itemId)
          })),

          updateIsCurrentInputEmpty:(payload) => set((state) => ({
            isCurrentInputEmpty:payload
          })),
          
          resetListItem:() => set((state)=>({
            inputList:[{id:uuidv4(),column:'example'}]
          }))

        }),
       
      
    )
  )

 