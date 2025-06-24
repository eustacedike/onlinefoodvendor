

import Image from "next/image";
import styles from "./profile.module.css";
import { useState } from "react";
import Orders from "../Orders/Orders";
import { useOrderContext } from "@/context/OrderContext";
import DataFetch from "@/context/datafetch";
import avatarImg from "@/public/images/eustace.jpg";

import { MdDeleteForever } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

// import locationImg from '@/public/images/socials/location.png';
// import phoneImg from '@/public/images/socials/telephone.png';
// import mailImg from '@/public/images/socials/mail.png';


export default function AccountProfile() {

    const [user, setUser] = useState({
        avatar: avatarImg,
        name: "John Doe",
        email: "john@example.com",
        verified: true,
        phone: "08031234567",
        addresses: [
            { place: "Beverly Hills, California, USA", lat: 6.3790, long: 3.5491 },
            { place: "13B Car Wash Street, Gbagada", lat: 6.5578, long: 3.3015 },
            { place: "Mumbai, India", lat: 6.6823, long: 3.1955 },
        ],
    });

  const { orders } = useOrderContext();

    // const orderHistory = [
    //     { id: "1234", date: "20-Jun-2025", items: "Shawarma x2", amount: 7000, status: "Delivered", quantity: 10, type: "user" },
    //     { id: "1229", date: "18-May-2025", items: "Burger x1", amount: 2000, status: "Transit", quantity: 5, type: "guest" },
    //     { id: "1234", date: "20-Jun-2025", items: "Shawarma x2", amount: 7000, status: "Delivered", quantity: 10 },
    //     { id: "1229", date: "18-May-2025", items: "Burger x1", amount: 2000, status: "Transit", quantity: 5 },
    //     { id: "1234", date: "20-Jun-2025", items: "Shawarma x2", amount: 7000, status: "Delivered", quantity: 10 },
    //     { id: "1229", date: "18-May-2025", items: "Burger x1", amount: 2000, status: "Transit", quantity: 5 },
    //     { id: "1234", date: "20-Jun-2025", items: "Shawarma x2", amount: 7000, status: "Delivered", quantity: 10 },
    //     { id: "1229", date: "18-May-2025", items: "Burger x1", amount: 2000, status: "Transit", quantity: 5 },
    // ];

    const [phoneEdit, setPhoneEdit] = useState(false)

    return (





        <div className={styles.container}>
            <DataFetch/>
            <div className={styles.profile}>
                <div className={styles.header}>
                    <h2>{user.name}</h2>
                    <div className={styles.actions}>
                        {/* <button>Edit Profile</button> */}
                        <button>Logout</button>
                    </div>
                </div>

                <div className={styles.section}>
                    <Image className={styles.avatar}
                        src={user.avatar}
                        alt=""
                        width={0}
                        height={0}
                        sizes="60vw"

                    />

                    <div className={styles.details}>

                        <h4>Phone</h4>
                        <div className={styles.detail}>
                            <input
                                value={user.phone}
                                disabled={!phoneEdit}
                                style={{border: phoneEdit? "2px solid blue": null}}
                                // {phoneEdit? disabled : ""}
                            />
                           {phoneEdit?
                           <button className={styles.editBtn} style={{backgroundColor: "limegreen"}}>Save</button> :
                           <button className={styles.editBtn} onClick={()=>setPhoneEdit(true)}>Edit</button> 
                           } 
                            
                        </div>

                        <br/>

                        <h4>Email Address</h4>
                        <div className={styles.detail}>
                            <input
                                value={user.email}
                                disabled
                            />
                            {
                                user.verified? <button style={{backgroundColor: "limegreen"}} className={styles.editBtn}>Verified </button> :
                                <button className={styles.editBtn}>Verify</button>
                            }
                            
                        </div>

                        <br/>

                        
                        <div className={styles.detail}>
                        <h4>Delivery Addresses</h4>  <button
                        className={styles.addBtn}
                        style={{display: user.addresses.length >= 3? "none" : null}}
                        >Add</button>
</div>
                        <hr/>
                        {user.addresses.map((address, index) => (
                            <div className={styles.detail} key={index}>
                                {/* <input
                                    value={address.place}
                                    disabled
                                /> */}
                                <p>{address.place}</p>
                                {index === 0 ?
                                <span style={{color: "limegreen", cursor: "pointer"}}> <IoIosCheckmarkCircle /></span> :
                                <span style={{color: "black", cursor: "pointer"}}> <IoIosCheckmarkCircleOutline /></span>}
                                <button className={styles.deleteBtn}><MdDeleteForever /></button>
                            </div>
                        ))}




                    </div>



                </div>
            </div>

            <div className={styles.history}>
                <Orders orders={orders} />
            </div>
        </div>

    );
}
