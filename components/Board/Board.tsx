import { BoardMenu } from './BoardMenu';
import { DarkLightModeToogle } from './DarkLightModeToogle';
import dashboard from '../../styles/dashboard.module.css';

export const Board = () => {
  
  return (
    <div className={dashboard.board_container}>
      <section>
         <BoardMenu/>
      </section>

      <section>
        <DarkLightModeToogle/>
      </section>

   
    </div>
  )
}
