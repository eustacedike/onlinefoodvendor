
'use client';


// import Image from "next/image";
import Auth from "@/components/Auth/Auth";
import Link from "next/link";


export default function LoginPage() {


    return (
        <div>
            <Auth content="Login"/>
            <p className="redirect">Click <Link href="/auth/signup" style={{color: "orange"}}>here</Link> to sign up if you don't have an account yet </p>
        </div>
    );
}
