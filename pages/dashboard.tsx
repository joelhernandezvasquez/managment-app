import Head from "next/head";
import { useBoard } from '../hooks/useBoard';
import { useUIStates } from "../hooks";
import { MobileNavBar } from "../components/MobileNavBar";
import { DesktopNavBar } from "../components/DesktopNavBar/DesktopNavBar";
import { RenderMain } from '../components/RenderMain/RenderMain';
import { DesktopSideBar } from "../components/DesktopSideBar/DesktopSideBar";
import Loader from '../components/Loaders/Loader';
import DefaultScreen from "../components/DefaultScreen/DefaultScreen";
import style from '../styles/dashboard.module.css';

const Dashboard = () => {
  const {boards,isLoading} = useBoard();
  const {desktopSideBarStatus,theme} = useUIStates()
  
  if (isLoading) {
    return  <Loader/>
  }

  return (
    <>
     <Head>
     <title>Dashboard</title>
      <meta name="author" content="Joel Hernandez"/>
      <meta name="description" content='about kanban tasks'/>
      <meta name="keywords" content="kanban,tasks,managment,manage tasks,organize tasks"/>
    </Head>

   <div className={`${style.wrapper} ${desktopSideBarStatus === 'close' && style.shrink} ${theme ==='dark' && 'dark'}`}>
    {
      boards?.length! > 0 ? (
        <>
        <header>
        <MobileNavBar/>
        <DesktopNavBar/>
      </header>

      <DesktopSideBar/>
      
      <main>
        <RenderMain/>
      </main>
      </>
      )
      :
    <DefaultScreen/>
    }
   </div>

    </>
  )
}

export default Dashboard