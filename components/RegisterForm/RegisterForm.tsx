import {FormEvent } from "react";
import { UseForm } from "../../hooks/UseForm";
import UseAuth from "../../hooks/UseAuth";
import FormFieldRequired from "../FormField/FormFieldRequired";
import { registerFormData } from "../../types/types";
import styles from '../../styles/share.module.css';
import button from '../../styles/buttons/buttons.module.css';
import { isValidForm } from "../../helpers";

const registerForm:registerFormData = {name:'',email:'',password:'' }

const RegisterForm = () => {
    const {formSubmitted,name,email,password,handleChange,setFormSubmitted}  = UseForm<registerFormData>(registerForm);
    const {createUser}  = UseAuth();
  
    const onSubmitRegisterForm = (e:FormEvent<HTMLFormElement>):void =>{
    e.preventDefault(); 
    setFormSubmitted(true); 

    if(isValidForm({name,email,password})){
      setFormSubmitted(false);
      createUser({name,email,password});
      return;
    }
     
  }
    
    return (
    <form className={styles.padding_top} onSubmit={onSubmitRegisterForm}>
      <FormFieldRequired
        labelName ={'name'}
        type = "text"
        id="name"
        name="name"
        placeholderText = "Name"
        fieldState={name} 
        onChangeHandler = {handleChange}
        isFormSubmitted = {formSubmitted}
    />

     <FormFieldRequired
        labelName ={'email'}
        type = "email"
        id="emailRegister"
        name="email"
        placeholderText = "demo@gmail.com"
        fieldState={email} 
        onChangeHandler = {handleChange}
        isFormSubmitted = {formSubmitted}
    />

       <FormFieldRequired
          labelName ={'password'}
          type = "password"
          id="passwordRegister"
          name="password"
          fieldState={password} 
          onChangeHandler = {handleChange}
          isFormSubmitted = {formSubmitted}
     />
      
    <button className={`${button.btn_primary} ${button.auth_submit_btn}`} type="submit">
     register
     </button>
    </form>
  )
}

export default RegisterForm