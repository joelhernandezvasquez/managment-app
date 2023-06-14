import Image from 'next/image';
import { Board } from '../Board/Board';
import logo from '../../assets/Group 16.svg';
import style from '../../styles/dashboard.module.css';

export const DesktopSideBar = () => {
  return (
    <section className={style.desktop_side_bar}>
    <Image
    className={style.desktop_logo}
    src={logo}
    width={153}
    height ={25.33}
    alt='company logo'
    />
    <Board/>

    </section>
  )
}
