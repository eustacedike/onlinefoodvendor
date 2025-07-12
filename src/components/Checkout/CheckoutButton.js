

// components/CheckoutButton.js
'use client';

import { useRouter } from 'next/navigation';
import style from './checkout.module.css'; // Assuming you have some styles
// import { GrSend } from "react-icons/gr";
// import { useAlert } from '@/context/AlertContext';
import { useAuthUser } from '@/hooks/useAuthUser';
import { useCartContext } from '@/context/CartContext';


export default function CheckoutButton({ email, amount, fullname, phoneno, address, cords, verified, setError, delivery, vat, subtotal }) {
  const router = useRouter();
    const { user, profile, loading } = useAuthUser();

    const type = user ? 'user' : 'guest';

      const { getCartItems } = useCartContext();
      const items = getCartItems();


  //  const { showAlert } = useAlert();
  
  //  const alertBox = (str, msg, bgc, hrc) => {
  //   console.log("a");
  //   showAlert({
  //        strong: str,
  //       message: msg,
  //       bgColor: bgc, // light green
  //       hrColor: hrc,
  //     });
  // };

  const handleCheckout = async () => {
    try {
      

      // console.log('Paystack response:', result);

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^0\d{10}$/; // Starts with 0 and must be 11 digits total
      function isWithinLagos(lat, lng) {
        return lat >= 6.3 && lat <= 6.7 && lng >= 3.0 && lng <= 3.6;
      }

      if (!verified) {
        setError("Please verify your email address first");
        return;
      }

      if (subtotal <= 0) {
        // alertBox("Failed!",'Please add items to your cart before checking out','#ff0000','#ffffff');
        setError("Please add items to your cart before checking out");
        return;
      }

      if (!fullname.trim()) {
        // alertBox("Failed!",'Please enter your full name','#ff0000','#ffffff');
        setError("Please enter your full name");
        // alert('Full name is required');
        return;
      }

      if (!emailRegex.test(email)) {
        // alertBox("Failed!",'Please enter a valid email address','#ff0000','#ffffff');
        setError("Please enter a valid email address");
        return;
      }

      if (cords.lat === 0 || cords.lng === 0) {
        // alert("Sorry, we currently only deliver within Lagos.");
        setError("Please, select a valid address or allow location access");
        return;
      }

      if (!isWithinLagos(cords.lat, cords.lng)) {
        // alert("Sorry, we currently only deliver within Lagos.");
        setError("Sorry, we currently only deliver within Lagos");
        return;
      }
    

      if (!phoneRegex.test(phoneno)) {
        // alertBox("Failed!",'Please enter a valid 11-digit phone number starting with 0','#ff0000','#ffffff');
        setError("Please enter a valid 11-digit phone number starting with 0");
        return;
      }

      // if (!address?.trim()) {
      //   alertBox("Failed!",'Address is required','#ff0000','#ffffff');
      //   return;
      // }

      const res = await fetch('/api/paystack/init', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, amount, type, items, address, delivery, vat, subtotal, phoneno }),
      });

      const result = await res.json();


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
