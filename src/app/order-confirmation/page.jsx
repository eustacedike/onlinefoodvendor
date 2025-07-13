// components/PendingOrderConfirmation.jsx
// If using Next.js App Router, add 'use client'
'use client';

import React from 'react';
import Link from 'next/link'; // Assuming you are in a Next.js environment
import { useState, useEffect, Suspense } from 'react';
import styles from './orderconfirmation.module.css'; // Import the CSS module
import { FaHourglassHalf, FaHome, FaHistory } from 'react-icons/fa'; // Example icons
import { BsPatchCheckFill,  BsFillPatchExclamationFill } from "react-icons/bs";

// import { useOrderContext } from '@/context/OrderContext'; 
// import { useRouter, useSearchParams } from 'next/navigation';
// You might receive the orderId as a prop if available
export default function PendingOrderConfirmation({  }) {
    
    
    // const searchParams = useSearchParams();
    const [paymentStatus, setPaymentStatus] = useState('pending');
    const [paidAmount, setPaidAmount] = useState(null);
    // const searchParams = useSearchParams();
    const [reference, setReference] = useState('');
  
    //  const { orders } = useOrderContext();
     // const { products, productGroups } = useProductContext();
//    console.log(orders);
     // Ensure comparison is valid (string === string)
    //  const order = orders.find(o => o.ref === reference);

    

    useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const q = params.get('reference');
      setReference(q);
    }, []);

// const reference = "md0mts5j-lVNI3L6xixGlUBe6";
    useEffect(() => {
        if (!reference) return;
      
        async function verify() {
          try {
            const res = await fetch('/api/paystack/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ reference }),
            });
      
            const result = await res.json();
      
            if (result.status) {
              setPaymentStatus('confirmed');
              setPaidAmount(result.data.amount / 100); // Convert to Naira
            } else {
              console.error(result.error);
              setPaymentStatus('failed');
            }
          } catch (err) {
            console.error('Verification error:', err);
            setPaymentStatus('failed');
          }
        }
      
        verify();
      }, [reference]);
      

    return (
        // <Suspense fallback={<p>Loading...</p>}>{ 
        paymentStatus === 'pending' ?
            (<div className={styles.container}>
                <div className={styles.card}>
                    <h2 className={styles.title}>Order Received</h2>
                    {/* <FaHourglassHalf className={styles.icon} />  */}

                    <div className={styles.loader}>
                        <div className={styles.spinner}></div>
                        <p>Please wait while we confirm your payment...</p>
                    </div>

                    <br />

                    <p className={styles.message}>
                        You will receive an email confirmation with tracking details once your order has been confirmed.

                        {/* {orderId && <strong className={styles.orderId}>#{orderId}</strong>}{' '}
          has been successfully placed and is currently being processed. */}
                    </p>

                    <p className={styles.instruction}>
                        Please don’t refresh or close this page. This will only take a moment.
                    </p>

                    <div className={styles.actions}>
                        {/* <Link href="/" className={styles.button}>
            <FaHome className={styles.buttonIcon} /> Go to Homepage
          </Link> */}
                        {/* You might want a link to order history if applicable */}
                        {/*
          <Link href="/order-history" className={styles.button}>
            <FaHistory className={styles.buttonIcon} /> View Order History
          </Link>
          */}
                    </div>


                </div>
            </div>)
            : paymentStatus === 'confirmed' ? (
                <div className={styles.container}>
                    <div className={styles.card}>
                        <h2 className={styles.title} style={{color: "limegreen"}}>Order Confirmed</h2>
                        {/* <FaCheckCircle className={styles.icon} /> */}
                        <BsPatchCheckFill className={styles.icon} style={{color: "limegreen"}}/>
                        <p className={styles.message}>
                            Your order has been confirmed! Thank you for your patience.
                        </p>
                        <p className={styles.message}>
                            <strong>Paid:</strong> {paidAmount ? `₦${Intl.NumberFormat('en-US').format(paidAmount)}` : null}
                        </p>
                        <p className={styles.instruction}>
                            Please check your email for confirmation details and tracking information.
                        </p>
                        <div className={styles.actions}>
                            <Link href={`/orders/${reference}`} className={styles.button}>
                                {/* <FaHome className={styles.buttonIcon} />  */}
                                View Order
                            </Link>
                
                        </div>
                    </div>
                </div>
            ) :

                (<div>
                      <div className={styles.container}>
                    <div className={styles.card}>
                        <h2 className={styles.title} style={{color: "red"}}>Payment Failed</h2>
                        {/* <FaCheckCircle className={styles.icon} /> */}
                        < BsFillPatchExclamationFill className={styles.icon} style={{color: "red"}}/>
                        <p className={styles.message}>
                        We couldn't verify your payment. This may be due to an error or incomplete transaction.
                        </p>
                        
                        
                        <div className={styles.actions}>
                            <Link href="/checkout" className={styles.button}>
                                {/* <FaHome className={styles.buttonIcon} />  */}
                                Try Again
                            </Link>
                
                        </div>
                    </div>
                </div>
                </div>)
// }                </Suspense>


    );
}