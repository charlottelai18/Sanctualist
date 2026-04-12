import React, { createContext, useContext, useState, useCallback } from 'react';

// @ts-ignore
const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((product, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.product_id === product.id);
      if (existing) {
        return prev.map(i =>
          i.product_id === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, {
        product_id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
        quantity,
      }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId) => {
    setItems(prev => prev.filter(i => i.product_id !== productId));
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(i => i.product_id !== productId));
      return;
    }
    setItems(prev => prev.map(i =>
      i.product_id === productId ? { ...i, quantity } : i
    ));
  }, []);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const FREE_SHIPPING_THRESHOLD = 75;
  const shippingProgress = Math.min((total / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const freeShipping = total >= FREE_SHIPPING_THRESHOLD;

  const clearCart = useCallback(() => setItems([]), []);

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQuantity, clearCart,
      total, itemCount, isOpen, setIsOpen,
      shippingProgress, freeShipping, FREE_SHIPPING_THRESHOLD
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);