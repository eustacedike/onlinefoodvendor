
'use client';


// import Image from "next/image";
import Login from "@/components/Auth/Login";
import Link from "next/link";
// import { signIn } from "next-auth/react";
import { login, signup } from "@/actions/auth";



export default function LoginPage() {



    return (
        <div>
            <Login />
            <p className="redirect">Click <Link href="/auth/signup" style={{color: "orange"}}>here</Link> to sign up if you don't have an account yet </p>
        </div>
    );
}
