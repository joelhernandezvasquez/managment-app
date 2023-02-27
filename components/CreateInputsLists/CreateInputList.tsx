import {FC} from 'react';
import { BoardInput} from "../../types/types";
import { useInputList } from '../../hooks/useInputList';
import { RenderInputItem } from './RenderInputItem';
import list from '../../styles/inputList.module.css';
import button from '../../styles/buttons/buttons.module.css';

interface InputListProps{
    listName:string,
    buttonName:string,
  }
   
export const CreateInputList:FC<InputListProps> = ({listName,buttonName}) => {
   
  const {listInput,insertNewListItem} =  useInputList();

  return (
    <div className={list.container}>
       <p className={list.title}>{listName}</p>
       <ul className={list.list}>
        {listInput.map((item:BoardInput,index:number)=>{
         return <RenderInputItem key={item.id} inputItem={item} indexInputItem={index}/>
        })}
       </ul>
       <button className={button.input_list_btn} onClick={insertNewListItem}>{buttonName}</button>
    </div>
  )
      }