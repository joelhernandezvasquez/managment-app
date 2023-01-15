import { useMemo,FormEvent } from "react";
import { UseForm } from "../../hooks/UseForm";
import FormField from '../FormField/FormField';
import { registerFormData } from "../../types/types";
import styles from '../../styles/share.module.css';
import button from '../../styles/buttons/buttons.module.css';

const registerForm:registerFormData = {name:'',email:'',password:'' }

const RegisterForm = () => {
    const {formSubmitted,name,email,password,handleChange,setFormSubmitted}  = UseForm<registerFormData>(registerForm);
    
    const nameField = useMemo(()=>{
        if(!formSubmitted) return 
         return name.length > 0 ? '':'invalid_field'; 
     },[name,formSubmitted])
 
     const emailField = useMemo(()=>{
         if(!formSubmitted) return 
          return email.length > 0 ? '':'invalid_field'; 
      },[email,formSubmitted])

      const passwordField = useMemo(()=>{
        if(!formSubmitted) return 
         return password.length > 0 ? '':'invalid_field'; 
     },[password,formSubmitted])

  const onSubmitRegisterForm = (e:FormEvent<HTMLFormElement>):void =>{
    e.preventDefault(); 
    setFormSubmitted(true); 
    if(nameField === 'invalid_field' ||  emailField === 'invalid_field' || passwordField==='invalid_field'){
        alert('registration failed');
        return;
      }
         alert ('registration send');
  }
    
      return (
    <form className={styles.padding_top} onSubmit={onSubmitRegisterForm}>
      <FormField>
      <label className={`${styles.capitalize} ${styles.label} ${nameField === 'invalid_field' ? styles.show_invalid:''}`} htmlFor="name">name</label>
      <input 
      className={`${styles.primary_input} ${nameField === 'invalid_field' ? styles.invalid_field:''} `} 
      type="text" 
      id="name"
      name='name' 
      value={name} 
      onChange = {handleChange}
      />
    </FormField>
   
    <FormField>
      <label className={`${styles.capitalize} ${styles.label} ${emailField === 'invalid_field' ? styles.show_invalid:''}`} htmlFor="email">email</label>
      <input 
      className={`${styles.primary_input} ${emailField === 'invalid_field' ? styles.invalid_field:''} `} 
      type="email" 
      id="emailRegister"
      name='email' 
      value={email} 
      onChange = {handleChange}
      />
    </FormField>

    <FormField>
      <label className={`${styles.capitalize} ${styles.label} ${passwordField === 'invalid_field' ? styles.show_invalid:''}`} htmlFor="password">password</label>
      <input 
      className={`${styles.primary_input} ${passwordField === 'invalid_field' ? styles.invalid_field:''} `} 
      type="password" 
      id="passwordRegister"
      name='password' 
      value={password} 
      onChange = {handleChange}
      />
    </FormField>

    <button className={`${button.btn_primary} ${button.auth_submit_btn}`} type="submit">
     register
     </button>
    </form>
  )
}

export default RegisterForm