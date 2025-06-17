

import Image from "next/image";
import styles from "./advert.module.css";



export default function Advert({AdBanner}) {

 
  return (
    AdBanner === null ? null :
        <div className={styles.AdWrapper}>
            <Image className={styles.AdBanner}
            src={AdBanner}
            alt="No products available"
            // fill
            // objectFit="contain"

            width={0} // Needed for auto scale
        height={0}
        sizes="60vw"

        // style={{ width: '100%', height: 'auto' }} // auto height
        />
        </div>  
  );
}
