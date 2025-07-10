
'use client';


import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import styles from './resetpassword.module.css';


export default function ResetPasswordPage() {

    const router = useRouter();
    const supabase = createClient();

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const hash = window.location.hash;
        if (!hash.includes('type=recovery')) {
            setMessage('Invalid or expired reset link.');
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
            setMessage('Password updated successfully. Redirecting to login...');
            setTimeout(() => router.push('/login'), 3000);
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
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
      </div>

      <div className={styles.inputGroup}>

                <label>Confirm New Password</label>
                <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
      </div>

                <button type="submit">Reset Password</button>
                {/* <br /> */}

                {message && <p className={styles.message}>{message}</p>}
                {success && <p className={styles.success}>Success!</p>}
            </form>
        </div>
    );
}
