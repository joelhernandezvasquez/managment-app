import { RenderBoardMenu } from './RenderBoardMenu';
import { DarkLightModeToogle } from './DarkLightModeToogle';
import { RenderCreateNewBoardButton } from '../RenderCreateNewBoardButton/RenderCreateNewBoardButton';
import dashboard from '../../styles/dashboard.module.css';

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
