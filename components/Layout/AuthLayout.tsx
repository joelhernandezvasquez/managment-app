import Head from "next/head";
import auth from '../../styles/auth.module.css';
import {ReactNode } from 'react';

type authArgs = {
    children: ReactNode,
    titlePage:string
}

const AuthLayout = (props:authArgs) => {
  return (
    <>
    <Head>
    <title>{props.titlePage}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>

   <header className={auth.authHeader}></header>
    
    <main>
      <section className={auth.auth_info}>
      {props.children} 
      </section>
     
    </main>
    </>
  )
}

export default AuthLayout