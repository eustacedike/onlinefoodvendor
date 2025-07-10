
'use client';


// import Image from "next/image";
import Login from "@/components/Auth/Login";
import RequestPasswordReset from "@/components/Auth/ResetPassword";
import Link from "next/link";
// import { signIn } from "next-auth/react";
import { useState } from "react";
// import { login, signup } from "@/actions/auth";



export default function LoginPage() {

    const [showReset, setShowReset] = useState(false);


    return (
        <div>
            {!showReset ? (
                <div>

                    <Login />
                    <p className="redirect">Click <Link href="/auth/signup" style={{ color: "orange" }}>here</Link> to sign up if you don't have an account yet </p>

                    <p className="toggle-reset" onClick={() => setShowReset(true)}>Forgot Password?</p>
                </div>

            ) : (
                <div>

                    <RequestPasswordReset />
                    <p className="toggle-reset" style={{ cursor: 'pointer' }} onClick={() => setShowReset(false)}>
                        Back to Login
                    </p>
                </div>
            )}

        </div>
    );
}
