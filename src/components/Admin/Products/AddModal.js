

'use client';

import styles from './editModal.module.css';
import { useState, useEffect, useContext } from 'react';
// import { createClient } from '@/utils/supabase/client'; 
import { createProduct } from '@/actions/products';
// import { useRouter } from 'next/navigation'


export default function AddModal({ productGroups, setView }) {

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const [newproductData, setNewProductData] = useState({
        img: null,
        sku: '',
        name: '',
        description: '',
        price: 0,
        discount: 0,
        quantity: 0,
        category: "",
    });
    // const router = useRouter();
    // const { products, setProducts } = useContext(ProductsContext)


    const handleSave = async (e) => {
        // e.preventDefault();
        setLoading(true);
        setErrors({});

        // if (!previewUrl) {
        //     setErrors({ ...errors, img: "No image appended" })
        //     return;
        // }


        const result = await createProduct(newproductData);

        if (result.error) {
            setErrors(result.error);
            console.log(result.error)
        } else {
            // Success! Handle success case
            setSuccess('Product created successfully!');
            setNewProductData({
                img: null,
                sku: '',
                name: '',
                description: '',
                price: 0,
                discount: 0,
                quantity: 0,
                category: "",
            })
            setPreviewUrl(null)
            
// console.log(result)
            // router.refresh() 
        }

        setLoading(false);
    };




    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (file.size > maxSize) {
            // alert("Image size must be under 5MB.");
            setErrors({ ...errors, img: "Image size must be under 5MB." })
            return;
        }
        // setImage(file);
        setNewProductData({ ...newproductData, img: file })
        setPreviewUrl(URL.createObjectURL(file));
    };


    // console.log(products);


    return (
        <div className={styles.modalContainer}>
             <button
                className={styles.backButton}
                onClick={() => setView("default")}
            >
                Back
            </button>
            <div className={styles.containerOne}>


                <h2 className={styles.title}>NEW PRODUCT<hr /></h2>
                <div className={styles.imageUpload}>


                    {/* {previewUrl && (
                        <div style={{ marginTop: "1rem" }}>
                            <img
                                src={previewUrl}
                                alt="Preview"
                                style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "8px" }}
                            />
                        </div>
                    )}

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    /> */}

                    <div className={styles.group}>
                        <div className={styles.card}>


                            <div className={styles.content}>
                                <div>
                                    {/* <h3 className={styles.labelTitle}>Product Image</h3> */}
                                    {/* <p className={styles.subtitle}>Drag & drop your files here</p> */}
                                </div>
                                {previewUrl && (
                                    <div className={styles.preview}>
                                        <span className={styles.remove} onClick={() => { setPreviewUrl(null); setImage(null) }}>&#x274C;</span>
                                        <img
                                            src={previewUrl}
                                            alt="Preview"
                                            style={{ width: "100%", maxWidth: "400px", height: "auto", objectFit: "contain", borderRadius: "8px" }}
                                        />
                                    </div>
                                )}
                                {!previewUrl && (
                                    <div className={styles.dropzoneGroup}>
                                        <div className={styles.dropzone}>
                                            <input
                                                type="file"
                                                className={styles.fileInput}
                                                accept="image/*"
                                                onChange={handleImageChange}
                                            />

                                            <div className={styles.dropzoneContent}>

                                                <div className={styles.iconWrapper}>
                                                    <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                        />
                                                    </svg>
                                                </div>
                                                <div className={styles.dropzoneText}>
                                                    <p className={styles.dropTitle}>Drop your files here or browse</p>
                                                    <p className={styles.supportText}>Support files: JPG, GIF, JPEG, PNG, WEBP</p>
                                                    <p className={styles.supportText}>Max file size: 5MB</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </div>
                            {errors.img && <p className={styles.error}>{errors.img}</p>}
                        </div>
                    </div>
                </div>
            </div>


            <div className={styles.containerTwo}>


                <div className={styles.inputGroup}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name='name'
                            value={newproductData.name}
                            onChange={(e) => setNewProductData({ ...newproductData, name: e.target.value })}
                            placeholder="eg: Pasta"
                            required />
                            {errors.name && <p className={styles.error}>{errors.name}</p>}
                    </div>

                    <div>
                        <label htmlFor="sku">SKU</label>
                        <input
                            type="text"
                            id="sku"
                            name='sku'
                            value={newproductData.sku}
                            onChange={(e) => setNewProductData({ ...newproductData, sku: e.target.value })}
                            placeholder="eg: pasta-3f12"
                            required />
                            {errors.sku && <p className={styles.error}>{errors.sku}</p>}
                    </div>
                </div>
                {/* <div className={styles.inputGroup}>
                    <div>
                        <label htmlFor="sku">SKU</label>
                        <input
                            type="text"
                            id="sku"
                            name='sku'
                            placeholder="eg: pasta-3f12"
                            required />
                    </div>
                </div> */}
                <div className={styles.inputGroup}>
                    <div>
                        <label htmlFor="price">Price</label>
                        <input
                            type="number"
                            id="price"
                            name='price'
                            value={newproductData.price}
                            onChange={(e) => setNewProductData({ ...newproductData, price: e.target.value })}
                            placeholder="eg: 3500"
                            required />
                            {errors.price && <p className={styles.error}>{errors.price}</p>}
                    </div>
                    <div>
                        <label htmlFor="quantity">Quantity</label>
                        <input
                            type="text"
                            id="quantity"
                            name='quantity'
                            value={newproductData.quantity}
                            onChange={(e) => setNewProductData({ ...newproductData, quantity: e.target.value })}
                            placeholder="eg: 15"
                            required />
                            {errors.quantity && <p className={styles.error}>{errors.quantity}</p>}
                    </div>
                </div>
                <div className={styles.inputGroup}>
                    <div>
                        <label htmlFor="discount">Discount (%)</label>
                        <input
                            type="number"
                            id="discount"
                            name='discount'
                            value={newproductData.discount}
                            onChange={(e) => setNewProductData({ ...newproductData, discount: e.target.value })}
                            placeholder="value between 0 to 100"
                            min="0"
                            max="100"
                            required />
                            {errors.discount && <p className={styles.error}>{errors.discount}</p>}
                    </div>
                    <div>
                        <label htmlFor="category">Category</label>
                        <select
                            // value={newproductData.name}
                            onChange={(e) => setNewProductData({ ...newproductData, category: e.target.value })}
                            required>
                                <option value="">Select one...</option>
                            {productGroups.map((group) => (
                                <option key={group.name} value={group.name}>
                                    {group.name}
                                </option>
                            ))}
                        </select>
                        {errors.category && <p className={styles.error}>{errors.category}</p>}
                    </div>

                </div>
                <div className={styles.inputGroup}>
                    <div>
                        <label htmlFor="description">Description</label>

                        <textarea
                            id="description"
                            name='description'
                            placeholder="30 to 600 characters..."
                            value={newproductData.description}
                            onChange={(e) => setNewProductData({ ...newproductData, description: e.target.value })}

                        >

                        </textarea>
                        {errors.description && <p className={styles.error}>{errors.description}</p>}
                    </div>


                </div>



                <button type="submit" className={styles.saveButton}
                    disabled={loading}
                    onClick={handleSave}
                > {loading ? 'Saving…' : 'Save'}</button>
{success && <p className={styles.success}>{success}</p>}


                {/* {state?.error && (
                    <div className="error-message" style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>
                        <small>{state.error}</small>
                    </div>
                )} */}
            </div>
        </div>
    );
}
