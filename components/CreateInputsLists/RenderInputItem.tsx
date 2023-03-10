import {FC} from 'react';
import { useInputList } from '../../hooks/useInputList';
import { BoardInput } from '../../types/types';
import share from '../../styles/share.module.css';
import list from '../../styles/inputList.module.css';

interface ItemListProp{
    inputItem:BoardInput,
    indexInputItem:number,
   }

export const RenderInputItem:FC <ItemListProp>= ({inputItem,indexInputItem}) => {
  
  const {updateListInput,deleteInput,isCurrentInputEmpty} =  useInputList();

    return (
      <li key={inputItem.id} 
          className={`${share.d_flex} 
          ${share.d_align_flex_center}
          ${share.d_flex_space_between} 
          ${share.d_flex_gap_16} ${list.list_input}`}
       >
        
      <input className={`${share.primary_input} ${share.d_flex_grow} ${(isCurrentInputEmpty && inputItem.column.length < 1) && `${share.invalid_input}`}`}
         type="text"
         name={inputItem.column}
         value={inputItem.column}
         onChange={(event)=>updateListInput(event,indexInputItem)}
         placeholder={`${isCurrentInputEmpty && inputItem.column.length < 1 ? 'Cannot be empty':''}`}
       />
 
       <svg  width="15" height="15" viewBox="0 0 15 15" fill="red" onClick={()=>deleteInput(inputItem.id)}>
         <rect
           x="12.7279"
           width="3"
           height="18"
           transform="rotate(45 12.7279 0)"
           fill= {`${isCurrentInputEmpty && inputItem.column.length < 1 ? '#EA5555' : '#828FA3 '}`}
         />
         <rect
           y="2.12109"
           width="3"
           height="18"
           transform="rotate(-45 0 2.12109)"
           fill= {`${isCurrentInputEmpty && inputItem.column.length < 1 ? '#EA5555' : '#828FA3 '}`}
         />
       </svg>
     </li>
  )
}
