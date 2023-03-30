import {FC, useMemo} from 'react'
import {RequiredInputArgs} from '../../types/types';
import styles from '../../styles/share.module.css';

const FormFieldRequired:FC<RequiredInputArgs> = ({fieldState,isFormSubmitted,labelName,name,type,isTextArea,id,placeholderText,onChangeHandler}) => {
    
    const inputFieldValidator = useMemo(()=>{
        if(!isFormSubmitted) return 
         return fieldState.length > 0 ? '':'invalid_field'; 
     },[fieldState,isFormSubmitted])

  return (
    <div className={`${styles.form_field}`}>
      <label 
      className={`${styles.capitalize} ${styles.label} ${inputFieldValidator === 'invalid_field' ? styles.show_invalid:''}`} htmlFor={name}>
        {labelName}
    </label>

    <input className={`${styles.primary_input} ${isTextArea && styles.text_area_input} ${inputFieldValidator === 'invalid_field' ? styles.invalid_field:''} `} 
      type={type}
      id={id}
      name={name} 
      placeholder = {placeholderText}
      value={fieldState} 
      onChange = {onChangeHandler}
   />
    
    </div>
  )
}

export default FormFieldRequired