import Link from "next/link";
import Image from "next/image";
import globals from "../../app/globals.css";
import styles from "./blank.module.css";
// import notFoundImg from '../../public/images/notFound2.png';
import { useState, useEffect } from "react";

import LoadingSpinner from "./Loading";

export default function BlankPage({content, imgSrc}) {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    isLoading ? (
      <LoadingSpinner />
    ) : (
      <div className={styles.blankList}>
        <Image 
        style={{display: imgSrc === null ? 'none' : 'block'}}
                src={imgSrc}
                alt="No products available"
            />
        <h2>{content}</h2>
        {/* <Link href="/" className={styles.backButton}>Go Back to Home</Link> */}
      </div>
    )



  );
}
