import Link from "next/link";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import AuthLayout from "../components/Layout/AuthLayout"
import styles from '../styles/share.module.css';
import typografy from '../styles/typography.module.css';
import auth from '../styles/auth.module.css'; 

const signUp = () => {
  return (
   <AuthLayout titlePage="Sign up">
     <h1 className={`${typografy.larger_font} ${styles.text_center}`}>Create a new Account</h1>
     <p className={`${auth.subheading} ${styles.text_center}`}>Already have an account?
     <Link className={auth.primary_auth_link} href="/login">Sign in</Link> 
    </p>
    <RegisterForm/>
   </AuthLayout>
  )
}

export default signUp