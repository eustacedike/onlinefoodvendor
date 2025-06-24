import Link from "next/link";
import styles from "./orders.module.css";
import { useState, useEffect } from "react";

import Blank from "../Loading/Blank";


export default function Orders({ orders }) {


    return (

        <div className={styles.ordersContainer}>

 {orders.length === 0 ? (<> <Blank content="No Orders Yet" imgSrc={null} /> </>) :

                (<>
                    <table className={styles.orderTable}>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.date}</td>
                            <td>₦{Intl.NumberFormat('en-US').format(order.subtotal + order.delivery + order.vat)}</td>
                            <td
                            style={{ color: "white",
                                backgroundColor: order.status === "delivered" ? "limegreen" :
                                    order.status === "transit" ? "orange" : "black"
                            }}
                            > {order.status}</td>
                            <td><Link href={`/orders/${order.ref}`}><button className={styles.viewBtn}>View</button></Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>

                </>)
            }

           

           
        </div>
    );

}
