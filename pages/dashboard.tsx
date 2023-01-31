import Head from "next/head";
import { MobileNavBar } from "../components/MobileNavBar";

const dashboard = () => {
  return (
    <>
     <Head>
     <title>Dashboard</title>
      <meta name="author" content="Joel Hernandez"/>
      <meta name="description" content='about kanban tasks'/>
      <meta name="keywords" content="kanban,tasks,managment,manage tasks,organize tasks"/>
    </Head>

   <div className="wrapper">
      <header>
        <MobileNavBar/>
      </header>
     
   </div>

    </>
  )
}

export default dashboard