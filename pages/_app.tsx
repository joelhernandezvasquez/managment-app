
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {Plus_Jakarta_Sans} from '@next/font/google';
import UseAuth from '../hooks/UseAuth';
import { useEffect } from 'react';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets:['latin'],
  weight:['400','500','700']
})
export default function App({ Component, pageProps }: AppProps) {
  const {checkAuthToken} = UseAuth();
useEffect(()=>{
 checkAuthToken();
},[])

  return(
  
     <main className={plusJakartaSans.className}>
      <Component {...pageProps} />
    </main>
   
  )
  
}

