import { RenderBoardMenu } from './renderBoardMenu';
import { DarkLightModeToogle } from './DarkLightModeToogle';
import dashboard from '../../styles/dashboard.module.css';
import { RenderCreateNewBoardButton } from '../RenderCreateNewBoardButton/RenderCreateNewBoardButton';

export const Board = () => {
  
  return (
    <div className={dashboard.board_container}>
      <section>
         <RenderBoardMenu/>
         <RenderCreateNewBoardButton/>
      </section>

      <section>
        <DarkLightModeToogle/>
      </section>

   
    </div>
  )
}
