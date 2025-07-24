

import styles from "./uiConfig.module.css";

import { useState } from "react";

// import { updateHeroImages } from "@/actions/uiElements";


export default function Texts({ display, text, mini, maxi, id, updateText, setCurrentIndex }) {


    const [newText, setNewText] = useState(text);

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSave = async () => {
        // Clear previous states
        setError('');
        setSuccess('');
        // setIsLoading(true);

        try {
            // Call the server action with client-parsed min/max
            const result = await updateText(newText, id, mini, maxi);
            
            if (result.success) {
                setSuccess(result.message || 'Text updated successfully!');
                // console.log(result.data)
                // Optionally update local state with returned data
                // setText(result.data.value); // if you want to sync with DB response
            } else {
                setError(result.error);
            }
        } catch (error) {
            console.error('Client error:', error);
            setError('Failed to save. Please try again.');
        }
        // finally {
        //     setIsLoading(false);
        // }
    };


    return (
        <div className={styles.bigContainer}>
            <button
                className={styles.backButton}
                onClick={() => setCurrentIndex(-1)}
            >
                Back
            </button>
            <div className={styles.inputGroup}>
                    <div>
                        <label htmlFor="heroMainText">{display}</label>

                        <textarea
                            id="heroMainText"
                            name='heroMainText'
                            // placeholder="30 to 600 characters..."
                            value={newText}
                            onChange={(e) => setNewText(e.target.value)}
// cols={100}
rows={mini/10}
                        >

                        </textarea>
                <p className={styles.supportText}><span style={{ color: "red" }}>*</span>{mini} to {maxi} Characters</p>

                        {error && <p className={styles.error}>{error}</p>}
                        {success && <p className={styles.success}>{success}</p>}
                    </div>


                </div>
            <button
                // onClick={() => { updateText(newText, id, mini, maxi) }}
                className={styles.saveButton}
                onClick={handleSave}
                // disabled={isLoading || !isValid}
                >
                Save
            </button>
        </div>

    );
}
