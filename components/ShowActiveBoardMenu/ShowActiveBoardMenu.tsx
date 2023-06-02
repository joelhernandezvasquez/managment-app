import { useState } from 'react';
import { RenderActiveBoardMenuItem } from '../RenderActiveBoardMenuItem/RenderActiveBoardMenuItem';
import { SelectBoardAction } from '../SelectBoardAction/SelectBoardAction';
import { activeBoardItems } from '../../constants';
import navigation from '../../styles/navigation.module.css';

export const ShowActiveBoardMenu = () => {
 const [activeBoardItem,setActiveBoardItem] = useState('');
    
 const selectBoardItem = (selectedBoardItem:string) =>{
    setActiveBoardItem(selectedBoardItem);
 }

 return (
    <aside className={navigation.active_board_menu} onClick={(event)=> event.stopPropagation()}>
              <ul>
             {activeBoardItems.map(({id,item,action})=>{
                return <RenderActiveBoardMenuItem key={id} activeItem = {item} itemAction = {action} selectBoardItem={selectBoardItem}/>
             })}
              </ul> 
      {activeBoardItem && <SelectBoardAction boardAction={activeBoardItem}/>}
   </aside>
  )
}
