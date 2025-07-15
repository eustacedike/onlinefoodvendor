// Dashboard.js
"use client";

import Image from "next/image";
import styles from "./dashboard.module.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { FaCartArrowDown } from "react-icons/fa";
import { PiUsersThreeFill } from "react-icons/pi";
import { GiTakeMyMoney } from "react-icons/gi";
import salesIcon from "@/public/images/icons/sales.png";
import ordersIcon from "@/public/images/icons/orders.png";
import customersIcon from "@/public/images/icons/customers.png";

import templateImg from "@/public/images/hero5.png";


export default function AdminDashboard({
//   stats,
//   sales,
//   monthlySales,
//   popularProducts,
//   customers,
//   totalSold,
}) {
  const stats = {
    processing: 10,
    enroute: 5,
    delivered: 20,
  };

  const sales = {
    total: 500000,
    week: 150000,
  };

  const monthlySales = [
    { month: "January", amount: 50000 },
    { month: "February", amount: 60000 },
    { month: "March", amount: 70000 },
    { month: "April", amount: 65000 },
    { month: "May", amount: 80000 },
    { month: "June", amount: 90000 },
    // Add more months as needed
  ];

  const popularProducts = [
    { name: "Shawarma", img: templateImg, orders: 50 },
    { name: "Kebab", img: templateImg, orders: 30 },
    { name: "Mocha", img: templateImg, orders: 20 },
  ];

  const customers = {
    signedUp: 200,
    notSignedUp: 50,
  };

  const roundSmart = n => n >= 1e6 ? `${(n / 1e6).toFixed(n % 1e6 === 0 ? 0 : 1)}M` : n >= 1e4 ? `${Math.round(n / 1e3)}K` : Math.floor(n / 100) * 100;



  const totalSold = popularProducts.reduce((sum, product) => sum + product.orders, 0);

  // Custom tooltip for better formatting
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.tooltip}>
          <p className={styles.tooltipLabel}>{`Month: ${label}`}</p>
          <p className={styles.tooltipValue}>
            {`Amount: ₦${payload[0].value.toLocaleString()}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={styles.dashboard}>
      {/* <h1 className={styles.header}>Admin Dashboard</h1> */}

        <section className={styles.grid}>
            <div className={styles.card}>
                  <Image
                  src={ordersIcon}
                  alt="orders"
                  width={45}
                  height={0}
                className={styles.cardIcon}
                />
                <h1 className={styles.cardStat}>{roundSmart(766)}+</h1>
                <h3 className={styles.cardTitle}>Orders</h3>
                <hr/>
                <div className={styles.innerCard}>
                    <h3>Processing</h3>
                    <p>{stats.processing}</p>
                </div>
                <div className={styles.innerCard}>
                    <h3>Enroute</h3>
                    <p>{stats.enroute}</p>
                </div>
                <div className={styles.innerCard}>
                    <h3>Delivered</h3>
                    <p>{stats.delivered}</p>
                </div>
            </div>

            <div className={styles.card}>
            <Image
            src={customersIcon}
            alt="customers"
                  width={45}
                  height={0}
                className={styles.cardIcon}
                />
            <h1 className={styles.cardStat}>{roundSmart(256)}+</h1>
                <h3 className={styles.cardTitle}>Customers</h3>
                <hr/>
                <div className={styles.innerCard}>
                    <h3>Signed Up</h3>
                    <p>{customers.signedUp}</p>
                </div>
                <div className={styles.innerCard}>
                    <h3>Not Signed Up</h3>
                    <p>{customers.notSignedUp}</p>
                </div>
            </div>

            <div className={styles.card}>
            <Image
            src={salesIcon}
            alt="sales"
                  width={45}
                  height={0}
                className={styles.cardIcon}
                />
                <h1 className={styles.cardStat}>₦{roundSmart(5623753)}+</h1>
                <h3 className={styles.cardTitle}>Sales</h3>
                <hr/>
                <div className={styles.innerCard}>
                    <h3>Sales</h3>
                    <p>₦{sales.total.toLocaleString()}</p>
                </div>
                <div className={styles.innerCard}>
                    <h3>Products Sold</h3>
                    <p>{totalSold}</p>
                </div> 
                <div className={styles.innerCard}>
                    <h3>This Week</h3>
                    <p>+₦{sales.week.toLocaleString()}</p>
                </div>
            </div>
        
            
      </section>

      <section className={styles.sectionTwo}>
      <div className={styles.chartSection}>
        <h2 className={styles.cardTitle}>Monthly Sales</h2>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={monthlySales} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#4a5568', fontSize: 11 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#4a5568', fontSize: 10 }}
              tickFormatter={(value) => `₦${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="amount" 
            //   stroke="#fd831e" 
              stroke = {((monthlySales.at(-1)?.amount - monthlySales.at(-2)?.amount) / monthlySales.at(-2)?.amount) * 100 >= 10
  ? 'limegreen'
  : ((monthlySales.at(-1)?.amount - monthlySales.at(-2)?.amount) / monthlySales.at(-2)?.amount) * 100 <= -10
    ? 'red'
    : '#fd831e'}
              strokeWidth={3}
              dot={{ fill: 'lightblue', strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, fill: 'blue' }}
            />
          </LineChart>
        </ResponsiveContainer>
        </div>
        <div className={styles.popularSection}>
        <h2>Popular Products</h2>
        <ul className={styles.productList}>
          {popularProducts.map((product, index) => (
            <li key={index}>
                <strong>
            <Image
            src={product.img}
            alt={product.name}
            // fill
            objectFit="contain"
            width={25}
            height={25} />
              {product.name}</strong> <span>x{product.orders} orders</span>
            </li>
          ))}
        </ul>
      </div>
      </section>

      
    </div>
  );
}

// export async function getServerSideProps() {
//   // Fetch data from your API or database
 
//   return {
//     props: {
//       stats,
//       sales,
//       monthlySales,
//       popularProducts,
//       customers,
//       totalSold,
//     },
//   };
// }