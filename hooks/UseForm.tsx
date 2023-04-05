
import { useState,ChangeEvent } from "react"
export function UseForm<T> (initialState:T){

  const [formValues,setFormValues] = useState(initialState);
  const [formSubmitted,setFormSubmitted] = useState(false);


  const handleChange = ({target}:ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>):void => {
     const {name,value}  = target;
      setFormValues({...formValues,[name]:value});
  }
  const resetForm = () =>{
   setFormValues(initialState);
  }

  return{
     ...formValues,
     formValues,
     formSubmitted,

     handleChange,
     setFormSubmitted,
     resetForm
  }
}
