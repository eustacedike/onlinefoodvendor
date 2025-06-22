

// components/CheckoutModal.jsx
'use client';

import styles from './checkout.module.css';
import { useState, useRef, useEffect } from 'react';
import { TiArrowLeftOutline } from 'react-icons/ti';
import CheckoutButton from '../Checkout/CheckoutButton';

// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import { useAlert } from '@/context/AlertContext';


const alertBox = (str, msg, bgc, hrc) => {
    // console.log("a");
    showAlert({
        strong: str,
        message: msg,
        bgColor: bgc, // light green
        hrColor: hrc,
    });
};


export default function CheckoutUserDetails({ formData, setFormData }) {

    const { showAlert } = useAlert();

    const [error, setError] = useState(null);
    const inputRef = useRef(null);

    const handleCheckbox = async (e) => {
        const checked = e.target.checked;
        if (!checked) {
            setFormData(prev => ({ ...prev, address: '', addressCords: null }));
            inputRef.current.disabled = false;
            return;
        }

        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(async ({ coords }) => {
                const { latitude, longitude } = coords;
                const res = await fetch('/api/geocode', {
                    method: 'POST',
                    body: JSON.stringify({ lat: latitude, lng: longitude }),
                });

                const result = await res.json();
                if (result.success) {
                    setFormData(prev => ({
                        ...prev,
                        address: result.address,
                        addressCords: { lat: latitude, lng: longitude },
                    }));
                    inputRef.current.disabled = true;
                } else {
                    alert('Failed to get location');
                    e.target.checked = false;
                }
            });
        } else {
            alert('Geolocation not supported');
            e.target.checked = false;
        }
    };

    useEffect(() => {
        if (!window.google || !window.google.maps) return;

        const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
            componentRestrictions: { country: ['ng'] },
            fields: ['formatted_address', 'geometry'],
        });

        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (!place.geometry) return;

            const { lat, lng } = place.geometry.location;
            setFormData(prev => ({
                ...prev,
                address: place.formatted_address,
                addressCords: { lat: lat(), lng: lng() },
            }));
        });
    }, []);





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
                    ref={inputRef}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                // disabled={useCurrentLocation}
                // style={{ backgroundColor: useCurrentLocation ? '#eee' : '#fff' }}
                />

                <label>Full Name</label>
                <input
                    type='text'
                    placeholder='John Doe'
                    className={styles.emailInput}
                    value={formData.fullname}
                    onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                />



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
                    // checked={useCurrentLocation}
                    onChange={handleCheckbox}
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
