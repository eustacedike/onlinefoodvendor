
'use client';


// import Image from "next/image";
import Auth from "@/components/Auth/Auth";
import Link from "next/link";
import { signIn } from "next-auth/react";



export default function LoginPage() {


  const login = async (e) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: true,
      email,
      password,
      callbackUrl: '/profile', 
    });
  } 

    return (
        <div>
            <Auth content="Login" onSubmit={login}/>
            <p className="redirect">Click <Link href="/auth/signup" style={{color: "orange"}}>here</Link> to sign up if you don't have an account yet </p>
        </div>
    );
}
