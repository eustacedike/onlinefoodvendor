
'use client';

import styles from './confirm.module.css';

// import Link from "next/link";


export default function ConfirmEmailPage() {

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>✅ Signup Successful!</h2>
            <p className={styles.text}>
                Thanks for signing up with <strong style={{fontFamily: "var(--font-dancing-script)", color: "var(--primary-color)"}}>Aebis Unique Menu</strong>. We've sent a confirmation link to your email address.
            </p>
            <p className={styles.text}>
                👉 <strong>Please check your inbox</strong> (and your spam/junk folder) and click the link to verify your email and activate your account.
            </p>
            <p className={styles.text}>
                Once verified, you can log in and start placing your orders.
            </p>
            <p className={styles.text}>
                Need help? <a href="/contactus" className={styles.link}>Contact Support</a>
            </p>
            <p className={styles.footer}>— The Aebis Unique Menu Team 🍽️</p>
        </div>
    );
}
