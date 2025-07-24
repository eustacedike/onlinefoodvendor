

// import Image from "next/image";
import styles from "./uiConfig.module.css";

import { useState } from "react";

import { updateHeroImages } from "@/actions/uiElements";

// import { useComponents } from "@/hooks/useComponents";

export default function HeroImages({ heroImages, setCurrentIndex }) {

    // const { components, socials } = useComponents();

    const [previewUrl, setPreviewUrl] = useState(heroImages);
    //use useffect to update below
    const [heroImageData, setHeroImageData] = useState({
        hero1: heroImages[1],
        hero2: heroImages[2],
        hero3: heroImages[3],
    });

    const handleImageChange = (e, i) => {
        const file = e.target.files[0];
        if (!file) return;
        const maxSize = 7 * 1024 * 1024; // 7MB

        if (file.size > maxSize) {
            // alert("Image size must be under 5MB.");
            setError({ ...errors, img: "Image size must be under 5MB." })
            return;
        }
        // Determine the key name based on index
        const key = `hero${i + 1}`; // i = 0 → hero1, etc.

        // Update the specific key in heroImageData
        setHeroImageData(prev => ({
            ...prev,
            [key]: file
        }));
        setPreviewUrl(prev => {
            const updated = [...prev];   // make a copy
            updated[i] = URL.createObjectURL(file);            // change value at index 1
            return updated;              // return new array
        })
    };

    const iterate = ["HER0 1", "HERO 2", "HERO 3"]
    return (
        <div className={styles.bigContainer}>
            <button
                className={styles.backButton}
                onClick={() => setCurrentIndex(-1)}
            >
                Back
            </button>
            <div className={styles.containerOne}>
                {iterate.map((txt, index) => (
                    <div className={styles.content} key={index}>

                        {previewUrl[index] && (
                            <div className={styles.preview}>
                                <img
                                    src={previewUrl[index]}
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
                                    onChange={(e) => handleImageChange(e, index)}
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
                                        <p className={styles.dropTitle}><strong>{txt}</strong></p>
                                        <p className={styles.supportText}>Max file size: 7MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                ))}
               

            </div>
            <button
                onClick={() => { updateHeroImages(heroImageData) }}
                className={styles.saveButton}>
                Save
            </button>
        </div>

    );
}
