
import { useState,ChangeEvent } from "react"
export function UseForm<T> (initialState:T){

  const [formValues,setFormValues] = useState(initialState);
  const [formSubmitted,setFormSubmitted] = useState(false);


  const handleChange = ({target}:ChangeEvent<HTMLInputElement>):void => {
     const {name,value}  = target;
      setFormValues({...formValues,[name]:value});
  }

  return{
     ...formValues,
     formValues,
     formSubmitted,

     handleChange,
     setFormSubmitted
  }
}
