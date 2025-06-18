

// components/CheckoutButton.js
'use client';

import { useRouter } from 'next/navigation';
import style from './checkout.module.css'; // Assuming you have some styles
// import { GrSend } from "react-icons/gr";

export default function CheckoutButton({ email, amount, fullname, phoneno, address }) {
  const router = useRouter();

  const handleCheckout = async () => {
    try {
      const res = await fetch('/api/paystack/init', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, amount }),
      });

      const result = await res.json();
      // console.log('Paystack response:', result);

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^0\d{10}$/; // Starts with 0 and must be 11 digits total

      if (!fullname.trim()) {
        alert('Full name is required');
        return;
      }

      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
      }

      if (!phoneRegex.test(phoneno)) {
        alert('Please enter a valid 11-digit phone number starting with 0');
        return;
      }

      if (!address?.trim()) {
        alert('Address is required');
        return;
      }



      if (result?.status && result?.data?.authorization_url) {
        // Redirect user to Paystack checkout
        window.location.href = result.data.authorization_url;
      } else {
        alert('Failed to initialize payment');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Something went wrong');
    }
  };

  return (
    <button className={style.checkoutButton} onClick={handleCheckout}>
      Pay &nbsp; ₦{Intl.NumberFormat('en-US').format(amount / 100)}
    </button>
  );
}
