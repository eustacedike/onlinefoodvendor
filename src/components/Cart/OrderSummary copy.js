'use client';

import styles from './ordersummary.module.css';
import { useCartTotal } from '@/hooks/useCartTotal';

import CheckoutButton from '../Checkout/CheckoutButton';
import { useState } from 'react';
// import Image from "next/image";
import { TiArrowLeftOutline } from "react-icons/ti";

export default function OrderSummary() {

    function formatNumberWithCommas(number) {
        return new Intl.NumberFormat('en-US').format(number);
    }

    const subtotal = useCartTotal();

    const [checkoutModal, setCheckoutModal] = useState(false);

    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [address, setAddress] = useState("");
    const [useCurrentLocation, setUseCurrentLocation] = useState(false);
    const [error, setError] = useState(null);

    // const decrease = () => setQuantity(prev => Math.max(0, prev - 1));
    // const increase = () => { if (quantity < product.count) { setQuantity(prev => prev + 1) } };

    const delivery = 2500;
    const vat = (subtotal * 7.5) / 100;
    const total = subtotal + delivery + vat;

    const handleCheckboxChange = (e) => {
        const checked = e.target.checked;
        setUseCurrentLocation(checked);

        if (checked && 'geolocation' in navigator) {
            // Clear address input
            setAddress('');

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const locationString = `${latitude},${longitude}`;
                    setAddress(locationString); // Save coords to address
                    setError(null);
                },
                (err) => {
                    alert('Unable to retrieve location. Please allow access.');
                    setUseCurrentLocation(false); // Uncheck the box
                }
            );
        } else if (!checked) {
            setAddress(''); // Clear again for manual entry
            setError(null);
        }
    };


    return (

        <div className={styles.orderSummary}>
            <h3>Order Summary</h3>
            <hr />
            <div className={styles.subtotal}>
                <span>Subtotal</span><span className={styles.amount}>₦{subtotal}</span>
            </div>
            <div className={styles.delivery}>
                <span>Delivery</span><span className={styles.amount}>₦{delivery}</span>
            </div>
            <div className={styles.vat}>
                <span>VAT (7.5%)</span><span className={styles.amount}>₦{Math.ceil(vat * 100) / 100}</span>
            </div>
            <hr />
            <div className={styles.total}>
                <span>Total</span><span className={styles.amount}>₦{formatNumberWithCommas(Math.round(total))}</span>
            </div>
           
            <button className={styles.toCheckout} onClick={() => setCheckoutModal(true)}>Check Out</button>


            <div className={styles.checkoutContainer} style={{ display: checkoutModal ? null : "none" }}>

                <div className={styles.checkoutForm}>

                    <h3>CHECKOUT</h3> <button className={styles.close} onClick={() => setCheckoutModal(false)}>
                        {/* &#10006; CLOSE */}
                        <TiArrowLeftOutline /> GO BACK

                    </button>
                    <hr /> <br />
                    <div className={styles.checkoutScroll}>


                        <label>Full Name</label>
                        <input
                            type='name'
                            placeholder='John doe'
                            className={styles.emailInput}
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                        />

                        <label>Email Address</label>
                        <input
                            type='email'
                            placeholder='johndoe@example.com'
                            className={styles.emailInput}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <label>Phone Number</label>
                        <input
                            type='number'
                            placeholder='eg: 08031234567'
                            className={styles.emailInput}
                            value={phoneNo}
                            onChange={(e) => setPhoneNo(e.target.value)}
                        />

                        <label>House Address</label>
                        <input
                            type='text'
                            placeholder='eg: 13b Car wash Street, Gbagada, Lagos'
                            className={styles.emailInput}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            disabled={useCurrentLocation}
                            style={{ backgroundColor: useCurrentLocation ? '#eee' : '#fff' }}
                        />

                        <iframe
                            width="450"
                            height="250"
                            frameBorder="0"
                            style={{ border: 0 }}
                            referrerPolicy="no-referrer-when-downgrade"
                            src="https://www.google.com/maps/embed/v1/MAP_MODE?key=YOUR_API_KEY&PARAMETERS"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <label>
                        <input
                            type="checkbox"
                            checked={useCurrentLocation}
                            onChange={handleCheckboxChange}
                        /> Get My Location
                    </label>
                    <br />
                    <CheckoutButton email={email} amount={Math.round(total) * 100} fullname={fullname} phoneno={phoneNo} address={address} />

                </div>
            </div>
        </div>
    )

}
