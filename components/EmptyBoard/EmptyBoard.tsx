import button from '../../styles/buttons/buttons.module.css';
import style from '../../styles/dashboard.module.css';

export const EmptyBoard = () => {
  return (
    <div className={style.empty_board}>
       <p>
         This board is empty. Create a new column to get started.
       </p>

       <button className={`${button.btn_primary} ${button.add_column_btn}`}>
        <span>+</span>
        Add new Column
       </button>
    </div>
  )
}
