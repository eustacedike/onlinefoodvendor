'use client';

import styles from './cart.module.css';
import { useState, useEffect, useMemo } from 'react';
// import Image from "next/image";
import CartItem from './CartItem';
import OrderSummary from './OrderSummary';
// import BlankCart from './Blank';
import Blank from '../Loading/Blank';

import { useProductContext } from '@/context/ProductContext';
import { useCartContext } from '@/context/CartContext';
import DataFetch from "@/context/datafetch";

export default function Cart() {

    const { products, productGroups } = useProductContext();
    // const cartStore = useMemo(() => [
    //     { sku: "shawarmaa", quantity: 2 },
    //     { sku: "mochab", quantity: 1 },
    //     { sku: "burgerb", quantity: 1 },
    //   ], []); 
    const { getCartItems } = useCartContext();


    const cartStore = useCartContext().cart;


    // const [cartStore, setCartStore] = useState(() => {
    //     return JSON.parse(localStorage.getItem("cart")) || [];
    //   });


    // console.log(cartStore);


    const [cartItems, setCartItems] = useState([]);
    // const [total, setTotal] = useState(0);

    useEffect(() => {
        if (products && products.length > 0) {
            const newCartItems = products.reduce((acc, product) => {
                const matchingSkuItem = cartStore.find(item => item.sku === product.sku);
                if (matchingSkuItem) {
                    acc.push({
                        ...product,
                        ...matchingSkuItem
                    });
                }
                return acc;
            }, []);

            setCartItems(newCartItems);

            // Calculate total using the new cart items
            // const calculatedTotal = newCartItems.reduce((sum, item) => {
            //   const price = Number(item.price) || 0;
            //   const quantity = Number(item.quantity) || 0;
            //   const discount = Number(item.discount) || 0;

            //   const discountedPrice = price - ((price * discount) / 100);
            //   return sum + (discountedPrice * quantity);
            // }, 0);

            // setTotal(calculatedTotal);
        }
    }, [products, cartStore]);









    // console.log(cartItems);
    // console.log(total);

    return (
        <div className={styles.cart}>

            <DataFetch />

            {cartStore.length === 0 ? (<> <Blank content="Cart Empty!" imgSrc={null} /> </>) :

                (<>
                    <div className={styles.cartItems}>
                        {cartItems.map(eachItem => {
                            return (
                                <CartItem product={eachItem} key={eachItem.Id} />

                            )
                        })}
                    </div>
                    <OrderSummary />
                </>)
            }

        </div>
    );
}
