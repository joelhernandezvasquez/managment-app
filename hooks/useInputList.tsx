import { ChangeEvent } from 'react';
import {InputListStore}  from '../store/inputDynamicStore/store';
import { v4 as uuidv4 } from 'uuid';

export const useInputList = () => {

const {inputList:listInput,addNewListItem,updateListItem,deleteItemFromInputList,
        resetListItem
      } = InputListStore(); 

const insertNewListItem = () =>{
    addNewListItem({id:uuidv4(),column:''});
}

const updateListInput = ({target}:ChangeEvent<HTMLInputElement>,indexList:number):void =>{
    const {value} = target; 
   
    const updatedList = listInput.map((list,currentIndex:number)=>{
       if(indexList === currentIndex){
       return {
         id:list.id,
         column:value
       }
      }
       return list;
    })
   updateListItem(updatedList);
}

const deleteInput = (itemId:string) =>{
   deleteItemFromInputList(itemId);
}

    
    return{
        listInput,
        insertNewListItem,
        updateListInput,
        deleteInput
    }
}
