import { LoginForm } from "../components/LoginForm/LoginForm";
import Link from "next/link";
import AuthLayout from "../components/Layout/AuthLayout";
import auth from '../styles/auth.module.css'; 
import styles from '../styles/share.module.css';
import typografy from '../styles/typography.module.css';

const login = () => {
  
return (
   <AuthLayout title='Sign in'>
    <h1 className={`${typografy.larger_font} ${styles.text_center}`}>Sign in to your account </h1>
    <p className={`${auth.subheading} ${styles.text_center}`}>Not a member yet?
     <Link className={auth.primary_auth_link} href="/signUp">Get started now</Link> 
    </p>
    <LoginForm/>
   </AuthLayout>
  )
}

export default login