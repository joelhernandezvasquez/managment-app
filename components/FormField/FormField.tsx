import { FC, ReactNode } from 'react';
import styles from '../../styles/share.module.css';

interface FormFieldArgs {
    children:ReactNode
}

const FormField:FC<FormFieldArgs>= ({children}) => {
  return (
    <div className={styles.form_field}>
      {children}
    </div>
  )
}

export default FormField