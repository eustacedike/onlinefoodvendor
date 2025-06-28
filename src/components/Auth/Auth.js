

'use client';

import styles from './auth.module.css';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { login, signup } from '@/actions/auth';
import { createClient } from '@/utils/supabase/client'; // must use client here


export default function Auth({content}) {

// console.log(login)
  const router = useRouter();
  
    useEffect(() => {
      const supabase = createClient()
  
      const fetchProfile = async () => {
        const { data: userData, error: userError } = await supabase.auth.getUser()
  
        if (userData?.user) {
          router.push('/profile')
          return
        }

      }
  
      fetchProfile()
    }, [])
    
    
  return (
    <form className={styles.loginContainer}>
      <h2 className={styles.title}>{content} <hr /></h2>

      <div className={styles.inputGroup}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name='email' placeholder="you@example.com" required />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name='password' placeholder="••••••••" required />
      </div>

      <button type="submit" className={styles.loginButton} formAction={login}>{content}</button>
    </form>
  );
}
