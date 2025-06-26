

'use client';

import styles from './auth.module.css';

import { login, signup } from '@/actions/auth';

export default function Auth({content}) {

console.log(login)
  
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
