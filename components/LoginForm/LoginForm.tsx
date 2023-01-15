import { FormEvent,useMemo} from "react";
import { UseForm } from "../../hooks/UseForm";
import FormField from "../FormField/FormField";
import { FormData} from "../../types/types";
import styles from '../../styles/share.module.css';
import button from '../../styles/buttons/buttons.module.css';

const loginForm:FormData = { email:'',password:'' }

export const LoginForm = () => {
    const {formSubmitted,email,password,handleChange,setFormSubmitted}  = UseForm<FormData>(loginForm);

    const emailField = useMemo(()=>{
       if(!formSubmitted) return 
        return email.length > 0 ? '':'invalid_field'; 
    },[email,formSubmitted])

    const passwordField = useMemo(()=>{
        if(!formSubmitted) return 
         return password.length > 0 ? '':'invalid_field'; 
     },[password,formSubmitted])
    
    const onSubmitFormLogin = (e:FormEvent<HTMLFormElement>):void =>{
        e.preventDefault(); 
        setFormSubmitted(true); 
        if(emailField === 'invalid_field' || passwordField==='invalid_field'){
          alert('login failed');
          return;
        }
           alert ('login send');
           
    }
   
    return (
    <form className={styles.padding_top} onSubmit ={onSubmitFormLogin}>
    <FormField>
      <label className={`${styles.capitalize} ${styles.label} ${emailField === 'invalid_field' ? styles.show_invalid:''}`} htmlFor="email">email address</label>
      <input 
      className={`${styles.primary_input} ${emailField === 'invalid_field' ? styles.invalid_field:''}`} 
      type="email" 
      id="emailLogin"
      name='email' 
      placeholder="demo@gmail.com"
      value={email} 
      onChange = {handleChange}
      />
    </FormField>

    <FormField>
      <label className={`${styles.capitalize} ${styles.label} ${passwordField === 'invalid_field' ? styles.show_invalid:''}`} htmlFor="password">password</label>
      <input className={`${styles.primary_input} ${passwordField === 'invalid_field' ? styles.invalid_field:''}`} 
      type="password" 
      name='password' 
      id="emailPassword"
      value={password}
      onChange = {handleChange}
      />
    </FormField>

    <button className={`${button.btn_primary} ${button.auth_submit_btn}`} type="submit">
     sign in
     </button>
 </form>
  )
}
