'use client';

import styles from './ordersummary.module.css';
import { useCartTotal } from '@/hooks/useCartTotal';

import CheckoutButton from './CheckoutButton';
import { useState, useEffect } from 'react';
// import Image from "next/image";
import { TiArrowLeftOutline } from "react-icons/ti";
import CheckoutModal from '../Checkout/Checkout';

export default function OrderSummary({formData}) {

    function formatNumberWithCommas(number) {
        return new Intl.NumberFormat('en-US').format(number);
    }

    const subtotal = useCartTotal();

    const vendorLocation = {
        lat: 6.558125, 
        lng: 3.398260
      };

    //   const vendorLocation = '6.558125,3.398260';

    const [delivery, setDelivery] = useState(0);
    const [loadingFee, setLoadingFee] = useState(false);
    const [error, setError] = useState(null);

    // function getDistanceInKm(coord1, coord2) {
    //     const R = 6371; // Earth radius in km
    //     const dLat = (coord2.lat - coord1.lat) * Math.PI / 180;
    //     const dLon = (coord2.lng - coord1.lng) * Math.PI / 180;
      
    //     const a = Math.sin(dLat / 2) ** 2 +
    //               Math.cos(coord1.lat * Math.PI / 180) *
    //               Math.cos(coord2.lat * Math.PI / 180) *
    //               Math.sin(dLon / 2) ** 2;
      
    //     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      
    //     return R * c; // distance in km
    //   }
      
    //   function calculateDeliveryFee(distanceKm) {
    //     const baseRate = 275;
    //     const minFee = 1500;
    //     const fee = Math.ceil(distanceKm * baseRate);
    //     return Math.max(fee, minFee);
    //   }

      useEffect(() => {
        const getFee = async () => {
          if (!formData?.addressCords) return;
          setLoadingFee(true);
          try {
            const res = await fetch('/api/delivery-fee', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                origin: vendorLocation,
                destination: {
                    lat: formData.addressCords.lat, 
                    lng: formData.addressCords.lng
                  }
                // destination: `${formData.addressCords.lat},${formData.addressCords.lng}`,
              }),
            });
    
            const result = await res.json();
            if (result.deliveryFee) {
              setDelivery(result.deliveryFee);
            } else {
              setError(result.error || 'Could not calculate delivery fee.');
            }
          } catch (err) {
            console.error(err);
            setError('Failed to fetch delivery fee.');
          } finally {
            setLoadingFee(false);
          }
        };
    
        getFee();
      }, [formData?.addressCords]);
    

    //   const newVat = (subtotal * 7.5) / 100;
    // const [checkoutModal, setCheckoutModal] = useState(false);
    // const [checkoutModal, setCheckoutModal] = useState(false);
    // console.log(vendorLocation);
    // console.log(formData);
    // console.log(formData.formData.addressCords);

    // useEffect(() => {
    //     if (formData?.addressCords) {
    //       const distance = getDistanceInKm(vendorLocation, formData.addressCords);
    //       const newDeliveryFee = calculateDeliveryFee(distance);
    //       setDelivery(newDeliveryFee);
    //     }
    //   }, [formData?.addressCords]);

    // const distance = getDistanceInKm(vendorLocation, formData.addressCords);
    // const newDeliveryFee = calculateDeliveryFee(distance);
    // setDelivery(newDeliveryFee);

    // const delivery = 2500;
    const vat = (subtotal * 7.5) / 100;
    const total = subtotal + delivery + vat;



    return (

        <div className={styles.orderSummary}>
            <h3>Order Summary</h3>
            <hr />
            <div className={styles.subtotal}>
                <span>Subtotal</span><span className={styles.amount}>₦{subtotal}</span>
            </div>
            <div className={styles.delivery}>
                <span>Delivery</span><span className={styles.amount}>{loadingFee ? 'Calculating...' : `₦${delivery}`}</span>
            </div>
            <div className={styles.vat}>
                <span>VAT (7.5%)</span><span className={styles.amount}>₦{Math.ceil(vat * 100) / 100}</span>
            </div>
            <hr />
            <div className={styles.total}>
                <span>Total</span><span className={styles.amount}>₦{formatNumberWithCommas(Math.round(total))}</span>
            </div>
           

            <CheckoutButton
                email={formData.email}
                fullname={formData.fullname}
                phoneno={formData.phoneNo}
                address={formData.address}
                subtotal={subtotal}
                amount={Math.round(total) * 100}
                cords={formData.addressCords}
                verified={formData.verified}
                setError={setError}
            /> 
           {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        </div>
    )

}
