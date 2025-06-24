'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import Hero from "../components/Hero/Hero";
import ProductList from "@/components/ProductList/ProductList";

import { useProductContext } from '@/context/ProductContext';
import DataFetch from "@/context/datafetch";
import Advert from "@/components/Advert/Advert";

import { FaLeaf } from "react-icons/fa";
import { IoFastFood } from "react-icons/io5";

import bannerImg from "@/public/images/banner1.png";
import advertImg from "@/public/images/advert.png";
import logo from "@/public/images/logo.png";

export default function Home() {

  const { products, productGroups } = useProductContext();
  const [active, setActive] = useState(1);

  const filteredProducts = products.filter(product => {
    const matchedGroup = productGroups.find(group => group.name === product.group);
    return matchedGroup && matchedGroup.id === active;
  });

  return (
    <div className={styles.page}>

      <main className={styles.main}>
        <Hero />
        <DataFetch />
        <h2 className="title">Our Menu <IoFastFood /> <hr /></h2>
        <p className="subtitle">
          Craving something delicious? Explore our <span><FaLeaf /> freshly</span> prepared meals.
        </p>

        <div className={styles.groupSelector}>
          {productGroups.slice(0, 4).map(eachGroup => {
            return (
              <button
                key={eachGroup.id}
                className={active === eachGroup.id ? styles.buttonActive : styles.buttonNotActive}
                onClick={() => setActive(eachGroup.id)}
              >
                {eachGroup.name}
              </button>
            )
          })}
        </div>

        <ProductList products={filteredProducts.slice(0, 4)} layout="flex" />
        {/* <Link href="/menu" className="titleButton">See More</Link> */}


        <Advert AdBanner={advertImg} />

        <div className={styles.banner}>
          <Image
            src={bannerImg}
            alt="banner"
            fill
            // layout='responsive'
            className={styles.bannerImg}
          // style={{ objectFit: 'contain' }}
          // width={300}
          />

          <div className={styles.bannerText}>
            <h2>Check out our Signature Unique Dishes!</h2>
            <p>From classic comforts to unique global flavors, there's something for every craving.</p>
            <Link href="/menu" className={styles.bannerButton}>Order Now</Link>
          </div>
        </div>


        <div className={styles.aboutUs} id="aboutus">

          <div className={styles.aboutUsText}>
            <h3>ABOUT US</h3>
            <hr />
            <p>
              Our menu is designed to satisfy your cravings and to deliver bold, comforting flavors that hit the spot every time.
              Whether you're dining in or opting for delivery, you’ll enjoy a scrumptious meal that truly satisfies your taste buds.
              So why wait? Order online and treat yourself to a food adventure that will satisfy your tatstebuds and leave you wanting to come back for seconds.
            </p>

            <div>
                <Image
                    src={logo}    
                    alt="Logo"
                    width={30}
                    height={30}
                    priority
                />
                <h2 >Aebis Unique Menu</h2>
            </div>
          </div>

        

        </div>


      </main>

    </div>
  );
}
