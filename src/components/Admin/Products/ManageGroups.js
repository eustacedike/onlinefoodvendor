

'use client';

import styles from './manageGroups.module.css';
import { useState, useEffect } from 'react';
import { deleteGroup, addGroup } from '@/actions/products';


export default function ManageGroups({ products, productGroups, setView }) {

    // console.log(products)

    const [groups, setGroups] = useState(productGroups);
    const [newGroup, setNewGroup] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    async function handleDelete(id, title) {
        const result = await deleteGroup(id, title)
        setError("")

        if (result.error) {
            setError(result.error)
        } else {

            // setView("default")
            //setProductGroups to pop previous 
            setGroups(prev => prev.filter(group => group.id !== id));
        }
    }

    async function handleAdd() {
        const result = await addGroup(newGroup)
        setError("")

        if (result.error) {
            setError(result.error)
        } else {

            // setView("default")
            //setProductGroups to add newGroup with maxId + 1
            setGroups(prev => {
                const maxId = prev.length ? Math.max(...prev.map(g => g.id)) : 0;
                const newItem = { name: newGroup, id: maxId + 1 };
                return [...prev, newItem];
              });
        }
    }


    return (
        <div className={styles.modalContainer}>
            <button
                className={styles.backButton}
                onClick={() => setView("default")}
            >
                Back
            </button>
            <div className={styles.containerOne}>


                <h2 className={styles.title}>MANAGE CATEGORIES<hr /></h2>
                <p className={styles.notice}><span style={{ color: "red" }}>*</span>You can only delete categories without products</p>

                <div className={styles.inputGroup}>
                    <div>
                        <label htmlFor="group-name">Add New</label>
                        <input
                            type="text"
                            id="group-name"
                            name='group-name'
                            value={newGroup.name}
                            onChange={(e) => setNewGroup(e.target.value)}
                            placeholder="eg: Drinks"
                            required />
                        {/* {errors.name && <p className={styles.error}>{errors.name}</p>} */}
                    </div>

                    <button type="submit" className={styles.saveButton}
                        disabled={loading}
                        onClick={handleAdd}
                    > {loading ? 'Saving…' : 'Save'}</button>
                </div>
                {error && <p className={styles.error}>{error}</p>}
                {success && <p className={styles.success}>{success}</p>}

                <div className={styles.groupList}>

                    {groups.map((group, index) => (

                        <div className={styles.groupCard} key={index}>
                            <h3>{group.name}</h3>
                            <p>{products.filter(product => product.group === group.name).length} items</p>
                            <button
                                onClick={() => handleDelete(group.id, group.name)}
                                className={styles.deleteButton}
                                disabled={products.filter(product => product.group === group.name).length > 0}
                                style={{
                                    backgroundColor: products.filter(product => product.group === group.name).length > 0 ? 'grey' : 'crimson',
                                    cursor: products.filter(product => product.group === group.name).length > 0 ? 'not-allowed' : 'pointer',
                                }}
                            >Delete</button>
                        </div>
                    ))}
                </div>

            </div>


        </div>
    );
}
