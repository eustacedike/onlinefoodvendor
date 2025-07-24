import Image from "next/image";
import styles from "./products.module.css";
import Blank from "../../Loading/Blank";
import Link from "next/link";
import { useState } from "react";

import AddModal from "./AddModal";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import ManageGroups from "./ManageGroups";

export default function AdminProducts({ products, productGroups }) {
    const [isChecked, setIsChecked] = useState(false);
    const [view, setView] = useState("default");
    const [editIndex, setEditIndex] = useState(null);
    const [deleteModal, setDeleteModal] = useState(-1);


    // console.log(products)


    return (
        view === "edit" ? (
            <div className={styles.modal}>
                <EditModal
                    productGroups={productGroups}
                    product={products[editIndex]}
                    setView={setView}
                />
            </div>
        ) : view === "add" ? (
            <div className={styles.modal}>
                <AddModal productGroups={productGroups} setView={setView} />
            </div>
        )  : view === "managegroups" ? (
            <div className={styles.modal}>
                <ManageGroups products={products} productGroups={productGroups} setView={setView} />
            </div>
        ): (
            <div className={styles.productsMain}>

                {/* <div className={styles.filter}>
                    <button
                        onClick={() => { setView('add') }}>
                        Add New Product
                    </button>
                </div> */}

{/* <DeleteModal product={{title: "test"}}/> */}
{deleteModal > -1 && <DeleteModal product={products[deleteModal]} setDeleteModal={setDeleteModal}/>}


                <div className={styles.switches}>
                    <div className={styles.toggler}>
                        CARD VIEW
                        <label>
                            <div className={styles.toggle}>
                                <input
                                    className={styles.toggleState}
                                    type="checkbox"
                                    name="check"
                                    value="check"
                                    checked={isChecked}
                                    onChange={(e) => setIsChecked(e.target.checked)}
                                />
                                <div className={styles.indicator}></div>
                            </div>
                        </label>
                        TABLE VIEW
                    </div>
                    <div className={styles.nav}>
                        <button
                            onClick={() => { setView('add') }}>
                            Add New Product
                        </button>
                        <button
                            onClick={() => { setView('managegroups') }}>
                            Manage Groups
                        </button>
                    </div>
                </div>
                {/* <div className={styles.filter}>
                    Filter
                </div> */}

                <br />
                <br />

                {products.length === 0 ? (
                    <Blank content="Nothing to show here" imgSrc={null} />
                ) : (
                    <div className={styles.productsContainer}>
                        {isChecked ? (
                            <table className={styles.productsTable}>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>SKU</th>
                                        <th>Price</th>
                                        <th>Discount</th>
                                        <th>Quantity</th>
                                        <th>Category</th>
                                        <th>Action</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product, index) => (
                                        <tr key={product.id}>
                                            <td>{product.id}</td>
                                            <td>{product.title}</td>
                                            <td>{product.sku}</td>
                                            <td>₦{Intl.NumberFormat('en-US').format(product.price)}</td>
                                            <td>{product.discount}</td>
                                            <td
                                                style={{
                                                    color: 'white',
                                                    backgroundColor: product.count < 10 ? 'red' : 'limegreen',
                                                }}
                                            >
                                                {product.count}
                                            </td>
                                            <td>{product.group}</td>
                                            <td>
                                                <button
                                                    className={styles.productBtn}
                                                    style={{ background: 'var(--primary-color)' }}
                                                    onClick={() => {
                                                        setEditIndex(index)
                                                        setView('edit')
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                className={styles.productBtn}
                                                style={{ background: 'crimson' }}
                                                onClick={() => {setDeleteModal(index)}}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className={styles.gridView}>
                                {products.map((product, index) => (
                                    <div key={product.id} className={styles.card}>
                                        <div className={styles.containerOne}>
                                            <div className={styles.imageContainer}>
                                                <Image
                                                    src={product.img}
                                                    alt={product.title}
                                                    fill
                                                    className={styles.image}
                                                    objectFit="cover"
                                                />
                                            </div>
                                            <div className={styles.yt}>
                                                <h4 className={styles.name}>{product.title}</h4>
                                                <span>
                                                    <span className={styles.tag}>{product.group}</span> &nbsp;
                                                    {product.discount && (
                                                        <span className={styles.discount}>
                                                            {`%${product.discount} Off`}
                                                        </span>
                                                    )}
                                                </span>
                                                <p className={styles.sku}>
                                                    <strong>sku:</strong> {product.sku}
                                                </p>
                                            </div>
                                        </div>
                                        <div className={styles.details}>
                                            <p className={styles.description}>{product.description}</p>
                                        </div>
                                        <div className={styles.details}>
                                            <div className={styles.sub}>
                                                <p className={styles.sku}>
                                                    <strong>Quantity:</strong>
                                                </p>
                                                <h4
                                                    className={styles.name}
                                                    style={{ color: product.count < 10 ? 'red' : 'limegreen' }}
                                                >
                                                    {product.count}
                                                </h4>
                                            </div>
                                            <div className={styles.sub}>
                                                <p className={styles.sku}>
                                                    <strong>Price:</strong>
                                                </p>
                                                <h4 className={styles.name}>₦{product.price}</h4>
                                            </div>
                                            <div className={styles.sub}>
                                                <button
                                                    className={styles.productBtn}
                                                    style={{ background: 'var(--primary-color)' }}
                                                    onClick={() => {
                                                        setEditIndex(index);
                                                        setView('edit');
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                className={styles.productBtn}
                                                style={{ background: 'crimson' }}
                                                onClick={() => {setDeleteModal(index)}}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        )

    );
}
