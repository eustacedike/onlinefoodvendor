
'use client';

// import './layout.css';
import Link from "next/link";
import globals from "../../app/globals.css";
import Image from "next/image";

// import { useCartContext } from "@/context/CartContext";
// import { Geist, Geist_Mono, Dancing_Script } from "next/font/google";
import styles from "./footer.module.css";
import logo from "../../public/images/logo.png";
import { FaFacebookSquare, FaInstagramSquare } from 'react-icons/fa';
import { FaSquareXTwitter } from "react-icons/fa6";







export default function Footer() {

    return (
        <footer className={styles.footer}>
            <Link href="/" className={styles.brand}>
                <Image
                    src={logo}     // local image (in /public/images)
                    alt="Logo"
                    width={40}
                    height={40}
                    priority
                //   style={{borderRadius: "50%"}}
                />
                <h2 >Aebis Unique Menu</h2></Link>
            
                <ul>
                    <li><Link href="/menu" >Menu</Link></li>
                    <li><Link href="/contactus" >Contact</Link></li>
                    <li><Link href="/#aboutus" >About</Link></li>
                    {/* <li><Link href="/menu" style={linkStyle}>Latest</Link></li> */}
                </ul>
                <div className={styles.socials}>
                    <a href="/cart"> <FaInstagramSquare /> </a>
                    <a href="/cart"> <FaFacebookSquare /> </a>
                    <a href="/cart"> <FaSquareXTwitter /> </a>
                </div>

            <p className={styles.copyright}>© 2023 Aebis Unique Menu. All rights reserved. Developed by <a href="https://eustacedike.github.io/eustaced/" target="_blank" style={{color: "orange"}}>Eustace Dike</a></p> <br/>
            




        </footer>


    );
}
