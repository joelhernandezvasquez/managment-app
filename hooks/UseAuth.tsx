import { useAuthStore } from "../store/store";
import Swal from 'sweetalert2'
import {kanbanApi} from '../api/kanbanApi';
import { user } from "../types/types";


const UseAuth= () => {

  const {onChecking,onLogin,onLogOut,clearErrorMessage} = useAuthStore();

  const startAuthentication = async({email,password}:user) =>{
    onChecking();

    try{
      const {data} = await kanbanApi.post('/auth',{email,password});
      localStorage.setItem('token',data.token);
      onLogin({name:data.name,uid:data.uid});
    }
    catch(error:any){
    console.log(error);
    const {response} = error;
    const errorMsg = response.data?.errors?.password?.msg || response.data.msg;
    onHandleRequestError(errorMsg);
    }
  }

  const createUser = async ({name,email,password}:user) =>{
    onChecking();
    try{
      const {data} = await kanbanApi.post('/auth/register',{name,email,password});
      localStorage.setItem('token',data.token);
      onLogin({name:data.name,uid:data.uid});
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
    if(!token) return onLogOut('not token available');
    
    try{
    const {data} = await kanbanApi.get('/auth/renew');
    localStorage.setItem('token',data.token);
    onLogin({name:data.name,uid:data.uid});
    }
    catch(error:any){
    localStorage.clear();
     onLogOut(error.msg);
    }
    
    }

  const onHandleRequestError = (errorMsg:string) =>{
   
    Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text:errorMsg
  })
  onLogOut(errorMsg);

  setTimeout(()=>{
   clearErrorMessage();
  },1000)
  }

    return {
      startAuthentication,
      createUser,
      checkAuthToken
      
    }
}

export default UseAuth