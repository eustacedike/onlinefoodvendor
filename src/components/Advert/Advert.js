

import Image from "next/image";
import styles from "./advert.module.css";



export default function Advert({ AdBanner }) {


  return (
    AdBanner === null ? null :
      <div className={styles.AdWrapper}>
        {/* <Image className={styles.AdBanner}
          src={AdBanner}
          alt="No products available"
          width={0}
          height={0}
          sizes="60vw"

        /> */}
        <img className={styles.AdBanner} src={AdBanner} />
      </div>
  );
}
