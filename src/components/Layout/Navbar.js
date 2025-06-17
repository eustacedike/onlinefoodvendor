
'use client';

// import './layout.css';
import Link from "next/link";
import globals from "../../app/globals.css";
import Image from "next/image";

import { useCartContext } from "@/context/CartContext";
// import { Geist, Geist_Mono, Dancing_Script } from "next/font/google";
import styles from "./navbar.module.css";
import logo from "../../public/images/logo.png";
import { FaShoppingCart } from 'react-icons/fa';
import { MdAccountCircle } from "react-icons/md";
import { useState } from "react";






export default function Navbar() {


    const [mobile, setMobile] = useState(false);
    // const cartCount = 10; // Example cart count, replace with actual state or context value
    const { getCartItemCount } = useCartContext();
    const cartCount = getCartItemCount();


    const linkStyle = {
        textDecoration: "none",
        color: "unset",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem"
    }
    return (
        <header className={styles.header}>
            <Link href="/" style={linkStyle}>
                <Image
                    src={logo}     // local image (in /public/images)
                    alt="Logo"
                    width={40}
                    height={40}
                    priority
                //   style={{borderRadius: "50%"}}
                />
                <h2 >Aebis Unique Menu</h2>
            </Link>
            <nav>
                <ul className={styles.navbarLinks}>
                    <li ><Link href="/menu">Menu</Link></li>
                    <li><Link href="/menu" style={linkStyle}>Contact</Link></li>
                    <li><Link href="/menu">About</Link></li>
                    {/* <li><Link href="/menu" style={linkStyle}>Latest</Link></li> */}
                </ul>
                <div className={styles.navbarButtons}>
                    <Link href="/cart"> <button><FaShoppingCart /><p className={styles.cartCount}>{cartCount}</p></button> </Link>
                    <Link href="/auth/login"> <button><MdAccountCircle /></button></Link>
                </div>


                <div
                    className={
                        mobile? `${styles.hamburger} ${styles.hamburgered}` : styles.hamburger
                        }

                        onClick={() => setMobile(!mobile)}
                // className={styles.hamburgered}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </nav>

            <ul
            style={{display: mobile? null : "none"}}
            className={styles.hamburgerMenu}>
                <Image
                    src={logo}     // local image (in /public/images)
                    alt="Logo"
                    width={40}
                    height={40}
                    priority
                //   style={{borderRadius: "50%"}}
                />
                <h2 >Aebis Unique Menu</h2> <br /> <br /> <br />
                <li onClick={() => setMobile(false)}><Link href="/menu" >Menu</Link></li>
                <li onClick={() => setMobile(false)}><Link href="/menu" style={linkStyle}>Contact</Link></li>
                <li onClick={() => setMobile(false)}><Link href="/menu" style={linkStyle}>About</Link></li>
                {/* <li><Link href="/menu" style={linkStyle}>Latest</Link></li> */}
            </ul>


        </header>


    );
}
