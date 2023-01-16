import {useMemo} from 'react'
import {RequiredInputArgs} from '../../types/types';
import styles from '../../styles/share.module.css';

const FormFieldRequired = (props:RequiredInputArgs) => {
    
    const inputFieldValidator = useMemo(()=>{
        if(!props.isFormSubmitted) return 
         return props.fieldState.length > 0 ? '':'invalid_field'; 
     },[props.fieldState,props.isFormSubmitted])

  return (
    <div className={styles.form_field}>
      <label 
      className={`${styles.capitalize} ${styles.label} ${inputFieldValidator === 'invalid_field' ? styles.show_invalid:''}`} htmlFor={props.name}>
        {props.labelName}
    </label>

    <input className={`${styles.primary_input} ${inputFieldValidator === 'invalid_field' ? styles.invalid_field:''} `} 
      type={props.type}
      id={props.id}
      name={props.name} 
      placeholder = {props.placeholderText}
      value={props.fieldState} 
      onChange = {props.onChangeHandler}
   />
    
    </div>
  )
}

export default FormFieldRequired