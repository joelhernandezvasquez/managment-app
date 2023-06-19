import Image from 'next/image';
import { Board } from '../Board/Board';
import { useUIStates } from "../../hooks";
import useResize from '../../hooks/useResize';
import ToggleDesktopSideBar from '../ToggleDesktopSideBar/ToggleDesktopSideBar';
import { TABLET_VIEWPORT } from '../../constants';
import logo from '../../assets/Group 16.svg';
import style from '../../styles/dashboard.module.css';


export const DesktopSideBar = () => {
   const {desktopSideBarStatus,setDesktopSideBar} = useUIStates();
   const {currentScreenSize} = useResize();


   const getSidebarClassName = () =>{

    if(currentScreenSize < TABLET_VIEWPORT && desktopSideBarStatus!=='display'){
      setDesktopSideBar('display');
      return;
    }
    
    if(desktopSideBarStatus === 'open'){
        return `${style.show_side_bar}`;
    }
    
    if(desktopSideBarStatus === 'close'){
      return `${style.hide_side_bar}`;
    }
  }
  
  return (
    <aside className={`${style.desktop_side_bar} ${getSidebarClassName()}`}>
    <Image
    className={style.desktop_logo}
    src={logo}
    width={153}
    height ={25.33}
    alt='company logo'
    />
    <Board/>
    
    <ToggleDesktopSideBar/>

    </aside>
  )
}
