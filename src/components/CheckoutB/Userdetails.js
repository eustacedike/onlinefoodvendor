

// components/CheckoutModal.jsx
'use client';

import styles from './checkout.module.css';
import { useState } from 'react';
import { TiArrowLeftOutline } from 'react-icons/ti';
import CheckoutButton from '../Checkout/CheckoutButton';

// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import { useAlert } from '@/context/AlertContext';


export default function CheckoutUserDetails({ formData, setFormData }) {

    const { showAlert } = useAlert();


    const [useCurrentLocation, setUseCurrentLocation] = useState(false);

    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [address, setAddress] = useState("");
    const [error, setError] = useState(null);
    const [location, setLocation] = useState(null);


    async function getReadableAddress(lat, lon) {
        const apiKey = 'YOUR_API_KEY'; // replace with your actual API key
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=4044c1c071bc4376a7044d201ca3c863`;

        try {
            const res = await fetch(url);
            const data = await res.json();

            if (data.results.length > 0) {
                return data.results[0].formatted;
            } else {
                return 'Address not found';
            }
        } catch (err) {
            console.error('Reverse geocoding failed:', err);
            return 'Error getting address';
        }
    }

    const alertBox = (str, msg, bgc, hrc) => {
        // console.log("a");
        showAlert({
            strong: str,
            message: msg,
            bgColor: bgc, // light green
            hrColor: hrc,
        });
    };

    const handleCheckboxChange = async (e) => {
        const checked = e.target.checked;
        setUseCurrentLocation(checked);

        if (checked && 'geolocation' in navigator) {
            try {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });

                const { latitude, longitude } = position.coords;

                const readableAddress = await getReadableAddress(latitude, longitude);
                setAddress(readableAddress);
                // setLocation({lat: latitude, lng: longitude})

            } catch (err) {
                alertBox("Location Access Denied!", 'Please grant location access and try again', '#ff0000', '#ffffff');
                // alert('Unable to retrieve your location. Please try again.');
                setUseCurrentLocation(false);
                setFormData({ ...formData, address: "" })
                // setAddress('');
            }
        } else {
            // setAddress('');
            setFormData({ ...formData, address: "" })
        }
    };

    return (
        // <div className={styles.checkoutContainer}
        // // style={{ display: checkoutModal ? null : "none" }}
        // >
        <div className={styles.checkoutForm}>
            <h3>Checkout Details</h3>
            {/* <button className={styles.close} onClick={() => setCheckoutModal(false)}>
                <TiArrowLeftOutline /> GO BACK
            </button> */}
            <hr /> <br />
            <div className={styles.checkoutScroll}>
                <label>House Address</label>
                <input
                    type='text'
                    placeholder='eg: 13b Car wash Street, Gbagada, Lagos'
                    className={styles.emailInput}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    disabled={useCurrentLocation}
                    style={{ backgroundColor: useCurrentLocation ? '#eee' : '#fff' }}
                />

                <label>Full Name</label>
                <input
                    type='text'
                    placeholder='John Doe'
                    className={styles.emailInput}
                    value={formData.fullname}
                    onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                />

                {/* <label>Email Address</label>
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
                /> */}

                <div className={styles.inputGroup}>
                    <div>
                        <label>Email Address</label>
                        <input
                            type='email'
                            placeholder='johndoe@example.com'
                            className={styles.emailInput}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label>Phone Number</label>
                        <input
                            type='number'
                            placeholder='eg: 08031234567'
                            className={styles.emailInput}
                            value={formData.phoneNo}
                            onChange={(e) => setFormData({ ...formData, phoneNo: e.target.value })}
                        />
                    </div>
                </div>

            </div>

            <label>
                <input
                    type='checkbox'
                    checked={useCurrentLocation}
                    onChange={handleCheckboxChange}
                />{' '}
                Get My Location
            </label>
            <br />

            {/* <CheckoutButton
                email={email}
                fullname={fullname}
                phoneno={phoneNo}
                address={address}
                amount={Math.round(total) * 100}
            /> */}
        </div>
        // </div>
    );
}
