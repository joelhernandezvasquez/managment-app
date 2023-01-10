import Link from "next/link";
import AuthLayout from "../components/Layout/AuthLayout";
import auth from '../styles/auth.module.css'; 
import styles from '../styles/share.module.css';
import typografy from '../styles/typography.module.css';
import button from '../styles/buttons/buttons.module.css';

const login = () => {
  return (
   <AuthLayout titlePage='Sign in'>
    <h1 className={`${typografy.larger_font} ${styles.text_center}`}>Sign in to your account </h1>
    <p className={`${auth.subheading} ${styles.text_center}`}>Not a member yet?
     <Link className={auth.primary_auth_link} href="/signUp">Get started now</Link> 
    </p>
    <form className={styles.padding_top}>
       <div className={styles.form_field}>
         <label className={`${styles.capitalize} ${styles.label}`} htmlFor="email">email address</label>
         <input className={styles.primary_input} type="email" name='email' id="emailLogin" placeholder="demo@gmail.com"/>
       </div>

       <div className={styles.form_field}>
         <label className={`${styles.capitalize} ${styles.label}`} htmlFor="password">password</label>
         <input className={styles.primary_input} type="password" name='password' id="emailPassword"/>
       </div>

       <button className={`${button.btn_primary} ${button.auth_submit_btn}`} type="submit">sign in</button>
    </form>
   </AuthLayout>
  )
}

export default login