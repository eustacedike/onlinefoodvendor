
'use client';


import Image from "next/image";
import React, { Suspense } from "react";
// import hero1 from "../../public/images/hero4.png";
// import hero2 from "../../public/images/hero5.png";
// import hero3 from "../../public/images/hero6.png";
import styles from "./menu.module.css";
// import otherStyle from "../page.module.css";
import ProductList from "@/components/ProductList/ProductList";

// const LazyProduct = React.lazy(() => import('@/components/ProductList/ProductList'));

import { useProductContext } from '@/context/ProductContext';
import DataFetch from "@/context/datafetch";


// const products = [
//   { id: 1, img: hero1, title: "Shawarma", price: 3500, group: "Snack", discount: 20, count: 10},
//   { id: 2, img: hero2, title: "Burger", price: 2000, group: "Meal", discount: null, count: 5 },
//   { id: 3, img: hero3, title: "Kebabs", price: 1700, group: "Fries", discount: 50, count: 2 },
//   { id: 1, img: hero1, title: "Shawarma", price: 3500, group: "Snack", discount: 20, count: 10 },
//   { id: 2, img: hero2, title: "Burger", price: 2000, group: "Meal", discount: null, count: 5 },
//   { id: 3, img: hero3, title: "Kebabs", price: 1700, group: "Fries", discount: 50, count: 2 },
//   { id: 1, img: hero1, title: "Shawarma", price: 3500, group: "Snack", discount: 20, count: 10},
//   { id: 2, img: hero2, title: "Burger", price: 2000, group: "Meal", discount: null, count: 5 },
//   { id: 3, img: hero3, title: "Kebabs", price: 1700, group: "Fries", discount: 50, count: 2 },
// ];

export default function Menu() {

  const { products, productGroups } = useProductContext();

  if (!Array.isArray(products)) return <p>No products found.</p>;
  // console.log(products);
  return (
    <div className={styles.page}>
      <p className="subtitle">Choose from our wide range of daily nourishment</p>
      <DataFetch />
      <h2 className="title">Popular <hr /></h2>

      {/* <Suspense fallback={<div>Loading...</div>}> */}
      {/* <LazyProduct products={products.slice(0,4)} layout="grid" /> */}
      <ProductList products={products.slice(0,4)} layout="grid" />
      {/* </Suspense>  */}

      {productGroups.map(eachGroup => {
        return (
          <div key={eachGroup.id}>
            <h2 className="title"> {eachGroup.name} <hr /></h2>
            <ProductList
              products={products.filter(product => product.group === eachGroup.name)}
              layout="grid"
            />
            <br />
          </div>
        )
      })}
    
    </div>
  );
}
