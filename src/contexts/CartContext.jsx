import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState([]);
  const [itemAmount, setItemAmount] = useState(0);

  useEffect(() => {
    const totalPrice = cart.reduce((acc, currItem) => {
      return acc + currItem.price * currItem.amount;
    }, 0);
    setTotal(totalPrice.toFixed(2));
  });

  const addToCart = (product, id) => {
    const newItem = { ...product, amount: 1 };
    const cartItem = cart.find((item) => item.id === id);

    if (cartItem) {
      const newCart = [...cart].map((item) => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount + 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
  };

  // Remove from cart
  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => item.id !== id);

    setCart(newCart);
  };

  // Clear Cart
  const clearCart = () => {
    setCart([]);
  };

  // Increase amount
  const increaseAmount = (id) => {
    const cartItem = cart.find((item) => item.id === id);
    addToCart(cartItem, id);
  };

  // Decrease
  const decreaseAmount = (id) => {
    const cartItem = cart.find((item) => item.id === id);
    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount - 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    }
    if (cartItem.amount < 2) {
      removeFromCart(id);
    }
  };

  // Update Item Amount
  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((acc, currItem) => {
        return acc + currItem.amount;
      }, 0);
      setItemAmount(amount);
    }
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseAmount,
        decreaseAmount,
        itemAmount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
