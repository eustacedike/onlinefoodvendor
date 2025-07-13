'use client';

// import Image from 'next/image';
// import styles from './orders.module.css';
import styles from './orders.module.css';
import { useState } from 'react';
// import Link from 'next/link';
// import { useCartContext } from '@/context/CartContext'; 
import OrderStatus from './OrderStatus';

export default function OrderDetail({ order }) {


    // const [orderItems, setOrderItems] = useState([]);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'shortOffset', // or 'longOffset' or 'short' or 'long'
        // timeZone: 'Africa/Lagos' // Explicitly set timezone for consistency, though default is often user's local
    };


    return (
        <div className={styles.orderDetail}>


            <div className={styles.orderSummary}>
                <h3>Items</h3>
                <hr />
                {order.items.map(eachItem => {
                    return (
                        <div className={styles.itemsQuantity} key={eachItem.sku}>
                            <span>{eachItem.name} &nbsp; (x{eachItem.quantity})</span>
                            <span className={styles.amount}>₦{(eachItem.price) * eachItem.quantity}</span>
                        </div>

                    )
                })}


                <hr />
                <div className={styles.subtotal}>
                    <span>Subtotal</span><span className={styles.amount}>₦{Intl.NumberFormat('en-US').format(Math.round(order.subtotal))}</span>
                </div>

                <div className={styles.itemsQuantity}>
                    <span>Delivery</span><span className={styles.amount}>₦{order.delivery}</span>
                </div>
                <div className={styles.itemsQuantity}>
                    <span>VAT (7.5%)</span><span className={styles.amount}>₦{order.vat}</span>
                </div>
                <hr />
                <div className={styles.subtotal}>
                    <span>Total</span><span className={styles.amount}>₦{Intl.NumberFormat('en-US').format(Math.round(order.subtotal + order.delivery + order.vat))}</span>
                </div>

                {/* <br />
                <div>
                    <b>Delivery Address:</b>
                    <hr />
                    <span>{order.address}</span>
                </div> */}

            </div>

            <div className={styles.orderInfo}>
                <OrderStatus status={order.status} />
                <div className={styles.orderInfoInner}>
                    <h3>Delivery Address</h3>
                    {/* <hr /> */}
                    {/* <br /> */}
                    <p>{order.address}</p>
                </div >
                <div className={styles.orderInfoInner}>
                    <h3>Date and Time</h3>
                    {/* <hr /> */}
                    {/* <br /> */}
                    <p>
                        <strong>   {new Date(order.created_at).toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                        })
                        }
                        </strong> at <strong>
                            {new Date(order.created_at).toLocaleTimeString('en-US', {
                                hour: 'numeric',
                                minute: '2-digit',
                                hour12: true,
                            })
                            }
                        </strong>

                        {/* {new Date(order.created_at).toLocaleString('en-NG', options)} */}
                    </p>
                </div>
            </div>

        </div>
    );
}
