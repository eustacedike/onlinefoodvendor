

// components/CheckoutModal.jsx
'use client';

import styles from './checkout.module.css';
import { useState, useRef, useEffect } from 'react';
import { TiArrowLeftOutline } from 'react-icons/ti';
import CheckoutButton from '../Checkout/CheckoutButton';
import { createClient } from '@/utils/supabase/client';

import { requestOtp, verifyOtp } from '@/actions/otp';

import { useAuthUser } from '@/hooks/useAuthUser';

// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

// import { useAlert } from '@/context/AlertContext';


// const alertBox = (str, msg, bgc, hrc) => {
//     // console.log("a");
//     showAlert({
//         strong: str,
//         message: msg,
//         bgColor: bgc, // light green
//         hrColor: hrc,
//     });
// };


export default function CheckoutUserDetails({ formData, setFormData }) {

    // const { showAlert } = useAlert();
    const { user, profile, loading } = useAuthUser();

    const [error, setError] = useState(null);
    const inputRef = useRef(null);

    // const [email, setEmail] = useState('');
    // const [user, setUser] = useState(null);
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(false); // false = request, true = verify
    // const [verified, setVerified] = useState(false);
    const [message, setMessage] = useState('');
    // const [loading, setLoading] = useState(false);

    useEffect(() => {

            // setFormData({ ...formData, fullname: profile?.name })
            // setFormData({ ...formData, email: profile?.email })
            // setFormData({ ...formData, phoneNo: profile?.phone })
            // setFormData({ ...formData, address: profile?.addresses[0] })

            if (!profile) return;

            setFormData(prev => ({
              ...prev,
              fullname: profile.name || '',
              email: profile.email || '',
              phoneNo: profile.phone || '',
              address: profile.addresses?.[0] || '',
              verified: true,
            }));

    }, [profile])

    // console.log(verified);
    // console.log(profile);
    // console.log(user);



    const handleRequestOtp = async () => {
        // setLoading(true);
        const res = await requestOtp(formData.email);
        // setLoading(false);

        if (res?.error) {
            setMessage(res.error);
        } else {
            setStep(true); // Show OTP input
            setMessage('OTP sent. Please check your email.');
        }
    };

    const handleVerifyOtp = async () => {
        // setLoading(true);
        const res = await verifyOtp(formData.email, otp, formData.fullname, formData.phoneNo);
        // setLoading(false);

        if (res?.error) {
            setMessage(res.error);
        } else {
            setMessage('✅ Email verified successfully!');
            // setVerified(true);
            setFormData({ ...formData, verified: true })
            // console.log(res);
        }
    };

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

            <hr /> <br />
            <div className={styles.checkoutScroll}>


                <label>Full Name<span style={{ color: "red" }}>*</span></label>
                <input
                    type='text'
                    placeholder='John Doe'
                    className={styles.emailInput}
                    value={formData.fullname}
                    onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                    disabled={user ? true : false}
                    style={{border: user ? "2px solid grey" : null}}
                />

<label>Phone Number<span style={{ color: "red" }}>*</span></label>
                <input
                    type='number'
                    placeholder='eg: 08031234567'
                    className={styles.emailInput}
                    value={formData.phoneNo}
                    onChange={(e) => setFormData({ ...formData, phoneNo: e.target.value })}
                    disabled={user}
                    style={{border: user ? "2px solid grey" : null}}
                />

                <div className={styles.inputGroup}>
                    <div>
                        <label>Email Address<span style={{ color: "red" }}>*</span></label>
                        <input
                            type='email'
                            placeholder='johndoe@example.com'
                            className={styles.emailInput}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            disabled={user}
                            style={{border: user ? "2px solid grey" : null}}
                        />

                    </div>
                    {formData.verified ?

                        null :
                        <button
                            className={styles.emailVerifyButton}
                            onClick={handleRequestOtp}
                        // disabled={loading || formData.email === ''}
                        >
                            {/* {loading ? 'Sending OTP...' : 'Send OTP'} */}
                            Send OTP
                        </button>
                     } 


                </div>

                {step &&
                    <div className={styles.inputGroup}>
                        <div>
                            <label>OTP (6 Digits)<span style={{ color: "red" }}>*</span></label>
                            <input
                                type='number'
                                placeholder='123456'
                                className={styles.emailInput}

                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            // value={formData.OTP}
                            // onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        {formData.verified ?
                            null :
                            <button
                                className={styles.emailVerifyButton}
                                onClick={handleVerifyOtp}
                            // disabled={loading || !otp}
                            >
                                {/* {loading ? 'Verifying...' : 'Verify OTP'} */}
                                Verify OTP
                            </button>
                        }
                    </div>
                }


                {message && <h5 style={{ color: 'var(--primary-color)', marginTop: -15, marginBottom: 12 }}>{message}</h5>}

                

                <label>House Address<span style={{ color: "red" }}>*</span></label>
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

                <label>
                    <input
                        type='checkbox'
                        // checked={useCurrentLocation}
                        onChange={handleCheckbox}
                    />{' '}
                    Use Current Location
                </label>
                <br />


            </div>
        </div>
    );
}
