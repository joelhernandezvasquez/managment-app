import Head from "next/head";
import { MobileNavBar } from "../components/MobileNavBar";
import { RenderMain } from '../components/RenderMain/RenderMain';
import style from '../styles/dashboard.module.css';

const dashboard = () => {
  return (
    <>
     <Head>
     <title>Dashboard</title>
      <meta name="author" content="Joel Hernandez"/>
      <meta name="description" content='about kanban tasks'/>
      <meta name="keywords" content="kanban,tasks,managment,manage tasks,organize tasks"/>
    </Head>

   <div className={style.wrapper}>
      <header>
        <MobileNavBar/>
      </header>
      
      <main>
        <RenderMain/>
      </main>
     
   </div>

    </>
  )
}

export default dashboard