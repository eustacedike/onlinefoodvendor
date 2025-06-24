

'use client';

import styles from './auth.module.css';

export default function Auth({content, onSubmit}) {


  
  return (
    <form className={styles.loginContainer} onSubmit={onSubmit}>
      <h2 className={styles.title}>{content} <hr /></h2>

      <div className={styles.inputGroup}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="you@example.com" required />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="••••••••" required />
      </div>

      <button type="submit" className={styles.loginButton}>{content}</button>
    </form>
  );
}
