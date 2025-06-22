
'use client';

// import CheckoutModal from "@/components/Checkout/Checkout";
// import OrderSummary from "@/components/Cart/OrderSummary";
import Checkout from "@/components/Checkout/Checkout";

import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";


export default function CheckoutPage() {

    return (
        <div>
           
            <h2 className="title">Checkout<hr /></h2>
           <Checkout/>
        </div>
    );
}
