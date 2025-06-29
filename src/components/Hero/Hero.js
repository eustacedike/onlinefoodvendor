// import './layout.css';
import Link from "next/link";
import Image from "next/image";
import globals from "../../app/globals.css";
import styles from "./hero.module.css";
import hero1 from "../../public/images/hero4.png";
import hero2 from "../../public/images/hero5.png";
import hero3 from "../../public/images/hero6.png";
import Carousel from "../Carousel/Carousel";


const imageArray = [
    hero1, hero2, hero3
  ];

export default function Hero({mainText, subText, heroImgs}) {

    // const linkStyle = {
    //     textDecoration: "none",
    //     color: "unset"
    // }
    return (
        <div className={styles.hero}>
            <div className={styles.heroContent}>
                <h1>{mainText}</h1>
                <p>{subText}</p>
                <Link href="/menu" className={styles.heroButton}>Explore Our Menu</Link>
            </div>
            <div className={styles.heroImage}>
                <Carousel images={heroImgs} imageClassName={styles.heroImage} />

                {/* <img src={hero1} alt="Delicious food" /> */}
                {/* <Image
                    src={hero1}     // local image (in /public/images)
                    alt="Delicious meal"
                    // width={1200}
                    // height={600}
                    priority
                /> */}
            </div>
        </div>


    );
}
