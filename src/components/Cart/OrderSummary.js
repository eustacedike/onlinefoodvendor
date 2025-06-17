'use client';

import styles from './ordersummary.module.css';
import { useCartTotal } from '@/hooks/useCartTotal';

import CheckoutButton from '../Checkout/CheckoutButton';
import { useState } from 'react';
// import Image from "next/image";

// import { useProductContext } from '@/context/ProductContext';
// import DataFetch from "@/context/datafetch";

export default function OrderSummary() {

    function formatNumberWithCommas(number) {
        // Use 'en-US' locale for comma separators, or your desired locale
        return new Intl.NumberFormat('en-US').format(number);
      }

    const subtotal = useCartTotal();


    // const { products, productGroups } = useProductContext();

    // const [productSkus, setProductSkus] = useState(["a","b"]);
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [address, setAddress] = useState("");

    // const decrease = () => setQuantity(prev => Math.max(0, prev - 1));
    // const increase = () => { if (quantity < product.count) { setQuantity(prev => prev + 1) } };

const delivery = 2500;
const vat = (subtotal * 7.5)/100;
const total = subtotal + delivery + vat;

    return (

        <div className={styles.orderSummary}>
            <h3>Order Summary
                {/* ({`${count} items`} ) */}
                </h3>
            {/* <p>Total Items: {cartItems.length}</p> */}
            {/* <p>Total Price: ₦{cartItems.reduce((total, item) => total + item.price, 0)}</p> */}
            {/* <p>21 Items</p> */}
            <hr/>
            <div className={styles.subtotal}>
                <span>Subtotal</span><span className={styles.amount}>₦{subtotal}</span>
            </div>
            <div className={styles.delivery}>
                <span>Delivery</span><span className={styles.amount}>₦{delivery}</span>
            </div>
            <div className={styles.vat}>
                <span>VAT</span><span className={styles.amount}>₦{Math.ceil(vat * 100) / 100}</span>
            </div>
            <hr/>
            <div className={styles.total}>
                <span>Total</span><span className={styles.amount}>₦{formatNumberWithCommas(Math.round(total))}</span>
            </div>

<input
type='email'
placeholder='Enter Email Address'
className={styles.emailInput}
value={email}
onChange={(e) => setEmail(e.target.value)}
/>
<input
type='number'
placeholder='Enter Phone Number'
className={styles.emailInput}
value={phoneNo}
onChange={(e) => setPhoneNo(e.target.value)}
/>
<input
type='text'
placeholder='Enter House Address'
className={styles.emailInput}
value={address}
onChange={(e) => setAddress(e.target.value)}
/>
{/* <legend>Email Address</legend> */}
            <CheckoutButton email={email} amount={Math.round(total)*100}/>
            {/* <button className={styles.checkoutButton}>Checkout</button> */}
        </div>
    )

}
