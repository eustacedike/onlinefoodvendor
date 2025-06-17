
'use client';


import Image from "next/image";
import Cart from "@/components/Cart/Cart";

import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";


export default function CartPage() {


    return (
        <div>
            {/* <p className="subtitle">Choose from our wide range of daily nourishment</p> */}
            {/* <DataFetch /> */}
            <h2 className="title">Cart <FaShoppingCart /><hr /></h2>
            <Cart />
        </div>
    );
}
