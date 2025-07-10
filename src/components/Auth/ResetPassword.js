'use client';

import { useState } from 'react';
import { requestPasswordReset } from '@/actions/auth'; // Your reset handler

import styles from './auth.module.css';


export default function RequestPasswordReset() {
    //   const [showReset, setShowReset] = useState(false);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleReset = async (e) => {
        e.preventDefault();
        const { error, success } = await requestPasswordReset(email);
        if (error) {
            setMessage(error);
        } else {
            setMessage('Check your email for a reset link.');
        }
    };

    return (
        <div>
            {/* {!showReset ? ( */}
            {/* ) : ( */}
            <form onSubmit={handleReset} className={styles.loginContainer}>
                <h2 className={styles.title}>Request Password Reset <hr /></h2>
                <div className={styles.inputGroup}>
                    <div>
                    <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <button type="submit" className={styles.loginButton}>Send Reset Link</button>
                
                {message && <small style={{margin: "10px 0"}}>{message}</small>}
            </form>
            {/* )} */}
        </div>
    );
}
