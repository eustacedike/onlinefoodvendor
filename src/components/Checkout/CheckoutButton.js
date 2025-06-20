

// components/CheckoutButton.js
'use client';

import { useRouter } from 'next/navigation';
import style from './checkout.module.css'; // Assuming you have some styles
// import { GrSend } from "react-icons/gr";
import { useAlert } from '@/context/AlertContext';

export default function CheckoutButton({ email, amount, fullname, phoneno, address }) {
  const router = useRouter();

   const { showAlert } = useAlert();
  
   const alertBox = (str, msg, bgc, hrc) => {
    console.log("a");
    showAlert({
         strong: str,
        message: msg,
        bgColor: bgc, // light green
        hrColor: hrc,
      });
  };

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
        alertBox("Failed!",'Please, enter your full name','#ff0000','#ffffff');
        // alert('Full name is required');
        return;
      }

      if (!emailRegex.test(email)) {
        alertBox("Failed!",'Please enter a valid email address','#ff0000','#ffffff');
        return;
      }

      if (!phoneRegex.test(phoneno)) {
        alertBox("Failed!",'Please enter a valid 11-digit phone number starting with 0','#ff0000','#ffffff');
        return;
      }

      if (!address?.trim()) {
        alertBox("Failed!",'Address is required','#ff0000','#ffffff');
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
