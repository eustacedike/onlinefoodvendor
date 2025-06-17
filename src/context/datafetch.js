'use client';
import { useEffect } from 'react';
import { useProductContext } from '@/context/ProductContext';

import hero1 from '@/public/images/hero4.png';
import hero2 from '@/public/images/hero5.png';
import hero3 from '@/public/images/hero6.png';
import hero4 from '@/public/images/hero7.png';

// import hero1 from "../../public/images/hero4.png";
// import hero2 from "../../public/images/hero5.png";
// import hero3 from "../../public/images/hero6.png";

export default function DataFetch() {
  const { setProducts } = useProductContext();
  const { setProductGroups } = useProductContext();

const productsData = [
  { id: 1, sku:"shawarmaa", img: hero1, title: "Shawarma", price: 3500, group: "Snack", discount: 20, count: 10,
    description: "Delicious chicken shawarma with fresh vegetables and sauce. Shawarma is a popular Middle Eastern street food consisting of meat (usually lamb, chicken, or beef) shaved from a vertical rotisserie and typically served in a wrap or with pita bread. It's known for its distinctive flavor from marination and spices. "
},
  { id: 2, sku:"burgera", img: hero2, title: "Burger", price: 2000, group: "Meal", discount: null, count: 5,
    description: "Delicious chicken shawarma with fresh vegetables and sauce. Shawarma is a popular Middle Eastern street food consisting of meat (usually lamb, chicken, or beef) shaved from a vertical rotisserie and typically served in a wrap or with pita bread. It's known for its distinctive flavor from marination and spices. "
},
  { id: 3, sku:"kebaba", img: hero3, title: "Kebabs", price: 1700, group: "Fries", discount: 50, count: 2 ,
    description: "Delicious chicken shawarma with fresh vegetables and sauce. Shawarma is a popular Middle Eastern street food consisting of meat (usually lamb, chicken, or beef) shaved from a vertical rotisserie and typically served in a wrap or with pita bread. It's known for its distinctive flavor from marination and spices. "
},
  { id: 16, sku:"mochaa", img: hero4, title: "Mocha", price: 3150, group: "Drink", discount: 10, count: 7 ,
    description: "Delicious chicken shawarma with fresh vegetables and sauce. Shawarma is a popular Middle Eastern street food consisting of meat (usually lamb, chicken, or beef) shaved from a vertical rotisserie and typically served in a wrap or with pita bread. It's known for its distinctive flavor from marination and spices. "
},
  { id: 4, sku:"shawarmab", img: hero1, title: "Shawarma", price: 3500, group: "Snack", discount: 20, count: 0 ,
    description: "Delicious chicken shawarma with fresh vegetables and sauce. Shawarma is a popular Middle Eastern street food consisting of meat (usually lamb, chicken, or beef) shaved from a vertical rotisserie and typically served in a wrap or with pita bread. It's known for its distinctive flavor from marination and spices. "
},
  { id: 5, sku:"burgerb", img: hero2, title: "Burger", price: 2000, group: "Meal", discount: null, count: 5 ,
    description: "Delicious chicken shawarma with fresh vegetables and sauce. Shawarma is a popular Middle Eastern street food consisting of meat (usually lamb, chicken, or beef) shaved from a vertical rotisserie and typically served in a wrap or with pita bread. It's known for its distinctive flavor from marination and spices. "
},
  { id: 6, sku:"kebabb", img: hero3, title: "Kebabs", price: 1700, group: "Fries", discount: 50, count: 2 ,
    description: "Delicious chicken shawarma with fresh vegetables and sauce. Shawarma is a popular Middle Eastern street food consisting of meat (usually lamb, chicken, or beef) shaved from a vertical rotisserie and typically served in a wrap or with pita bread. It's known for its distinctive flavor from marination and spices. "
},
{ id: 17, sku:"mochab", img: hero4, title: "Mocha", price: 3150, group: "Drink", discount: 10, count: 7 ,
    description: "Delicious chicken shawarma with fresh vegetables and sauce. Shawarma is a popular Middle Eastern street food consisting of meat (usually lamb, chicken, or beef) shaved from a vertical rotisserie and typically served in a wrap or with pita bread. It's known for its distinctive flavor from marination and spices. "
},
  { id: 7, sku:"shawarmac", img: hero1, title: "Shawarma", price: 3500, group: "Snack", discount: 20, count: 10,
    description: "Delicious chicken shawarma with fresh vegetables and sauce. Shawarma is a popular Middle Eastern street food consisting of meat (usually lamb, chicken, or beef) shaved from a vertical rotisserie and typically served in a wrap or with pita bread. It's known for its distinctive flavor from marination and spices. "
},
  { id: 8, sku:"burgerc", img: hero2, title: "Burger", price: 2000, group: "Meal", discount: null, count: 5 ,
    description: "Delicious chicken shawarma with fresh vegetables and sauce. Shawarma is a popular Middle Eastern street food consisting of meat (usually lamb, chicken, or beef) shaved from a vertical rotisserie and typically served in a wrap or with pita bread. It's known for its distinctive flavor from marination and spices. "
},
  { id: 9, sku:"kebabc", img: hero3, title: "Kebabs", price: 1700, group: "Fries", discount: 50, count: 2 ,
    description: "Delicious chicken shawarma with fresh vegetables and sauce. Shawarma is a popular Middle Eastern street food consisting of meat (usually lamb, chicken, or beef) shaved from a vertical rotisserie and typically served in a wrap or with pita bread. It's known for its distinctive flavor from marination and spices. "
},
{ id: 18, sku:"mochac", img: hero4, title: "Mocha", price: 3150, group: "Drink", discount: 10, count: 0 ,
    description: "Delicious chicken shawarma with fresh vegetables and sauce. Shawarma is a popular Middle Eastern street food consisting of meat (usually lamb, chicken, or beef) shaved from a vertical rotisserie and typically served in a wrap or with pita bread. It's known for its distinctive flavor from marination and spices. "
},
  { id: 10, sku:"shawarmad", img: hero1, title: "Shawarma", price: 3500, group: "Snack", discount: 20, count: 10,
    description: "Delicious chicken shawarma with fresh vegetables and sauce. Shawarma is a popular Middle Eastern street food consisting of meat (usually lamb, chicken, or beef) shaved from a vertical rotisserie and typically served in a wrap or with pita bread. It's known for its distinctive flavor from marination and spices. "
},
  { id: 11, sku:"burgerd", img: hero2, title: "Burger", price: 2000, group: "Meal", discount: null, count: 5 ,
    description: "Delicious chicken shawarma with fresh vegetables and sauce. Shawarma is a popular Middle Eastern street food consisting of meat (usually lamb, chicken, or beef) shaved from a vertical rotisserie and typically served in a wrap or with pita bread. It's known for its distinctive flavor from marination and spices. "
},
  { id: 12, sku:"kebabd", img: hero3, title: "Kebabs", price: 1700, group: "Fries", discount: 50, count: 2 ,
    description: "Delicious chicken shawarma with fresh vegetables and sauce. Shawarma is a popular Middle Eastern street food consisting of meat (usually lamb, chicken, or beef) shaved from a vertical rotisserie and typically served in a wrap or with pita bread. It's known for its distinctive flavor from marination and spices. "
},
{ id: 19, sku:"mochad", img: hero4, title: "Mocha", price: 3150, group: "Drink", discount: 10, count: 7 ,
    description: "Delicious chicken shawarma with fresh vegetables and sauce. Shawarma is a popular Middle Eastern street food consisting of meat (usually lamb, chicken, or beef) shaved from a vertical rotisserie and typically served in a wrap or with pita bread. It's known for its distinctive flavor from marination and spices. "
},
  { id: 13, sku:"shawarmae", img: hero1, title: "Shawarma", price: 3500, group: "Snack", discount: 20, count: 10,
    description: "Delicious chicken shawarma with fresh vegetables and sauce. Shawarma is a popular Middle Eastern street food consisting of meat (usually lamb, chicken, or beef) shaved from a vertical rotisserie and typically served in a wrap or with pita bread. It's known for its distinctive flavor from marination and spices. "
},
  { id: 14, sku:"burgere", img: hero2, title: "Burger", price: 2000, group: "Meal", discount: null, count: 5 ,
    description: "Delicious chicken shawarma with fresh vegetables and sauce. Shawarma is a popular Middle Eastern street food consisting of meat (usually lamb, chicken, or beef) shaved from a vertical rotisserie and typically served in a wrap or with pita bread. It's known for its distinctive flavor from marination and spices. "
},
  { id: 15, sku:"kebabe", img: hero3, title: "Kebabs", price: 1700, group: "Fries", discount: 50, count: 2 ,
    description: "Delicious chicken shawarma with fresh vegetables and sauce. Shawarma is a popular Middle Eastern street food consisting of meat (usually lamb, chicken, or beef) shaved from a vertical rotisserie and typically served in a wrap or with pita bread. It's known for its distinctive flavor from marination and spices. "
},
{ id: 20, sku:"mochae", img: hero4, title: "Mocha", price: 3150, group: "Drink", discount: 10, count: 7 ,
    description: "Delicious chicken shawarma with fresh vegetables and sauce. Shawarma is a popular Middle Eastern street food consisting of meat (usually lamb, chicken, or beef) shaved from a vertical rotisserie and typically served in a wrap or with pita bread. It's known for its distinctive flavor from marination and spices. "
},
];

const productGroupsData = [
  { id: 1, name: "Snack" },
  { id: 2, name: "Meal" },
  { id: 3, name: "Fries" },
  { id: 4, name: "Drink" },
  { id: 5, name: "Corporate" },
  { id: 6, name: "Salad" },
  { id: 7, name: "Shake" },
  { id: 8, name: "Others" },
];

  useEffect(() => {
    async function fetchProducts() {
    //   const res = await fetch('/api/products');
    //   const data = await res.json();
      setProducts(productsData);
      setProductGroups(productGroupsData);
    }

    fetchProducts();
  }, [setProducts, setProductGroups]);

//   return <div>Loading products...</div>;
}
