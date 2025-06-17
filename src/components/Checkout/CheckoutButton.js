

// components/CheckoutButton.js
'use client';

import { useRouter } from 'next/navigation';
import style from './checkout.module.css'; // Assuming you have some styles

export default function CheckoutButton({ email, amount }) {
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
      console.log('Paystack response:', result);

      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            alert('Please enter a valid email address');
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
      Proceed to Checkout
    </button>
  );
}
