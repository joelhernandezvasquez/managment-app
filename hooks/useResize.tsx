import {useState,useEffect} from 'react';
const useResize = () => {
  const [currentScreenSize,setCurrentScreenSize]= useState(0);

  useEffect(()=>{
     const resetDesktopSidebarStatus = () =>{
        setCurrentScreenSize(window.innerWidth);
     }

     resetDesktopSidebarStatus();

     window.addEventListener('resize',resetDesktopSidebarStatus);

     return ()=>{
        window.removeEventListener('resize',resetDesktopSidebarStatus);
     }
  },[])

  return {
   currentScreenSize
  }
   
  
}

export default useResize