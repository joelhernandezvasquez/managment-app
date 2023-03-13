import {FC} from 'react';

interface Prop{
    activeItem:string,
    itemAction:string,
    selectBoardItem:(activeItem:string) => void 
}

export const RenderActiveBoardMenuItem:FC<Prop>= ({activeItem,itemAction,selectBoardItem}) => {
    return (
   <li onClick={()=>selectBoardItem(itemAction)}>
    {activeItem}
   </li>
  )
}
