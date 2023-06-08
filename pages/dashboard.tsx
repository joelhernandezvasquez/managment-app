import Head from "next/head";
import { useBoard } from '../hooks/useBoard';
import { MobileNavBar } from "../components/MobileNavBar";
import { RenderMain } from '../components/RenderMain/RenderMain';
import Loader from '../components/Loaders/Loader';
import style from '../styles/dashboard.module.css';
import DefaultScreen from "../components/DefaultScreen/DefaultScreen";

const Dashboard = () => {
  const {boards,isLoading} = useBoard();
  
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

   <div className={style.wrapper}>
    {
      boards?.length! > 0 ? (
        <>
        <header>
        <MobileNavBar/>
      </header>
      
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