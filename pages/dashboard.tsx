import Head from "next/head";
import { EmptyBoard } from "../components/EmptyBoard/EmptyBoard";
import { MaxWidthWrapper } from "../components/MaxWidthWrapper/MaxWidthWrapper";
import { MobileNavBar } from "../components/MobileNavBar";
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
         <EmptyBoard/>
      </main>
     
   </div>

    </>
  )
}

export default dashboard