

import Image from "next/image";
import styles from "./contact.module.css";

import { useState } from "react";

import facebookImg from '@/public/images/socials/facebook.png';
import instagramImg from '@/public/images/socials/instagram.png';
import locationImg from '@/public/images/socials/location.png';
import phoneImg from '@/public/images/socials/telephone.png';
import tiktokImg from '@/public/images/socials/tik-tok.png';
import twitterImg from '@/public/images/socials/twitter.png';
import youtubeImg from '@/public/images/socials/youtube.png';




export default function Contact() {


    const socials = [
        { id: 1, img: instagramImg, title: "Instagram", value: "aebis_menu" },
        { id: 2, img: facebookImg, title: "Facebook", value: "aebis_menu" },
        {  id: 3,img: locationImg, title: "Location", value: "13 Yaba, Lagos Mainland" },
        {  id: 4, img: phoneImg, title: "Phone", value: "070312345678" },
        { id: 5, img: tiktokImg, title: "Tik Tok", value: "aebis_menu" },
        { id: 6, img: twitterImg, title: "Twitter", value: "aebis_menu" },
        { id: 7, img: youtubeImg, title: "YouTube", value: "aebis_menu" },
    ]

    const [formData, setFormData] = useState({ fullname: '', email: '', phoneno: "", subject: "", message: '' });
    const [status, setStatus] = useState(null);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Sending...');

        const res = await fetch('/api/mailer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const result = await res.json();
        if (result.success) {
            setStatus('Message sent successfully!');
            setFormData({ fullname: '', email: '', phoneno: "", subject: "", message: '' });
        } else {
            setStatus('Failed to send message.');
        }
    };


    return (

        <div className={styles.contactus}>
            <div className={styles.mailTo}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <div>
                            <label htmlFor="fullname">Full Name</label>
                            <input type="text" name="fullname" placeholder="John Doe" value={formData.fullname} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" placeholder="johndoe@example.com" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div>
                            <label htmlFor="phone">Phone Number</label>
                            <input type="number" name="phoneno" placeholder="eg: 08031234567" value={formData.phoneno} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <div>
                            <label htmlFor="subject">Subject</label>
                            <input type="text" name="subject" placeholder="eg: Order Completion" value={formData.subject} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <div>
                            <label htmlFor="message">Message</label>
                            <textarea value={formData.message} onChange={handleChange} name="message" rows="4" cols="50">

                            </textarea>
                        </div>
                    </div>
                    {/* <p className={styles.status}
                        style={{color: status === "Sending..." ? "var(--primary-color)" : 
                            status === "Message sent successfully!" ? "limegreen" : "red"
                        }}
                        >sending....</p> */}
                        {status && <p 
                        className={styles.status}
                        style={{color: status === "Sending..." ? "var(--primary-color)" : 
                            status === "Message sent successfully!" ? "limegreen" : "red"
                        }}
                        >{status}</p>}
                    <button type="submit" className={styles.sendButton}>
                        <div className="svg-wrapper-1">
                            <div className="svg-wrapper">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="20"
                                    height="20"
                                >
                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                    <path
                                        fill="currentColor"
                                        d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                        <span>Send</span>
                    </button>
                </form>
              
                
            </div>
            <div className={styles.socials}>
            {/* <Image src={instagramImg} alt="alt" fill objectFit="contain" /> */}
                {socials.map(social => {
                    return (
                        <div className={styles.social} key={social.id}>
                            <div className={styles.imageContainer}>
                                <Image src={social.img} alt={social.title} fill objectFit="contain" />
                            </div>

                            <div className={styles.details}>
                                <h4>{social.title}</h4>
                                <p>{social.value}</p>
                            </div>
                        </div>
                    )
                })}


            </div>
        </div>
    );
}
