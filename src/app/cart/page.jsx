
'use client';


import Image from "next/image";
import Cart from "@/components/Cart/Cart";

import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";

// import Alert from "@/components/CustomAlert/alert";
// import { useAlert } from "@/context/AlertContext";

export default function CartPage() {

    // const { showAlert } = useAlert();

    // const alertBox = () => {
    //     console.log("a");
    //     showAlert({
    //         message: 'This is a custom alert!',
    //         bgColor: '#d1e7dd', // light green
    //         hrColor: '#0f5132'
    //       });
    //   };

    return (
        <div>
            {/* <p className="subtitle">Choose from our wide range of daily nourishment</p> */}
            {/* <DataFetch /> */}
          
            {/* <button onClick={alertBox}>clickalert</button> */}
           
            <h2 className="title">Cart <FaShoppingCart /><hr /></h2>
            <Cart />
        </div>
    );
}
