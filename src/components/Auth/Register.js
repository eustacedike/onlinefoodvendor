

'use client';

import styles from './auth.module.css';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import {  signup } from '@/actions/auth';
import { createClient } from '@/utils/supabase/client'; // must use client here
import { useActionState } from 'react';

import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons for password visibility toggle



export default function Register() {

   const [state, formAction, isPending] = useActionState(signup, null)
   const [showPassword, setShowPassword] = useState(false);
   const [showPasswordTwo, setShowPasswordTwo] = useState(false);
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
    <form className={styles.loginContainer}
    action={formAction}
    >
      <h2 className={styles.title}> Register <hr /></h2>

      <div className={styles.inputGroup}>
        <div>
        <label htmlFor="name">Full Name</label>
        <input type="name" id="name" name='name' placeholder="John Doe" required />
        </div>
      </div>

      <div className={styles.inputGroup}>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name='email' placeholder="you@example.com" required />
        </div>
        <div>
        <label htmlFor="phone">Phone Number</label>
        <input type="phone" id="phone" name='phone' placeholder="08030001111" required />
        </div>
      </div>

      <div className={styles.inputGroup}>
      <div>
        <label htmlFor="confirmPassword">Password</label>
        <input type={showPassword ? 'text' : 'password'} id="confirmPassword" name='confirmPassword' placeholder="Enter Password" required />
      </div>
      <div
        onClick={() => setShowPassword((prev) => !prev)}
        className={styles.passwordToggle}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </div>
      </div>
      <div className={styles.inputGroup}>
      <div>
        <label htmlFor="password">Confirm Password</label>
        <input type={showPasswordTwo ? 'text' : 'password'} id="password" name='password' placeholder="Re-enter Password" required />
      </div>
      <div
        onClick={() => setShowPasswordTwo((prev) => !prev)}
        className={styles.passwordToggle}
      >
        {showPasswordTwo ? <FaEyeSlash /> : <FaEye />}
      </div>
      </div>
      <button type="submit" className={styles.loginButton}
      disabled={isPending}
      > {isPending ? 'Signing up…' : 'Signup'}</button>
      {state?.error && (
        <div className="error-message" style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>
          <small>{state.error}</small>
        </div>
      )}
    </form>
  );
}
