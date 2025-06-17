
'use client';


// import Image from "next/image";
import Auth from "@/components/Auth/Auth";
import Link from "next/link";


export default function LoginPage() {


    return (
        <div>
            <Auth content="Sign Up"/>
            <p className="redirect">If you already have an account, Please click <Link href="/auth/login" style={{color: "orange"}}>here</Link> to log in </p>
        </div>
    );
}
