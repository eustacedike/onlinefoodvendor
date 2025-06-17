'use client';
import { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [productGroups, setProductGroups] = useState([]);

  return (
    <ProductContext.Provider value={{ products, setProducts, productGroups, setProductGroups }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProductContext = () => useContext(ProductContext);
