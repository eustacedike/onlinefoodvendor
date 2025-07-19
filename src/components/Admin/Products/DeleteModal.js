

'use client';

import styles from './deleteModal.module.css';
import { useState, useEffect } from 'react';
import { deleteProduct } from '@/actions/products';


export default function DeleteModal({ product, setDeleteModal }) {

    async function handleDelete() {
        const result = await deleteProduct(product.sku)

        if (result.error) {
            // Handle error (show toast, alert, etc.)
            alert(result.error)
        } else {
            // Handle success
            //   alert('Product deleted successfully!')
            setDeleteModal(-1)
        }
    }


    return (
        <div className={styles.modalContainer}>
            <div className={styles.innerContainer}>

                <h3>Are you sure you want to delete &#39;{product.title}&#39;?</h3>
                <div className={styles.actionBtns}>
                    <button
                        style={{ background: "lightblue" }}
                        onClick={() => setDeleteModal(-1)}>Cancel</button>
                    <button
                    onClick={handleDelete}
                    style={{ background: "crimson" }}>Delete</button>
                </div>
                <p><span style={{ color: "red" }}>*</span>You won&#39;t be able to undo this action</p>

            </div>
        </div>
    );
}
