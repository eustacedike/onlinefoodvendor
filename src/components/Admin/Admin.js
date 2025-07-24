

import Image from "next/image";
import styles from "./admin.module.css";

import { useState } from "react";

import logo from "@/public/images/logo.png";

import { useComponents } from "@/hooks/useComponents";

// icons
import { AiOutlineDashboard } from "react-icons/ai";
import { FaCartArrowDown } from "react-icons/fa";
import { GiBoxUnpacking } from "react-icons/gi";
import { HiInformationCircle } from "react-icons/hi";
import { LuMonitorCog } from "react-icons/lu";
import { SlSocialPintarest } from "react-icons/sl";
import { FaCogs } from "react-icons/fa";
import { FaBoxes } from "react-icons/fa";

// content
import AdminOrders from "./Orders/Orders";
import { useOrderContext } from '@/context/OrderContext';
import DataFetch from "@/context/datafetch";

import AdminProducts from "./Products/Products";
import { useProductContext } from "@/context/ProductContext";

import AdminDashboard from "./Dashboard/Dashboard";

import UIConfig from "./UI/UIConfig";
import AdminSocials from "./Socials/Socials";



export default function Admin() {

    const { orders } = useOrderContext();
    const { products, productGroups } = useProductContext();

// console.log(products)
const { socials, components } = useComponents();


    const sideBarItems = [
        { name: "Dashboard", icon: <AiOutlineDashboard />, content: <AdminDashboard/> },
        { name: "Orders", icon: <FaCartArrowDown />, content: <AdminOrders orders={orders}/> },
        { name: "Products", icon: <GiBoxUnpacking />, content: <AdminProducts products={products} productGroups={productGroups}/> },
        // { name: "Product Groups", icon: <FaBoxes />, content: "Details Content" },
        { name: "UI Elements", icon: <LuMonitorCog />, content: <UIConfig /> },
        { name: "Socials", icon: <SlSocialPintarest />, content: <AdminSocials socials={socials}/> },
        { name: "Configurations", icon: <FaCogs />, content: "Config" },

    ]

    const [currentIndex, setCurrentIndex] = useState(0);


    return (
        <div className={styles.AdminMain}>
            <DataFetch/>
            <div className={styles.mobileHeader}>
                <Image
                    src={logo}
                    alt="Logo"
                    width={25}
                    height={25}
                    priority
                />
                <h2 >Aebis Unique Menu</h2>
            </div>
            <div className={styles.section}>
                <div className={styles.header}>
                    <Image
                        src={logo}
                        alt="Logo"
                        width={25}
                        height={25}
                        priority
                    />
                    <h2 >Aebis Unique Menu</h2>
                </div>
                <div className={styles.selector}>

                    {sideBarItems.map((item, index) => {
                        // const isActive = index <= currentIndex;
                        const isCurrent = index === currentIndex;

                        return (
                            <button
                                key={index}
                                className={`${styles.adminBtn} ${isCurrent ? `${styles.btnActive}` : ''}`}
                                onClick={() => setCurrentIndex(index)}
                            >
                                {item.name}
                                {item.icon}
                            </button>

                        );
                    })}
                </div>
            </div>
            <div className={styles.adminContent}>
                {sideBarItems[currentIndex].content}

            </div>
            <div className={styles.mobileFooter}>
            {sideBarItems.map((item, index) => {
                        const isCurrent = index === currentIndex;

                        return (
                            <button
                                key={index}
                                className={`${styles.adminBtn} ${isCurrent ? `${styles.btnActive}` : ''}`}
                                onClick={() => setCurrentIndex(index)}
                            >
                                {item.icon}
                            </button>

                        );
                    })}
            </div>
        </div>
    );
}
