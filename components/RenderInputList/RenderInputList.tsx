import {FC, useCallback,FormEvent} from 'react';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { BoardInput } from '../../types/types';
import share from '../../styles/share.module.css';
import style from '../../styles/inputList.module.css';
import button from '../../styles/buttons/buttons.module.css';
import { useTask } from '../../hooks';

interface InputListProps{
    listName:string,
    buttonName:string,
    listOfInputs?: BoardInput [],
    addInputToList:() => void,
    updateInputToList:(substaskId:string,text:string) => void,
    deleteInputFromList:(substaskId:string) => void,
    formSent:boolean
  }

export const RenderInputList:FC<InputListProps> = ({listName,buttonName,listOfInputs,addInputToList,updateInputToList,deleteInputFromList,formSent}) => {
  const{areSubtasksValid} = useTask();

  return (
   <section className={style.container}>
   
     <p className={style.title}>{listName}</p>
     
     <ul className={style.list}>
       {
        
         listOfInputs?.length! > 0 ? 
            (listOfInputs?.map((list)=>{
            return ( 
                <li key={list.id}
                className=
                {`${share.d_flex} 
                ${share.d_align_flex_center}
                ${share.d_flex_space_between} 
                ${share.d_flex_gap_16} 
                ${style.list_input}
                `}
                >

       <input className={`${share.primary_input} ${share.d_flex_grow}`}
         type="text"
         name={list.id}
         value={list.column}
         onChange={(event)=> updateInputToList(list.id,event.target.value)}
       />
       <svg  width="15" height="15" viewBox="0 0 15 15" fill="red" onClick={()=> deleteInputFromList(list.id)}>
         <rect
           x="12.7279"
           width="3"
           height="18"
           transform="rotate(45 12.7279 0)"
           fill= { '#828FA3 '}
         />
         <rect
           y="2.12109"
           width="3"
           height="18"
           transform="rotate(-45 0 2.12109)"
           fill= {'#828FA3'}
         />
       </svg>

         </li>
            )}))
         
         :
         (
            ''
         )
        
       }
     </ul>
    {!areSubtasksValid(listOfInputs ?? []) && formSent ?   <ErrorMessage>cannot have empty substask.</ErrorMessage> :'' }
   
     <button className={button.input_list_btn} onClick={addInputToList} type='button'>{buttonName}</button>
   </section>
  )
}
