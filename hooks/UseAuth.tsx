import { useAuthStore } from "../store/store";
import Swal from 'sweetalert2'
import {kanbanApi} from '../api/kanbanApi';

interface user {
 name:string,
 email:string,
 password:string,
}

const UseAuth= () => {

  const {onChecking,onLogin,onLogOut,clearErrorMessage} = useAuthStore();

  const createUser = async ({name,email,password}:user) =>{
    onChecking();
    try{
      const {data} = await kanbanApi.post('/auth/register',{name,email,password});
      console.log(data); 
      localStorage.setItem('token',data.token);
      onLogin({name:data.name,uid:data.uid});
    }
    catch(error:any){
      console.log(error);
      const {response} = error;
      const errorMsg = response.data.errors?.password?.msg || response.data.msg 
     
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
  }
    return {
      createUser,
      
    }
}

export default UseAuth