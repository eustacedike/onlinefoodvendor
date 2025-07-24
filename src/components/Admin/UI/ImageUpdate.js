

// import Image from "next/image";
import styles from "./uiConfig.module.css";

import { useState } from "react";

// import { updateHeroImages } from "@/actions/uiElements";

// import { useComponents } from "@/hooks/useComponents";

export default function ImageUpdate({ image, id, canNull, setCurrentIndex }) {

    // const { components, socials } = useComponents();

    const [previewUrl, setPreviewUrl] = useState(image);
    //use useffect to update below
    const [ImageData, setImageData] = useState(image);

  

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const maxSize = 8 * 1024 * 1024; // 8MB

        if (file.size > maxSize) {
            // alert("Image size must be under 5MB.");
            setError("Image size must be under 8MB.")
            return;
        }
        // setImage(file);
        setImageData( file )
        setPreviewUrl(URL.createObjectURL(file));
    };

    return (
        <div className={styles.bigContainer}>
            <button
                className={styles.backButton}
                onClick={() => setCurrentIndex(-1)}
            >
                Back
            </button>
            <div className={styles.containerOne}>
                {/* {iterate.map((txt, index) => ( */}
                    <div className={styles.contentAlt}>
                   {canNull && <span className={styles.remove} onClick={() => { setPreviewUrl(null); setImage(null) }}>&#x274C;</span>}

                        {previewUrl && (
                            <div className={styles.preview}>
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    style={{ width: "100%", maxWidth: "400px", height: "auto", objectFit: "contain", borderRadius: "8px" }}
                                />
                            </div>

                        )}
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
                                        <p className={styles.dropTitle}><strong>SUBHERO IMAGE</strong></p>
                                        <p className={styles.supportText}>Max file size: 8MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                {/* ))} */}
               

            </div>
            <button
                onClick={() => { updateHeroImages(ImageData) }}
                className={styles.saveButton}>
                Save
            </button>
        </div>

    );
}
