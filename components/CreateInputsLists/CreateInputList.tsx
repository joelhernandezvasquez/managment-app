import {FC,MouseEvent,memo} from 'react';
import { BoardInput} from "../../types/types";
import { useInputList } from '../../hooks/useInputList';
import { RenderInputItem } from './RenderInputItem';
import list from '../../styles/inputList.module.css';
import button from '../../styles/buttons/buttons.module.css';

interface InputListProps{
    listName:string,
    buttonName:string,
  }
   
export const CreateInputList:FC<InputListProps> = memo( ({listName,buttonName}) => {
   
  const {listInput,areInputListItemsValid,updateIsCurrentInputEmpty,insertNewListItem} = useInputList();

   const insertNewInputItem  = (event:MouseEvent<HTMLButtonElement>) =>{
         event.preventDefault();
          if(areInputListItemsValid()){
             updateIsCurrentInputEmpty(false);
             insertNewListItem();
            return;
         }
         updateIsCurrentInputEmpty(true);   
   }

  return (
    <div className={list.container}>
       <p className={list.title}>{listName}</p>
       <ul className={list.list}>
        {listInput.map((item:BoardInput,index:number)=>{
         return <RenderInputItem key={item.id} 
                 inputItem={item} 
                 indexInputItem={index}
                  />
        })}
       </ul>
       <button className={button.input_list_btn} onClick={(event)=>insertNewInputItem(event)}>{buttonName}</button>
    </div>
  )
      })
      CreateInputList.displayName = 'CreateInputList';