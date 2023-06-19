import { useRouter } from 'next/router';
import { useAuthStore } from "../store/store";
import { notifyErrorAlert } from '../helpers';
import {kanbanApi} from '../api/kanbanApi';
import { user } from "../types/types";
import { useUIStates } from './useUIStates';
import { fetchAllBoards } from '../services';

const UseAuth= () => {
  const router = useRouter();

  const {onChecking,onLogin,onLogOut,clearErrorMessage,status} = useAuthStore();
  const{resetBoardSelected,closeBoardMenuWindow,closeMenuSideBar,setActiveBoard,setDesktopSideBar} = useUIStates();

  const startAuthentication = async({email,password}:user) =>{
    onChecking();

    try{
      const {data} = await kanbanApi.post('/auth',{email,password});
      localStorage.setItem('token',data.token);
      onLogin({name:data.name,uid:data.uid});
      router.push("/dashboard ");
      setDefaultBoardView();
      setDesktopSideBar('display');
    }
    catch(error:any){
    console.log(error);
    const {response} = error;
    const errorMsg = response.data?.errors?.password?.msg || response.data.msg;
    onHandleRequestError(errorMsg);
    }
  }

  const setDefaultBoardView= async () =>{
    try{
      const {boards} = await fetchAllBoards();
       if(boards.length > 0){
         setActiveBoard({_id:boards[0]._id,name:boards[0].name});
       }
    }
    catch(error){
      console.log(error);
      throw new Error('Error at fetching');
    }
   
  }

  const createUser = async ({name,email,password}:user) =>{
    onChecking();
    try{
      const {data} = await kanbanApi.post('/auth/register',{name,email,password});
      localStorage.setItem('token',data.token);
      onLogin({name:data.name,uid:data.uid});
      router.push("/dashboard ");
    }
    catch(error:any){
      console.log(error);
      const {response} = error;
      const errorMsg = response.data.errors?.password?.msg || response.data.msg 
      onHandleRequestError(errorMsg);
   }
  }
  const checkAuthToken = async () =>{
    const token = localStorage.getItem('token');
    
    if(!token) {
     onLogOut('not token avaliable');
     router.push("/login");
     return;
    }
    
    try{
    const {data} = await kanbanApi.get('/auth/renew');
    localStorage.setItem('token',data.token);
    onLogin({name:data.name,uid:data.uid});
    router.push("/dashboard ");
    }
    catch(error:any){
      console.log(error)
     localStorage.clear();
     onLogOut(error.msg);
     router.push("/login");
    }
    
    }

  const onHandleRequestError = (errorMsg:string) =>{
    notifyErrorAlert(errorMsg);
    onLogOut(errorMsg);

  setTimeout(()=>{
   clearErrorMessage();
  },1000)
  }

  const logOutUser = () =>{
     localStorage.clear();
     onLogOut('');
     resetBoardSelected();
     closeBoardMenuWindow();
     closeMenuSideBar();
   
    router.push("/login");
  }

    return {
      status,
      startAuthentication,
      createUser,
      checkAuthToken,
      logOutUser  
    }
}

export default UseAuth