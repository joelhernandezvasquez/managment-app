import { useBoard, useUIStates } from '../../hooks';
import dashboard from '../../styles/dashboard.module.css';
import button from '../../styles/buttons/buttons.module.css';

export const DeleteBoard = () => {
 
    const {getActiveBoard,onToogleBoardMenu} = useUIStates();
    const {removeBoard} = useBoard();

    const startDeletingBoard = () =>{
        removeBoard(getActiveBoard()._id);
    }
   
    return (
    <div>
      <p className={dashboard.prompt}>{`Are you sure you want to delete the ‘${getActiveBoard().name}’ board? 
        This action will remove all columns and tasks and cannot be reversed.`}
     </p>
     <button className={button.delete_button} onClick={startDeletingBoard}>Delete</button>
     <button className={button.input_list_btn} onClick={onToogleBoardMenu}> Cancel </button>
    </div>
  )
}
