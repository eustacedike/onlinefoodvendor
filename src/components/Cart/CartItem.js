'use client';

import styles from './cart.module.css';
import { useState, useEffect } from 'react';
import Image from "next/image";
import { useCartContext } from '@/context/CartContext';

// import { useProductContext } from '@/context/ProductContext';
// import DataFetch from "@/context/datafetch";

export default function CartItem({ product }) {

    // const { products, productGroups } = useProductContext();

    // const [productSkus, setProductSkus] = useState(["a","b"]);

    // function updateCartItem(sku, quantityToAdd) {
        // Get cart from localStorage or initialize it
    //     let cart = JSON.parse(localStorage.getItem('cart')) || [];

    //     // Find the item by SKU
    //     const existingItemIndex = cart.findIndex(item => item.sku === sku);

    //     if (existingItemIndex !== -1) {
    //         // Update quantity
    //         cart[existingItemIndex].quantity += quantityToAdd;

    //         // Ensure quantity doesn't go below 1 (optional)
    //         if (cart[existingItemIndex].quantity < 1) {
    //             cart.splice(existingItemIndex, 1); // remove item
    //         }
    //     } else {
    //         // Add new item
    //         cart.push({ sku, quantity: quantityToAdd });
    //     }

    //     // Save back to localStorage
    //     localStorage.setItem('cart', JSON.stringify(cart));
    // }



    // const [quantity, setQuantity] = useState(0);

    // useEffect(() => {
    //     const cart = JSON.parse(localStorage.getItem("cart")) || [];
    //     const item = cart.find(i => i.sku === product.sku);

    //     if (item) {
    //         setQuantity(item.quantity);
    //     } else {
    //         setQuantity(0); // or leave unchanged
    //     }
    // }, []);

    // const decrease = () => {
    //     setQuantity(prev => Math.max(0, prev - 1))
    //     updateCartItem(product.sku, -1);
    //     if (quantity === 0) return; // Prevent negative quantity
    //     const cart = JSON.parse(localStorage.getItem("cart")) || [];
    //     const item = cart.find(i => i.sku === product.sku);

    //     if (item) {
    //         setQuantity(item.quantity);
    //     } else {
    //         setQuantity(0); // or leave unchanged
    //     }
    // };
    // const increase = () => {
    //     if (quantity < product.count) { setQuantity(prev => prev + 1) }
    //     updateCartItem(product.sku, 1);

    //     const cart = JSON.parse(localStorage.getItem("cart")) || [];
    //     const item = cart.find(i => i.sku === product.sku);

    //     if (item) {
    //         setQuantity(item.quantity);
    //     } else {
    //         setQuantity(0); // or leave unchanged
    //     }
    // };

     const { increaseQuantity, decreaseQuantity, getQuantity } = useCartContext();
            const quantity = getQuantity(product.sku);

            const { sku, name, price } = product;

    return (
        <div key={product.id} className={styles.cartItem}>
            {/* <h1>{product.title}</h1> */}
            <div className={styles.imageContainer}>
                <Image src={product.img} alt={product.title} fill objectFit="contain" />
                {/* {product.discount && <span className={styles.discount}>{`%${product.discount} Off`}</span>} */}

            </div>

            <div className={styles.details}>
                <div className={styles.namePrice}>
                    <h4 className={styles.name}>{product.title}</h4>
                    <p className={styles.price}>₦{product.price}</p>
                </div>
                <div className={styles.quantity}>
                    <button onClick={() => decreaseQuantity(product.sku)} disabled={quantity === 0}>−</button>
                    <span>{quantity}</span>
                    <button onClick={() => quantity < product.count && increaseQuantity({sku, name, price})}>+</button>
                </div>
                <div className={styles.total}>
                    {product.discount && <span className={styles.discount}>{`%${product.discount} Off`}</span>}
                    <span className={styles.totalAmount}>₦{(product.price - ((product.price * product.discount) / 100)) * quantity}</span>
                    <span className={styles.amountOff} >{`-₦${((product.price * product.discount) / 100) * quantity}`}</span>
                </div>
            </div>
        </div>
    )

}
