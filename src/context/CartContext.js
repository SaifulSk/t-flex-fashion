"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("tflex_cart");
      if (stored) {
        setCart(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load cart from storage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("tflex_cart", JSON.stringify(cart));
      } catch (e) {
        console.error("Failed to save cart to storage", e);
      }
    }
  }, [cart, isLoaded]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      // If it's a standard non-custom item with matching id, color, and size, increment quantity
      if (!item.isCustom) {
        const existingIndex = prevCart.findIndex(
          (p) =>
            p.id === item.id &&
            p.color?.name === item.color?.name &&
            p.size === item.size &&
            !p.isCustom
        );

        if (existingIndex > -1) {
          const updated = [...prevCart];
          updated[existingIndex].quantity += item.quantity || 1;
          return updated;
        }
      }

      // Otherwise add as unique item (custom items always unique)
      const newItem = {
        ...item,
        cartItemId: `${item.id || "item"}-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        quantity: item.quantity || 1,
        addedAt: new Date().toISOString()
      };
      return [newItem, ...prevCart];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setDiscountCode("");
    setDiscountPercent(0);
    try {
      localStorage.removeItem("tflex_cart");
    } catch (e) {}
  };

  const applyCoupon = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === "TFLEX20" || clean === "WELCOME20") {
      setDiscountCode(clean);
      setDiscountPercent(20);
      return { success: true, message: "20% discount applied!" };
    } else if (clean === "SUMMER10") {
      setDiscountCode(clean);
      setDiscountPercent(10);
      return { success: true, message: "10% discount applied!" };
    } else if (clean === "FLEXVIP") {
      setDiscountCode(clean);
      setDiscountPercent(30);
      return { success: true, message: "VIP 30% discount applied!" };
    } else {
      return { success: false, message: "Invalid promo code. Try 'TFLEX20'" };
    }
  };

  const removeCoupon = () => {
    setDiscountCode("");
    setDiscountPercent(0);
  };

  const totalItemsCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const subtotal = cart.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    return sum + price * (item.quantity || 1);
  }, 0);

  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const shippingFee = subtotal >= 999 || subtotal === 0 ? 0 : 79; // Free shipping over ₹999 in India
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItemsCount,
        subtotal,
        discountCode,
        discountPercent,
        discountAmount,
        shippingFee,
        finalTotal,
        applyCoupon,
        removeCoupon
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
