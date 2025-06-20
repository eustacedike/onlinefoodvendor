
'use client';


import Image from "next/image";
import Cart from "@/components/Cart/Cart";

import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";

// import Alert from "@/components/CustomAlert/alert";
// import { useAlert } from "@/context/AlertContext";

export default function CartPage() {

    // const { showAlert } = useAlert();

    // const alertBox = (str, msg, bgc, hrc) => {
    //     // console.log("a");
    //     showAlert({
    //         // strong: "Success!",
    //         // message: 'This is a custom alert!',
    //         // bgColor: '#008000', // light green
    //         // hrColor: '#ffffff',
    //          strong: str,
    //         message: msg,
    //         bgColor: bgc, // light green
    //         hrColor: hrc,
    //       });
    //   };

    return (
        <div>
            {/* <p className="subtitle">Choose from our wide range of daily nourishment</p> */}
            {/* <DataFetch /> */}
          
    
           
            <h2 className="title">Cart <FaShoppingCart /><hr /></h2>
            <Cart />
        </div>
    );
}
