
import { useBoard } from '../../hooks/useBoard';
import { BoardItem } from './BoardItem';
import Loader from '../Loaders/Loader';
import dashboard from '../../styles/dashboard.module.css';

export const RenderBoardMenu = () => {
  
  const {board_names,isLoading,isError} = useBoard();


  if (isLoading) {
    return  <Loader/>
  }

  if(isError){
    return <p className={dashboard.not_board_create_message_error}>No board has not been created yet.</p>
  }

  return (
    <div className={dashboard.board_menu}>
    <h2 className={dashboard.board_menu_headline}>all boards ({board_names.length})</h2>
   
    <ul className={dashboard.board_items}>
        {board_names.map((item)=>{
        return <BoardItem  key={item._id} item={item}/>
        })}
    </ul>
   </div>
  )
}
