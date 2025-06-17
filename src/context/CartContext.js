
'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on first render
  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) {
      setCart(JSON.parse(stored));
    }
  }, []);

  // Sync cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const increaseQuantity = (sku) => {
    setCart(prev => {
      const found = prev.find(item => item.sku === sku);
      if (found) {
        return prev.map(item =>
          item.sku === sku ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { sku, quantity: 1 }];
      }
    });
  };

  const decreaseQuantity = (sku) => {
    setCart(prev => {
      const found = prev.find(item => item.sku === sku);
      if (!found) return prev;

      if (found.quantity <= 1) {
        return prev.filter(item => item.sku !== sku); // remove item
      } else {
        return prev.map(item =>
          item.sku === sku ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
    });
  };

  const getQuantity = (sku) => {
    const found = cart.find(item => item.sku === sku);
    return found ? found.quantity : 0;
  };

  const getCartItemCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getCartItems = () => {
    return cart;
  };

  return (
    <CartContext.Provider
      value={{ cart, increaseQuantity, decreaseQuantity, getQuantity, getCartItems, getCartItemCount }}
    >
      {children}
    </CartContext.Provider>
  );
};
