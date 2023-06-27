import { create } from 'zustand';
import { devtools} from 'zustand/middleware';

interface DragAndDropStoreProps{
   isDragging:boolean,
    startDragging:() => void,
    endDragging:() => void
}

export const DragAndDropStore = create <DragAndDropStoreProps>()(
    devtools(
        (set) => ({
            isDragging:false,

              startDragging:() =>  set((state)=> ({
               isDragging:true
              })),
    
             endDragging:() =>  set((state)=> ({
               isDragging:false
              })),

        }),
))