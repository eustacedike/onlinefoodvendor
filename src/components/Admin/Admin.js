

import Image from "next/image";
import styles from "./admin.module.css";

import { useState } from "react";

import logo from "@/public/images/logo.png";

// icons
import { AiOutlineDashboard } from "react-icons/ai";
import { FaCartArrowDown } from "react-icons/fa";
import { GiBoxUnpacking } from "react-icons/gi";
import { HiInformationCircle } from "react-icons/hi";
import { LuMonitorCog } from "react-icons/lu";
import { SlSocialPintarest } from "react-icons/sl";

// content
import Orders from "@/components/Orders/Orders";
import { useOrderContext } from '@/context/OrderContext';
import DataFetch from "@/context/datafetch";


export default function Admin() {

    const { orders } = useOrderContext();


    const sideBarItems = [
        { name: "Dashboard", icon: <AiOutlineDashboard />, content: "Dashboard Content" },
        { name: "Orders", icon: <FaCartArrowDown />, content: <Orders orders={orders}/> },
        { name: "Products", icon: <GiBoxUnpacking />, content: "Products Content" },
        { name: "Details", icon: <HiInformationCircle />, content: "Details Content" },
        { name: "Elements", icon: <LuMonitorCog />, content: "Elements Content" },
        { name: "Socials", icon: <SlSocialPintarest />, content: "Social Content" },

    ]

    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <div className={styles.AdminMain}>
            <DataFetch/>
            <div className={styles.mobileHeader}>
                <Image
                    src={logo}
                    alt="Logo"
                    width={15}
                    height={15}
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
