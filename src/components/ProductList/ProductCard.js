'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './productcard.module.css';
// import { useState } from 'react';
import { useCartContext } from '@/context/CartContext';

export default function ProductCard({ sku, imageUrl, name, price, tag, discount, count }) {

       const { increaseQuantity, decreaseQuantity, getQuantity } = useCartContext();
        const quantity = getQuantity(sku);

    // const [quantity, setQuantity] = useState(0);

    // const decrease = () => setQuantity(prev => Math.max(0, prev - 1));
    // const increase = () => {if (quantity < count) {setQuantity(prev => prev + 1)}};


    return (
        <div
        className={`${styles.card} ${count === 0 ? styles.soldout : ''}`}
        >
            <div className={styles.greyOut}><h3>SOLD OUT</h3></div>
            <Link href={`/product/${sku}`}>  <div className={styles.imageContainer}>
                <Image src={imageUrl} alt={name} fill objectFit="cover" />
                {discount && <span className={styles.discount}>{`%${discount} Off`}</span>}
            </div>
            </Link>
            <div className={styles.details}>
                <span className={styles.tag}>{tag}</span>
                <h4 className={styles.name}>{name}</h4>
                <p className={styles.price}>₦{price}</p>
                <div className={styles.quantity}>
                    <button onClick={() => decreaseQuantity(sku)} disabled={quantity === 0}>−</button>
                    <span>{quantity}</span>
                    <button onClick={() => quantity < count && increaseQuantity(sku)}>+</button>
                </div>
            </div>
        </div>
    );
}
