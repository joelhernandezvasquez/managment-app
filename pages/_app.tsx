import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app'
import {Plus_Jakarta_Sans} from '@next/font/google';
import {QueryClient,QueryClientProvider,} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import UseAuth from '../hooks/UseAuth';
import { useSideBar, useUIStates } from '../hooks';
import '../styles/globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets:['latin'],
  weight:['400','500','700']
})
export default function App({ Component, pageProps }: AppProps) {
  const {checkAuthToken} = UseAuth();
  const {closeSideBar} = useSideBar();
  const {closeBoardMenu,setDesktopSideBar} = useUIStates();
  const [queryClient] = useState(()=> new QueryClient);

  useEffect(()=>{
   checkAuthToken();
  
   addEventListener('beforeunload',() => { 
    closeSideBar();
    closeBoardMenu();
   setDesktopSideBar('display');
  });
},[])

  return(
  
     <main className={plusJakartaSans.className}>
      <QueryClientProvider client={queryClient}>
         <Component {...pageProps} />
         <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </main>
   
  )
  
}

