import { DragAndDropStore } from "../store";

export const useDragAndDrop = () =>{
const {isDragging,startDragging,endDragging} = DragAndDropStore();
    
const isDraggingActive = ():boolean =>{
    return isDragging;
}

const startDraggingActive = () =>{
    return startDragging();
}

const endDraggingActive = () =>{
    return endDragging();
}
    
return{
     isDraggingActive,
     startDraggingActive,
     endDraggingActive

    }
}