
import {RequiredInputArgs} from '../../types/types';
import styles from '../../styles/share.module.css';

const RequiredInput = (props:RequiredInputArgs) => {
  return (
   <input className={`${styles.primary_input} ${props.inputValidator === 'invalid_field' ? styles.invalid_field:''} `} 
      type={props.type}
      id={props.id}
      name={props.name} 
      placeholder = {props.placeholderText}
      value={props.fieldState} 
      onChange = {props.onChangeHandler}
   />
  )
}

export default RequiredInput