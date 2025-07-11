'use client';

import Image from 'next/image';
import styles from './productdetail.module.css';
import { useState } from 'react';
import Link from 'next/link';
import soldOutImage from '../../public/images/soldout.png'; // Adjust the path as necessary
import { useCartContext } from '@/context/CartContext'; // Adjust the path as necessary

export default function ProductDetail({ sku, imageUrl, name, description, price, tag, discount, count }) {


    const { increaseQuantity, decreaseQuantity, getQuantity } = useCartContext();
    const quantity = getQuantity(sku);

    // const [quantity, setQuantity] = useState(0);

    // const decrease = () => setQuantity(prev => Math.max(0, prev - 1));
    // const increase = () => {if (quantity < count) {setQuantity(prev => prev + 1)}};




    return (
        <div
        className={`${styles.productDetail} ${count === 0 ? styles.soldout : ''}`}
        >
            {/* <div className={styles.greyOut}><h3>SOLD OUT</h3></div> */}
            {count === 0 && (
                <div className={styles.soldOutImage}>
                    <Image src={soldOutImage} alt="Sold Out" layout='responsive' />
                </div>
            )}
            <div className={styles.imageContainer}>
                <Image src={imageUrl} alt={name} fill objectFit="contain" />
                {discount && <span className={styles.discount}>{`%${discount} Off`}</span>}
            </div>
            <div className={styles.details}>
            <h4 className={styles.name}>{name}</h4>
            <p className={styles.price}>₦{price}</p>
                <span className={styles.tag}>{tag}</span>
                <br/>
                <p className={styles.description}>{description}</p>
                <br/>
                <div className={styles.quantity}>
                    <button onClick={() => decreaseQuantity(sku)} disabled={quantity === 0}>−</button>
                    <span>{quantity}</span>
                    <button onClick={() => quantity < count && increaseQuantity({sku, name, price})}>+</button>
                    <Link href="/cart"><button className={styles.goTo}>VIEW CART</button></Link>
                </div>
            </div>
        </div>
    );
}
