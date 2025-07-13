
'use client';


import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import styles from './resetpassword.module.css';

import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons for password visibility toggle



export default function ResetPasswordPage() {

    const router = useRouter();
    const supabase = createClient();

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordTwo, setShowPasswordTwo] = useState(false);

    useEffect(() => {
        // const hash = window.location.hash;
        // if (!hash.includes('type=recovery')) {
        //     setMessage('Invalid or expired reset link.');
        // }

        const params = new URLSearchParams(window.location.search);
        const errorCode = params.get('error_code');
        const errorDesc = params.get('error_description');
      
        if (errorCode === 'otp_expired') {
          setMessage(errorDesc || 'Your reset link has expired.');
        }
    }, []);

    const handleReset = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }

        const { error } = await supabase.auth.updateUser({ password: newPassword });

        if (error) {
            setMessage(`Error: ${error.message}`);
        } else {
            setSuccess(true);
            // setMessage('Password updated successfully. Redirecting to login...');
            setTimeout(() => router.push('/auth/login'), 3000);
        }
    };

    return (
        <div>
            <form onSubmit={handleReset} className={styles.resetContainer}>
                <h2 className={styles.title}>Password Reset<hr /></h2>

<br/>
      <div className={styles.inputGroup}>

                <label>New Password</label>
                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <div
        onClick={() => setShowPassword((prev) => !prev)}
        className={styles.passwordToggle}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </div>
      </div>

      <div className={styles.inputGroup}>

                <label>Confirm New Password</label>
                <input
                    type={showPasswordTwo ? 'text' : 'password'}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <div
        onClick={() => setShowPasswordTwo((prev) => !prev)}
        className={styles.passwordToggle}
      >
        {showPasswordTwo ? <FaEyeSlash /> : <FaEye />}
      </div>
      </div>

                <button type="submit">Reset Password</button>
                {/* <br /> */}

                {message && <p className={styles.message}>{message}</p>}
                {success && <p className={styles.success}>Success! Redirecting to login...</p>}
            </form>
        </div>
    );
}
