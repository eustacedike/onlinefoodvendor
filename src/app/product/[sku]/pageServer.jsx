'use client';

import { useParams } from 'next/navigation';
import { useProductContext } from '@/context/ProductContext';


import DataFetch from "@/context/datafetch";

import ProductDetail from '@/components/ProductList/ProductDetail';


export default function ProductPage() {
  const params = useParams(); // ✅ just use directly
  const { sku } = params;

  const { products } = useProductContext();

  // Ensure comparison is valid (string === string)
  const product = products.find(p => p.sku === sku);

  console.log(products)
  

 
    return ( <div >
        <DataFetch />
  
        {product ? (
          <ProductDetail
            key={product.id}
            imageUrl={product.img}
            name={product.title}
            description={product.description}
            sku={product.sku}
            price={product.price}
            tag={product.group}
            discount={product.discount}
            count={product.count}
          />
        ) : (
          <>
            <h2>Product not found</h2>
            <p>We couldn’t find the product you're looking for.</p>
          </>
        )}
      </div>
  );
}
