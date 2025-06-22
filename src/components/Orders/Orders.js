import Link from "next/link";
import styles from "./orders.module.css";
import { useState, useEffect } from "react";


export default function Orders({ orders }) {


    return (

        <div className={styles.ordersContainer}>
            {orders.map((order) => (
                <div key={order.id} className={styles.orderCard}>
                    <div className={styles.innerDiv}>
                        <p><strong>Order #{order.id}</strong></p>
                        <button
                        className={styles.status}
                        style={{backgroundColor: order.status==="Delivered"? "limegreen" :
                            order.status==="Transit"? "orange" : "black"}}
                        >{order.status}</button>
                    </div>
                    <div className={styles.innerDiv}>
                        <p>{order.date}</p>
                        <b>₦{order.amount}</b>               
                    </div>
                    <div className={styles.innerDiv}>
                            <p>{order.quantity} Items</p>
                            <button className={styles.reorderBtn}>Reorder</button>
                        </div>
                </div>
            ))}
        </div>
    );

}
