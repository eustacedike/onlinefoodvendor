

// import Image from "next/image";
import styles from "./profile.module.css";
import { useState } from "react";


export default function AccountProfile() {

    const [user, setUser] = useState({
        name: "John Doe",
        email: "john@example.com",
        phone: "08031234567",
        address: "13B Car Wash Street, Gbagada",
    });

    const orderHistory = [
        { id: "1234", date: "Jun 20", items: "Shawarma x2", amount: 7000, status: "Delivered" },
        { id: "1229", date: "Jun 18", items: "Burger x1", amount: 2000, status: "Delivered" },
    ];

    return (

        <div className={styles.profile}>



            <div className={styles.container}>
                <div className={styles.header}>
                    <h2>Hello, {user.name}</h2>
                    <div className={styles.actions}>
                        <button>Edit Profile</button>
                        <button>Logout</button>
                    </div>
                </div>

                <div className={styles.section}>
                    <h3>Account Info</h3>
                    <p><strong>📄 Full Name:</strong> {user.name}</p>
                    <p><strong>📧 Email:</strong> {user.email}</p>
                    <p><strong>📱 Phone Number:</strong> {user.phone}</p>
                    <p><strong>🏠 Address:</strong> {user.address}</p>
                </div>

                <div className={styles.section}>
                    <h3>Order History</h3>
                    {orderHistory.map((order) => (
                        <div key={order.id} className={styles.orderCard}>
                            <p><strong>Order #{order.id}</strong></p>
                            <p>{order.date} - {order.items}</p>
                            <p>₦{order.amount} - {order.status}</p>
                            <button className={styles.reorderBtn}>Reorder</button>
                        </div>
                    ))}
                </div>
            </div>



        </div>
    );
}
