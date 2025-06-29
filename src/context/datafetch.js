'use client';
import { useEffect } from 'react';
import { useProductContext } from '@/context/ProductContext';
import { useOrderContext } from '@/context/OrderContext';

import hero1 from '@/public/images/hero4.png';
import hero2 from '@/public/images/hero5.png';
import hero3 from '@/public/images/hero6.png';
import hero4 from '@/public/images/hero7.png';

// import hero1 from "../../public/images/hero4.png";
// import hero2 from "../../public/images/hero5.png";
// import hero3 from "../../public/images/hero6.png";

import { createClient } from '@/utils/supabase/client'


export default function DataFetch() {
  const { setProducts, setProductGroups } = useProductContext();
  // const { setProductGroups } = useProductContext();
  const { setOrders } = useOrderContext();

// const productsData = [
//   { id: 1, sku:"shawarmaa", img: hero1, title: "Shawarma", price: 3500, group: "Snack", discount: 20, count: 10,
//     description: "Delicious chicken shawarma with fresh vegetables and sauce. Shawarma is a popular Middle Eastern street food consisting of meat (usually lamb, chicken, or beef) shaved from a vertical rotisserie and typically served in a wrap or with pita bread. It's known for its distinctive flavor from marination and spices. "
// },
//   { id: 2, sku:"burgera", img: hero2, title: "Burger", price: 2000, group: "Meal", discount: null, count: 5,
//     description: "Delicious chicken shawarma with fresh vegetables and sauce. Shawarma is a popular Middle Eastern street food consisting of meat (usually lamb, chicken, or beef) shaved from a vertical rotisserie and typically served in a wrap or with pita bread. It's known for its distinctive flavor from marination and spices. "
// },
//   { id: 3, sku:"kebaba", img: hero3, title: "Kebabs", price: 1700, group: "Fries", discount: 50, count: 2 ,
//     description: "Delicious chicken shawarma with fresh vegetables and sauce. Shawarma is a popular Middle Eastern street food consisting of meat (usually lamb, chicken, or beef) shaved from a vertical rotisserie and typically served in a wrap or with pita bread. It's known for its distinctive flavor from marination and spices. "
// },
//   { id: 16, sku:"mochaa", img: hero4, title: "Mocha", price: 3150, group: "Drink", discount: 10, count: 7 ,
//     description: "Delicious chicken shawarma with fresh vegetables and sauce. Shawarma is a popular Middle Eastern street food consisting of meat (usually lamb, chicken, or beef) shaved from a vertical rotisserie and typically served in a wrap or with pita bread. It's known for its distinctive flavor from marination and spices. "
// },
//   { id: 4, sku:"shawarmab", img: hero1, title: "Shawarma", price: 3500, group: "Snack", discount: 20, count: 0 ,
//     description: "Delicious chicken shawarma with fresh vegetables and sauce. Shawarma is a popular Middle Eastern street food consisting of meat (usually lamb, chicken, or beef) shaved from a vertical rotisserie and typically served in a wrap or with pita bread. It's known for its distinctive flavor from marination and spices. "
// },
//   { id: 5, sku:"burgerb", img: hero2, title: "Burger", price: 2000, group: "Meal", discount: null, count: 5 ,
//     description: "Delicious chicken shawarma with fresh vegetables and sauce. Shawarma is a popular Middle Eastern street food consisting of meat (usually lamb, chicken, or beef) shaved from a vertical rotisserie and typically served in a wrap or with pita bread. It's known for its distinctive flavor from marination and spices. "
// },
//   { id: 6, sku:"kebabb", img: hero3, title: "Kebabs", price: 1700, group: "Fries", discount: 50, count: 2 ,
//     description: "Delicious chicken shawarma with fresh vegetables and sauce. Shawarma is a popular Middle Eastern street food consisting of meat (usually lamb, chicken, or beef) shaved from a vertical rotisserie and typically served in a wrap or with pita bread. It's known for its distinctive flavor from marination and spices. "
// },
// { id: 17, sku:"mochab", img: hero4, title: "Mocha", price: 3150, group: "Drink", discount: 10, count: 7 ,
//     description: "Delicious chicken shawarma with fresh vegetables and sauce. Shawarma is a popular Middle Eastern street food consisting of meat (usually lamb, chicken, or beef) shaved from a vertical rotisserie and typically served in a wrap or with pita bread. It's known for its distinctive flavor from marination and spices. "
// },
//   { id: 7, sku:"shawarmac", img: hero1, title: "Shawarma", price: 3500, group: "Snack", discount: 20, count: 10,
//     description: "Delicious chicken shawarma with fresh vegetables and sauce. Shawarma is a popular Middle Eastern street food consisting of meat (usually lamb, chicken, or beef) shaved from a vertical rotisserie and typically served in a wrap or with pita bread. It's known for its distinctive flavor from marination and spices. "
// },
//   { id: 8, sku:"burgerc", img: hero2, title: "Burger", price: 2000, group: "Meal", discount: null, count: 5 ,
//     description: "Delicious chicken shawarma with fresh vegetables and sauce. Shawarma is a popular Middle Eastern street food consisting of meat (usually lamb, chicken, or beef) shaved from a vertical rotisserie and typically served in a wrap or with pita bread. It's known for its distinctive flavor from marination and spices. "
// },
//   { id: 9, sku:"kebabc", img: hero3, title: "Kebabs", price: 1700, group: "Fries", discount: 50, count: 2 ,
//     description: "Delicious chicken shawarma with fresh vegetables and sauce. Shawarma is a popular Middle Eastern street food consisting of meat (usually lamb, chicken, or beef) shaved from a vertical rotisserie and typically served in a wrap or with pita bread. It's known for its distinctive flavor from marination and spices. "
// },
// { id: 18, sku:"mochac", img: hero4, title: "Mocha", price: 3150, group: "Drink", discount: 10, count: 0 ,
//     description: "Delicious chicken shawarma with fresh vegetables and sauce. Shawarma is a popular Middle Eastern street food consisting of meat (usually lamb, chicken, or beef) shaved from a vertical rotisserie and typically served in a wrap or with pita bread. It's known for its distinctive flavor from marination and spices. "
// },
//   { id: 10, sku:"shawarmad", img: hero1, title: "Shawarma", price: 3500, group: "Snack", discount: 20, count: 10,
//     description: "Delicious chicken shawarma with fresh vegetables and sauce. Shawarma is a popular Middle Eastern street food consisting of meat (usually lamb, chicken, or beef) shaved from a vertical rotisserie and typically served in a wrap or with pita bread. It's known for its distinctive flavor from marination and spices. "
// },
//   { id: 11, sku:"burgerd", img: hero2, title: "Burger", price: 2000, group: "Meal", discount: null, count: 5 ,
//     description: "Delicious chicken shawarma with fresh vegetables and sauce. Shawarma is a popular Middle Eastern street food consisting of meat (usually lamb, chicken, or beef) shaved from a vertical rotisserie and typically served in a wrap or with pita bread. It's known for its distinctive flavor from marination and spices. "
// },
//   { id: 12, sku:"kebabd", img: hero3, title: "Kebabs", price: 1700, group: "Fries", discount: 50, count: 2 ,
//     description: "Delicious chicken shawarma with fresh vegetables and sauce. Shawarma is a popular Middle Eastern street food consisting of meat (usually lamb, chicken, or beef) shaved from a vertical rotisserie and typically served in a wrap or with pita bread. It's known for its distinctive flavor from marination and spices. "
// },
// { id: 19, sku:"mochad", img: hero4, title: "Mocha", price: 3150, group: "Drink", discount: 10, count: 7 ,
//     description: "Delicious chicken shawarma with fresh vegetables and sauce. Shawarma is a popular Middle Eastern street food consisting of meat (usually lamb, chicken, or beef) shaved from a vertical rotisserie and typically served in a wrap or with pita bread. It's known for its distinctive flavor from marination and spices. "
// },
//   { id: 13, sku:"shawarmae", img: hero1, title: "Shawarma", price: 3500, group: "Snack", discount: 20, count: 10,
//     description: "Delicious chicken shawarma with fresh vegetables and sauce. Shawarma is a popular Middle Eastern street food consisting of meat (usually lamb, chicken, or beef) shaved from a vertical rotisserie and typically served in a wrap or with pita bread. It's known for its distinctive flavor from marination and spices. "
// },
//   { id: 14, sku:"burgere", img: hero2, title: "Burger", price: 2000, group: "Meal", discount: null, count: 5 ,
//     description: "Delicious chicken shawarma with fresh vegetables and sauce. Shawarma is a popular Middle Eastern street food consisting of meat (usually lamb, chicken, or beef) shaved from a vertical rotisserie and typically served in a wrap or with pita bread. It's known for its distinctive flavor from marination and spices. "
// },
//   { id: 15, sku:"kebabe", img: hero3, title: "Kebabs", price: 1700, group: "Fries", discount: 50, count: 2 ,
//     description: "Delicious chicken shawarma with fresh vegetables and sauce. Shawarma is a popular Middle Eastern street food consisting of meat (usually lamb, chicken, or beef) shaved from a vertical rotisserie and typically served in a wrap or with pita bread. It's known for its distinctive flavor from marination and spices. "
// },
// { id: 20, sku:"mochae", img: hero4, title: "Mocha", price: 3150, group: "Drink", discount: 10, count: 7 ,
//     description: "Delicious chicken shawarma with fresh vegetables and sauce. Shawarma is a popular Middle Eastern street food consisting of meat (usually lamb, chicken, or beef) shaved from a vertical rotisserie and typically served in a wrap or with pita bread. It's known for its distinctive flavor from marination and spices. "
// },
// ];

// const productGroupsData = [
//   { id: 1, name: "Snack" },
//   { id: 2, name: "Meal" },
//   { id: 3, name: "Fries" },
//   { id: 4, name: "Drink" },
//   { id: 5, name: "Corporate" },
//   { id: 6, name: "Salad" },
//   { id: 7, name: "Shake" },
//   { id: 8, name: "Others" },
// ];

// const ordersDataOld = [
//   { id: "000001", ref: "gfshyhfsh658765uytr3276a", date: "20-Jun-2025", items: [{sku: "shawarmaa", qty: 2}], amount: 7000, status: "Delivered", type: "user" },
//   { id: "001001", ref: "gfshyhfsh658765uytr3276b", date: "18-May-2025", items: [{sku: "shawarmaa", qty: 2}, {sku: "shawarmab", qty : 5}], amount: 2000, status: "enroute", type: "guest" },
//   { id: "000067", ref: "gfshyhfsh658765uytr3276c", date: "20-Jun-2025", items: "Shawarma x2", amount: 7000, status: "Delivered", type: "user" },
//   { id: "000345", ref: "gfshyhfsh658765uytr3276d", date: "18-May-2025", items: "Burger x1", amount: 2000, status: "enroute", type: "guest" },
//   { id: "007893", ref: "gfshyhfsh658765uytr3276e", date: "20-Jun-2025", items: "Shawarma x2", amount: 7000, status: "Delivered", type: "user" },
//   { id: "000002", ref: "gfshyhfsh658765uytr3276f", date: "18-May-2025", items: "Burger x1", amount: 2000, status: "enroute", type: "guest" },
//   { id: "020301", ref: "gfshyhfsh658765uytr3276g", date: "20-Jun-2025", items: "Shawarma x2", amount: 7000, status: "Delivered", type: "user" },
//   { id: "990585", ref: "gfshyhfsh658765uytr3276h", date: "18-May-2025", items: "Burger x1", amount: 2000, status: "enroute", type: "guest" },
// ];

const ordersData = [
  {
    ref: "A7F4X92BKLQE13D9",
    id: "103847",
    type: "guest",
    date: "04-Jun-2025",
    status: "delivered",
    items: [
      { title: "shawarma", sku: "shawarmaa", qty: 2, price: 3500 },
      { title: "burger", sku: "burgerb", qty: 1, price: 2500 },
    ],
    delivery: 2000,
    subtotal: 9500,
    vat: 712.5,
  },
  {
    ref: "M9E7YT82WQLF46GH",
    id: "100294",
    type: "user",
    date: "11-May-2025",
    status: "enroute",
    items: [
      { title: "mocha", sku: "mochad", qty: 3, price: 3000 },
      { title: "kebab", sku: "kebabc", qty: 2, price: 1700 },
    ],
    delivery: 2500,
    subtotal: 12400,
    vat: 930,
  },
  {
    ref: "XQJ82DKSL91MZ78A",
    id: "108213",
    type: "guest",
    date: "22-Jun-2025",
    status: "processing",
    items: [
      { title: "burger", sku: "burgerb", qty: 2, price: 2200 },
    ],
    delivery: 1800,
    subtotal: 4400,
    vat: 330,
  },
  {
    ref: "R7TP3W8ZLXBY4KJD",
    id: "109847",
    type: "user",
    date: "17-May-2025",
    status: "delivered",
    items: [
      { title: "shawarma", sku: "shawarmaa", qty: 1, price: 3500 },
      { title: "mocha", sku: "mochad", qty: 1, price: 2800 },
    ],
    delivery: 1500,
    subtotal: 6300,
    vat: 472.5,
  },
  {
    ref: "N8CV3MZP1QH5WLXE",
    id: "107531",
    type: "guest",
    date: "12-Jun-2025",
    status: "enroute",
    items: [
      { title: "kebab", sku: "kebabc", qty: 3, price: 1700 },
    ],
    delivery: 2000,
    subtotal: 5100,
    vat: 382.5,
  },
  {
    ref: "WQZ1A3XYNV56M8TR",
    id: "106782",
    type: "user",
    date: "30-May-2025",
    status: "delivered",
    items: [
      { title: "burger", sku: "burgerb", qty: 1, price: 2500 },
      { title: "mocha", sku: "mochad", qty: 2, price: 2800 },
    ],
    delivery: 2200,
    subtotal: 8100,
    vat: 607.5,
  },
  {
    ref: "LZK3YPDME47XJ109",
    id: "102915",
    type: "guest",
    date: "18-Jun-2025",
    status: "processing",
    items: [
      { title: "shawarma", sku: "shawarmaa", qty: 2, price: 3600 },
      { title: "kebab", sku: "kebabc", qty: 1, price: 1800 },
    ],
    delivery: 2500,
    subtotal: 9000,
    vat: 675,
  },
  {
    ref: "B3QN90ZKLM52RXE1",
    id: "109233",
    type: "user",
    date: "25-Jun-2025",
    status: "delivered",
    items: [
      { title: "mocha", sku: "mochad", qty: 4, price: 2700 },
    ],
    delivery: 3000,
    subtotal: 10800,
    vat: 810,
  },
  {
    ref: "GH29DKLEPW84XZTY",
    id: "105642",
    type: "guest",
    date: "29-May-2025",
    status: "enroute",
    items: [
      { title: "burger", sku: "burgerb", qty: 3, price: 2200 },
    ],
    delivery: 1800,
    subtotal: 6600,
    vat: 495,
  },
  {
    ref: "Z8TQWX54KM73PL9R",
    id: "100387",
    type: "user",
    date: "10-Jun-2025",
    status: "processing",
    items: [
      { title: "shawarma", sku: "shawarmaa", qty: 1, price: 3400 },
      { title: "mocha", sku: "mochad", qty: 1, price: 3100 },
    ],
    delivery: 1700,
    subtotal: 6500,
    vat: 487.5,
  },
  {
    ref: "A9F7XLWQ3829TPZD",
    id: "104928",
    type: "guest",
    date: "05-Jun-2025",
    status: "delivered",
    items: [
      { title: "kebab", sku: "kebabc", qty: 2, price: 1750 },
      { title: "burger", sku: "burgerb", qty: 1, price: 2300 },
    ],
    delivery: 1900,
    subtotal: 5800,
    vat: 435,
  },
  {
    ref: "Y9KTPXZQW84DKL10",
    id: "101928",
    type: "user",
    date: "09-Jun-2025",
    status: "enroute",
    items: [
      { title: "mocha", sku: "mochad", qty: 1, price: 3200 },
      { title: "shawarma", sku: "shawarmaa", qty: 2, price: 3450 },
    ],
    delivery: 2500,
    subtotal: 10100,
    vat: 757.5,
  },
  {
    ref: "NX38PLKQWXYZ109C",
    id: "108743",
    type: "guest",
    date: "16-Jun-2025",
    status: "delivered",
    items: [
      { title: "burger", sku: "burgerb", qty: 2, price: 2400 },
    ],
    delivery: 1600,
    subtotal: 4800,
    vat: 360,
  },
  {
    ref: "KLZ98W3PXYR0T5MA",
    id: "106129",
    type: "user",
    date: "20-May-2025",
    status: "processing",
    items: [
      { title: "kebab", sku: "kebabc", qty: 3, price: 1700 },
      { title: "mocha", sku: "mochad", qty: 1, price: 3000 },
    ],
    delivery: 3000,
    subtotal: 8100,
    vat: 607.5,
  },
  {
    ref: "T0PQKZ48XLMN82WC",
    id: "103020",
    type: "guest",
    date: "28-Jun-2025",
    status: "delivered",
    items: [
      { title: "shawarma", sku: "shawarmaa", qty: 2, price: 3500 },
      { title: "burger", sku: "burgerb", qty: 1, price: 2300 },
      { title: "mocha", sku: "mochad", qty: 1, price: 3100 },
    ],
    delivery: 5000,
    subtotal: 12400,
    vat: 930,
  },
  {
    ref: "PQ38T9XKLMNZYT01",
    id: "105019",
    type: "user",
    date: "19-Jun-2025",
    status: "enroute",
    items: [
      { title: "mocha", sku: "mochad", qty: 2, price: 3100 },
    ],
    delivery: 2200,
    subtotal: 6200,
    vat: 465,
  },
  {
    ref: "ZPQLK29XNMW4721D",
    id: "107190",
    type: "guest",
    date: "21-May-2025",
    status: "processing",
    items: [
      { title: "kebab", sku: "kebabc", qty: 5, price: 1800 },
    ],
    delivery: 2000,
    subtotal: 9000,
    vat: 675,
  },
  {
    ref: "KXQP9472MWDLTZ10",
    id: "109983",
    type: "user",
    date: "01-Jun-2025",
    status: "delivered",
    items: [
      { title: "burger", sku: "burgerb", qty: 2, price: 2200 },
      { title: "shawarma", sku: "shawarmaa", qty: 1, price: 3600 },
    ],
    delivery: 2300,
    subtotal: 8000,
    vat: 600,
  },
  {
    ref: "XZQPKM83WT9012PL",
    id: "104561",
    type: "guest",
    date: "06-Jun-2025",
    status: "enroute",
    items: [
      { title: "mocha", sku: "mochad", qty: 1, price: 2800 },
    ],
    delivery: 1500,
    subtotal: 2800,
    vat: 210,
  },
  {
    ref: "WLP09MXZT83120QR",
    id: "102784",
    type: "user",
    date: "14-Jun-2025",
    status: "delivered",
    items: [
      { title: "shawarma", sku: "shawarmaa", qty: 3, price: 3500 },
      { title: "mocha", sku: "mochad", qty: 1, price: 3100 },
    ],
    delivery: 4000,
    subtotal: 13600,
    vat: 1020,
  },
];


 useEffect(() => {
    const supabase = createClient()

    const fetchProducts = async () => {
  

      const { data: productsDB, error: productsError } = await supabase
        .from('products')
        .select('*')

      if (productsError) {
        console.error('Error fetching products:', profileError)
        setProducts(null)
      } else {
        setProducts(productsDB)
      }


      const { data: productGroupsDB, error: productGroupsError } = await supabase
      .from('product_groups')
      .select('*')

    if (productsError) {
      console.error('Error fetching productGroups:', profileError)
      setProducts(null)
    } else {
      setProductGroups(productGroupsDB)
    }
      // setLoading(false)
    }

    fetchProducts()
  }, [setProducts, setProductGroups])



  useEffect(() => {
    async function fetchOrders() {
    //   const res = await fetch('/api/products');
    //   const data = await res.json();

      // setProducts(productsData);
      // setProductGroups(productGroupsData);
      setOrders(ordersData);
    }

    fetchOrders();
  }, [setOrders]);

  // useEffect(() => {
  //   async function fetchOrders() {

  //     setOrders(ordersData);
  //   }

  //   fetchOrders();
  // }, [setOrders]);

//   return <div>Loading products...</div>;
}


