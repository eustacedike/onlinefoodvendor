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


        <Advert AdBanner={advertImg}/>

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


        <div className={styles.banner} id="aboutus">
         
          <div className={styles.bannerText}>
            <h2>About Us - Aebis Unique Menu</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam reprehenderit, nisi, aliquam esse animi, ea sed quas laudantium quam architecto asperiores in at? Suscipit, quia explicabo! Sit nulla excepturi quibusdam vel commodi expedita minima, tenetur sequi ducimus at totam nihil, corrupti cum nisi vero provident!
            </p>
          </div>

          <Image
            src={bannerImg}
            alt="banner"
            fill
            className={styles.bannerImg}
          />

        </div>

     
      </main>

    </div>
  );
}
