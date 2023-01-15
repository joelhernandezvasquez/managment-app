import { ReactNode } from 'react';
import styles from '../../styles/share.module.css';

interface FormFieldArgs {
    children:ReactNode
}

const FormField = (props:FormFieldArgs) => {
  return (
    <div className={styles.form_field}>
      {props.children}
    </div>
  )
}

export default FormField