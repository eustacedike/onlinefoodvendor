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



    return (
        <div className={styles.orderDetail}>


            <div className={styles.orderSummary}>
                <h3>Items</h3>
                <hr />
                {order.items.map(eachItem => {
                    return (
                        <div className={styles.itemsQuantity} key={eachItem.sku}>
                            <span>{eachItem.title} &nbsp; (x{eachItem.qty})</span>
                            <span className={styles.amount}>₦{(eachItem.price) * eachItem.qty}</span>
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




            </div>

            <OrderStatus status={order.status} />

        </div>
    );
}
