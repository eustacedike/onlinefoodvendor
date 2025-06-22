

import Image from "next/image";
import styles from "./profile.module.css";
import { useState } from "react";
import Orders from "../Orders/Orders";
import avatarImg from "@/public/images/eustace.jpg"

import locationImg from '@/public/images/socials/location.png';
import phoneImg from '@/public/images/socials/telephone.png';
import mailImg from '@/public/images/socials/mail.png';


export default function AccountProfile() {

    const [user, setUser] = useState({
avatar: avatarImg,
        name: "John Doe",
        email: "john@example.com",
        phone: "08031234567",
        address: "13B Car Wash Street, Gbagada",
    });

    const orderHistory = [
        { id: "1234", date: "20-Jun-2025", items: "Shawarma x2", amount: 7000, status: "Delivered", quantity: 10},
        { id: "1229", date: "18-May-2025", items: "Burger x1", amount: 2000, status: "Transit", quantity: 5 },
        { id: "1234", date: "20-Jun-2025", items: "Shawarma x2", amount: 7000, status: "Delivered", quantity: 10},
        { id: "1229", date: "18-May-2025", items: "Burger x1", amount: 2000, status: "Transit", quantity: 5 },
        { id: "1234", date: "20-Jun-2025", items: "Shawarma x2", amount: 7000, status: "Delivered", quantity: 10},
        { id: "1229", date: "18-May-2025", items: "Burger x1", amount: 2000, status: "Transit", quantity: 5 },
        { id: "1234", date: "20-Jun-2025", items: "Shawarma x2", amount: 7000, status: "Delivered", quantity: 10},
        { id: "1229", date: "18-May-2025", items: "Burger x1", amount: 2000, status: "Transit", quantity: 5 },
    ];

    return (

   



            <div className={styles.container}>
                <div className={styles.profile}>
                    <div className={styles.header}>
                        <h2>Hello, {user.name}</h2>
                        <div className={styles.actions}>
                            <button>Edit Profile</button>
                            <button>Logout</button>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <Image className={styles.avatar}
                            src={user.avatar}
                            alt=""
                            // fill
                            // objectFit="contain"

                            width={0} // Needed for auto scale
                            height={0}
                            sizes="60vw"

                        />
                        {/* <h3>Account Info</h3> */}
                        {/* <div className={styles.details}>
                            <div className={styles.imageContainer}>
                                <Image src={locationImg} alt="" fill objectFit="contain" />
                            </div>

                            <div className={styles.detail}>
                                <h4>{user.name}</h4>
                            </div>
                        </div> */}
                        <div className={styles.details}>
                            <div className={styles.imageContainer}>
                                <Image src={phoneImg} alt="" fill objectFit="contain" />
                            </div>

                            <div className={styles.detail}>
                                {/* <h4>Phone</h4> */}
                                <h4>{user.phone}</h4>
                            </div>
                        </div>
                        <div className={styles.details}>
                            <div className={styles.imageContainer}>
                                <Image src={mailImg} alt="" fill objectFit="contain" />
                            </div>

                            <div className={styles.detail}>
                                {/* <h4>Mail</h4> */}
                                <h4>{user.email}</h4>
                            </div>
                        </div>
                        <div className={styles.details}>
                            <div className={styles.imageContainer}>
                                <Image src={locationImg} alt="" fill objectFit="contain" />
                            </div>

                            <div className={styles.detail}>
                                {/* <h4>Preferred Address</h4> */}
                                <h4>{user.address}</h4>
                            </div>
                        </div>
                     
                    </div>
                </div>

                <div className={styles.history}>
                <Orders orders={orderHistory}/>
                </div>
            </div>

    );
}
