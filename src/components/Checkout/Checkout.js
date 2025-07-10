'use client';

import styles from './checkout.module.css';
import { useState, useEffect, useMemo } from 'react';

import CheckoutUserDetails from './CheckoutUserDetails';
import OrderSummary from './OrderSummary';

import { useProductContext } from '@/context/ProductContext';
// import { useCartContext } from '@/context/CartContext';
import DataFetch from "@/context/datafetch";

export default function Checkout() {

    const { products, productGroups } = useProductContext();

   


    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        phoneNo: '',
        location: null,
        address: '',
        verified: false,
        addressCords: {
            lat: 0, 
            lng: 0
          }
        // addressCords: {
        //     lat: 6.425469, 
        //     lng: 3.611590
        //   }
      });

    // const [useCurrentLocation, setUseCurrentLocation] = useState(false);

    // const [fullname, setFullname] = useState("");
    // const [email, setEmail] = useState("");
    // const [phoneNo, setPhoneNo] = useState("");
    // const [address, setAddress] = useState("");
    const [error, setError] = useState(null);
    // const [location, setLocation] = useState(null);

    // const { getCartItems } = useCartContext();


    // const cartStore = useCartContext().cart;


    // const [cartItems, setCartItems] = useState([]);

    // useEffect(() => {
    //     if (products && products.length > 0) {
    //         const newCartItems = products.reduce((acc, product) => {
    //             const matchingSkuItem = cartStore.find(item => item.sku === product.sku);
    //             if (matchingSkuItem) {
    //                 acc.push({
    //                     ...product,
    //                     ...matchingSkuItem
    //                 });
    //             }
    //             return acc;
    //         }, []);

    //         setCartItems(newCartItems);

    //     }
    // }, [products, cartStore]);



    return (
        <div className={styles.checkoutMain}>

            <DataFetch />

            <CheckoutUserDetails formData={formData} setFormData={setFormData} />
            <OrderSummary formData={formData} />



        </div>
    );
}
