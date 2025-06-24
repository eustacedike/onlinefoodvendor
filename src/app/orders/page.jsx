
'use client';


import Orders from "@/components/Orders/Orders";
import { useOrderContext } from '@/context/OrderContext';

import styles from "./orderpage.module.css";
import Link from "next/link";
import DataFetch from "@/context/datafetch";


export default function OrdersPage() {

  const { orders } = useOrderContext();

//   console.log(orders);


    // const orderHistory = [
    //     { id: "1234", date: "20-Jun-2025", items: "Shawarma x2", amount: 7000, status: "Delivered", quantity: 10 },
    //     { id: "1229", date: "18-May-2025", items: "Burger x1", amount: 2000, status: "Transit", quantity: 5 },
    //     { id: "1234", date: "20-Jun-2025", items: "Shawarma x2", amount: 7000, status: "Delivered", quantity: 10 },
    //     { id: "1229", date: "18-May-2025", items: "Burger x1", amount: 2000, status: "Transit", quantity: 5 },
    //     { id: "1234", date: "20-Jun-2025", items: "Shawarma x2", amount: 7000, status: "Delivered", quantity: 10 },
    //     { id: "1229", date: "18-May-2025", items: "Burger x1", amount: 2000, status: "Transit", quantity: 5 },
    //     { id: "1234", date: "20-Jun-2025", items: "Shawarma x2", amount: 7000, status: "Delivered", quantity: 10 },
    //     { id: "1229", date: "18-May-2025", items: "Burger x1", amount: 2000, status: "Transit", quantity: 5 },
    // ];

    return (
        <div className={styles.orderPage}>
            <DataFetch/>
                <h2 className="title">My Orders <hr /></h2>
            <Orders orders={orders} />
        </div>
    );
}
