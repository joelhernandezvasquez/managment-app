import { FormEvent} from "react";
import { UseForm } from "../../hooks/UseForm";
import { FormData} from "../../types/types";
import styles from '../../styles/share.module.css';
import button from '../../styles/buttons/buttons.module.css';
import FormFieldRequired from "../FormField/FormFieldRequired";
import { isValidForm } from "../../helpers";
import UseAuth from "../../hooks/UseAuth";

const loginForm:FormData = { email:'',password:'' }

export const LoginForm = () => {
    const {formSubmitted,email,password,handleChange,setFormSubmitted}  = UseForm<FormData>(loginForm);
    const {startAuthentication} = UseAuth();
    
    const onSubmitFormLogin = (e:FormEvent<HTMLFormElement>):void =>{
        e.preventDefault(); 
        setFormSubmitted(true);
        
        if(isValidForm({email,password})){
         setFormSubmitted(false);
         startAuthentication({email,password});
         return;
        }
    }
   
    return (
    <form className={styles.padding_top} onSubmit ={onSubmitFormLogin}>
    
    <FormFieldRequired 
     labelName ={'email address'}
     type = "email"
     id="emailLogin"
     name="email"
     placeholderText ="demo@gmail.com"
     fieldState={email} 
     onChangeHandler = {handleChange}
     isFormSubmitted = {formSubmitted}
    />

    <FormFieldRequired
     labelName ={'password'}
     type = "password"
     id="emailLogin"
     name="password"
     fieldState={password} 
     onChangeHandler = {handleChange}
     isFormSubmitted = {formSubmitted}
    />
    
    <button className={`${button.btn_primary} ${button.auth_submit_btn}`} type="submit">
     sign in
     </button>
 </form>
  )
}
