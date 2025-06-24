
'use client';


// import Image from "next/image";
import Auth from "@/components/Auth/Auth";
import Link from "next/link";



export default function LoginPage() {

    const login = async (email, password) => {
        const res = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
          credentials: 'include', // important to allow cookies
        });
      
        if (res.ok) {
          // optionally fetch user data or redirect
          router.push('/profile'); 
        } else {
          const error = await res.json();
          alert(error.message || 'Login failed');
        }
      };
      

    return (
        <div>
            <Auth content="Login" onSubmit={login}/>
            <p className="redirect">Click <Link href="/auth/signup" style={{color: "orange"}}>here</Link> to sign up if you don't have an account yet </p>
        </div>
    );
}
