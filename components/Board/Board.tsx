
import { RenderBoardMenu } from './RenderBoardMenu';
import { DarkLightModeToogle } from './DarkLightModeToogle';
import { RenderCreateNewBoardButton } from '../RenderCreateNewBoardButton/RenderCreateNewBoardButton';
import dashboard from '../../styles/dashboard.module.css';
import { LogOut } from '../LogOut/LogOut';

export const Board = () => {
 
  return (
    <section className={dashboard.board_container}>
      <article>
         <RenderBoardMenu/>
         <RenderCreateNewBoardButton/>
      </article>

      <article>
        <LogOut/>
      </article>

      <article>
        <DarkLightModeToogle/>
      </article>

    </section>
  )
}
