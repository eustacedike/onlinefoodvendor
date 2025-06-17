import Link from "next/link";
import Image from "next/image";
import globals from "../../app/globals.css";
import styles from "./productlist.module.css";
// import hero1 from "../../public/images/hero4.png";
// import hero2 from "../../public/images/hero5.png";
// import hero3 from "../../public/images/hero6.png";
// import Carousel from "../Carousel/Carousel";
import ProductCard from "./ProductCard";
// import BlankProduct from "./Blank";
import Blank from "../Loading/Blank";
import notFoundImg from '../../public/images/notFound2.png';
// import React, { Suspense } from "react";


// const LazyBlankProduct = React.lazy(() => import('./Blank'));
// const products = [
//     { id: 1, img: hero1, title: "Shawarma", price: 3500, group: "Snack", discount: 20, count: 10},
//     { id: 2, img: hero2, title: "Burger", price: 2000, group: "Meal", discount: null, count: 5 },
//     { id: 3, img: hero3, title: "Kebabs", price: 1700, group: "Fries", discount: 50, count: 2 },
//     { id: 1, img: hero1, title: "Shawarma", price: 3500, group: "Snack", discount: 20, count: 10 },
//     { id: 2, img: hero2, title: "Burger", price: 2000, group: "Meal", discount: null, count: 5 },
//     { id: 3, img: hero3, title: "Kebabs", price: 1700, group: "Fries", discount: 50, count: 2 },
//     { id: 1, img: hero1, title: "Shawarma", price: 3500, group: "Snack", discount: 20, count: 10},
//     { id: 2, img: hero2, title: "Burger", price: 2000, group: "Meal", discount: null, count: 5 },
//     { id: 3, img: hero3, title: "Kebabs", price: 1700, group: "Fries", discount: 50, count: 2 },
// ];

export default function ProductList({products, layout}) {
    const containerClass = layout === "grid" ? "productGrid" : "productFlex";
    // const linkStyle = {
    //     textDecoration: "none",
    //     color: "unset"
    // }

    // console.log(products);
    // if (!products || products.length === 0) {
    //     return (
    //       <Suspense fallback={<div>Loading fallback...</div>}>
    //         <LazyBlankProduct />
    //       </Suspense>
    //     );
    //   }


    return (
        <div className={styles.productList}>

            

{products.length === 0 ? <Blank content="Oooops! Nothing available at the moment...." imgSrc={notFoundImg} /> : 

<div className={styles[containerClass]}>
                {products.map(eachProduct => {
                    return (
                        <ProductCard
                        key={eachProduct.id}
                        sku={eachProduct.sku}
                        imageUrl={eachProduct.img}
                        name={eachProduct.title}
                        price={eachProduct.price}
                        tag={eachProduct.group}
                        discount={eachProduct.discount}
                        count={eachProduct.count}
                    />
                    )
                })}
            </div>
            }

          
        </div>


    );
}
