
import { useMemo } from 'react';
import { useCartContext } from '@/context/CartContext';
import { useProductContext } from '@/context/ProductContext';



export function useCartTotal() {
    const { getCartItems } = useCartContext();
    const { products } = useProductContext();
  
    return useMemo(() => {
      return getCartItems().reduce((total, item) => {
        const product = products.find(p => p.sku === item.sku);
        if (!product) return total;
        const price = Number(product.price) || 0;
        const discount = Number(product.discount) || 0;
        const finalPrice = price - (price * discount) / 100;
        return total + finalPrice * item.quantity;
      }, 0);
    }, [getCartItems(), products]);
  }
  