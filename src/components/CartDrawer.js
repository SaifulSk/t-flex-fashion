"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Tag,
  Check
} from "lucide-react";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    totalItemsCount,
    subtotal,
    discountCode,
    discountPercent,
    discountAmount,
    shippingFee,
    finalTotal,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const [couponMessage, setCouponMessage] = useState(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    setCouponMessage(res);
  };

  const freeShippingThreshold = 60;
  const neededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        justifyContent: "flex-end"
      }}
    >
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0, 0, 0, 0.75)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)"
        }}
      />

      {/* Drawer content */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "460px",
          height: "100%",
          background: "var(--bg-secondary)",
          borderLeft: "1px solid var(--border-highlight)",
          boxShadow: "var(--shadow-elevated)",
          display: "flex",
          flexDirection: "column",
          zIndex: 10
        }}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <ShoppingBag size={20} color="var(--accent-cyan)" />
            <h2 style={{ fontSize: "1.2rem", fontWeight: 800 }}>Your Bag</h2>
            <span className="badge badge-cyan">{totalItemsCount} items</span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            style={{
              color: "var(--text-secondary)",
              padding: "4px",
              borderRadius: "50%"
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress bar */}
        <div
          style={{
            padding: "12px 24px",
            background: "rgba(0, 240, 255, 0.05)",
            borderBottom: "1px solid var(--border-subtle)"
          }}
        >
          <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "6px" }}>
            {neededForFreeShipping > 0 ? (
              <>
                Add <strong style={{ color: "var(--accent-cyan)" }}>${neededForFreeShipping.toFixed(2)}</strong> more for <strong>FREE Express Shipping</strong>
              </>
            ) : (
              <span style={{ color: "#10b981", fontWeight: 700 }}>
                ✓ You qualified for FREE Express Shipping!
              </span>
            )}
          </div>
          <div
            style={{
              width: "100%",
              height: "6px",
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "99px",
              overflow: "hidden"
            }}
          >
            <div
              style={{
                width: `${progressPercent}%`,
                height: "100%",
                background: "var(--gradient-brand)",
                transition: "width 0.3s ease"
              }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "16px"
          }}
        >
          {cart.length === 0 ? (
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                gap: "16px",
                padding: "40px 0"
              }}
            >
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.05)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <ShoppingBag size={32} color="var(--text-muted)" />
              </div>
              <div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Your bag is empty</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginTop: "4px" }}>
                  Explore our premium streetwear or create a custom canvas tee.
                </p>
              </div>
              <Link
                href="/customize"
                onClick={() => setIsCartOpen(false)}
                className="btn-primary"
                style={{ marginTop: "8px" }}
              >
                <Sparkles size={16} /> Open Customizer
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.cartItemId}
                style={{
                  display: "flex",
                  gap: "16px",
                  padding: "14px",
                  borderRadius: "var(--radius-lg)",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid var(--border-subtle)",
                  position: "relative"
                }}
              >
                {/* Thumbnail image / preview */}
                <div
                  style={{
                    width: "80px",
                    height: "90px",
                    borderRadius: "var(--radius-md)",
                    background: "#0d0e14",
                    overflow: "hidden",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid rgba(255,255,255,0.08)"
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                </div>

                {/* Details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "8px" }}>
                    <h4
                      style={{
                        fontSize: "0.95rem",
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}
                    >
                      {item.name}
                    </h4>
                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      style={{ color: "var(--text-muted)", transition: "color 0.2s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-magenta)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
                    {item.isCustom && (
                      <span className="badge badge-purple" style={{ fontSize: "0.65rem" }}>
                        Custom DTG Print
                      </span>
                    )}
                    <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                      Size: <strong>{item.size || "M"}</strong>
                    </span>
                    {item.color?.hex && (
                      <span
                        style={{
                          width: "12px",
                          height: "12px",
                          borderRadius: "50%",
                          background: item.color.hex,
                          display: "inline-block",
                          border: "1px solid rgba(255,255,255,0.3)"
                        }}
                      />
                    )}
                  </div>

                  {/* Price and Quantity stepper */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: "12px"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, (item.quantity || 1) - 1)}
                        style={{
                          width: "26px",
                          height: "26px",
                          borderRadius: "6px",
                          background: "rgba(255,255,255,0.08)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <Minus size={13} />
                      </button>
                      <span style={{ fontSize: "0.9rem", fontWeight: 700, minWidth: "20px", textAlign: "center" }}>
                        {item.quantity || 1}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, (item.quantity || 1) + 1)}
                        style={{
                          width: "26px",
                          height: "26px",
                          borderRadius: "6px",
                          background: "rgba(255,255,255,0.08)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <span style={{ fontSize: "1rem", fontWeight: 800, color: "var(--accent-cyan)" }}>
                      ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer: Promo code & checkout */}
        {cart.length > 0 && (
          <div
            style={{
              padding: "20px 24px",
              borderTop: "1px solid var(--border-subtle)",
              background: "rgba(10, 11, 16, 0.6)"
            }}
          >
            {/* Promo Code Form */}
            <form onSubmit={handleApplyCoupon} style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
              <input
                type="text"
                placeholder="Promo Code (TFLEX20)"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                className="input-field"
                style={{ padding: "8px 12px", fontSize: "0.85rem" }}
              />
              <button type="submit" className="btn-secondary" style={{ padding: "8px 14px", fontSize: "0.85rem" }}>
                Apply
              </button>
            </form>

            {couponMessage && (
              <div
                style={{
                  fontSize: "0.75rem",
                  marginBottom: "12px",
                  color: couponMessage.success ? "#10b981" : "var(--accent-magenta)"
                }}
              >
                {couponMessage.message}
              </div>
            )}

            {/* Calculations breakdown */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.85rem", marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)" }}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {discountPercent > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", color: "#10b981" }}>
                  <span>Discount ({discountPercent}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)" }}>
                <span>Shipping</span>
                <span>{shippingFee === 0 ? "FREE" : `$${shippingFee.toFixed(2)}`}</span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "1.1rem",
                  fontWeight: 800,
                  marginTop: "6px",
                  paddingTop: "8px",
                  borderTop: "1px solid var(--border-subtle)"
                }}
              >
                <span>Total</span>
                <span className="text-gradient">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <Link
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="btn-primary"
              style={{ width: "100%", padding: "14px", borderRadius: "var(--radius-lg)" }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
