import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (veggie) => {
    const exists = cart.find((item) => item._id === veggie._id);
    if (exists) {
      setCart(cart.map(item =>
        item._id === veggie._id ? { ...item, quantityKg: item.quantityKg + 1 } : item
      ));
    } else {
      setCart([...cart, { ...veggie, quantityKg: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  const updateQty = (id, qty) => {
    setCart(cart.map(item =>
      item._id === id ? { ...item, quantityKg: qty } : item
    ));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
