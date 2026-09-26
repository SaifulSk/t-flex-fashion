"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import confetti from "canvas-confetti";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  ShoppingBag,
  CheckCircle,
  ArrowLeft,
  Lock,
  Sparkles,
  QrCode,
  DollarSign
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, discountAmount, discountPercent, shippingFee, finalTotal, clearCart } =
    useCart();
  const { user } = useAuth();

  // Form states
  const [formData, setFormData] = useState({
    firstName: user?.displayName?.split(" ")[0] || "",
    lastName: user?.displayName?.split(" ").slice(1).join(" ") || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "United States",
    paymentMethod: "card",
    deliveryOption: "standard"
  });

  const [cardData, setCardData] = useState({
    number: "•••• •••• •••• 4242",
    expiry: "12/28",
    cvc: "888",
    name: "Alex Rivera"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);
    const orderNumber = `TF-${Math.floor(100000 + Math.random() * 900000)}`;

    const orderPayload = {
      orderNumber,
      userId: user ? user.uid : "guest",
      customer: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.postalCode}, ${formData.country}`
      },
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        isCustom: !!item.isCustom,
        image: item.image
      })),
      pricing: {
        subtotal,
        discountAmount,
        shippingFee: formData.deliveryOption === "rush" ? 149 : shippingFee,
        total: finalTotal + (formData.deliveryOption === "rush" ? 149 : 0)
      },
      payment: {
        method: formData.paymentMethod,
        status: "Paid"
      },
      orderStatus: "Printing & Preparation",
      createdAt: serverTimestamp(),
      estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString()
    };

    try {
      if (user) {
        await addDoc(collection(db, "orders"), orderPayload);
      }
    } catch (err) {
      console.warn("Firestore order sync warning:", err);
    }

    // Save in local storage history
    const existingOrders = JSON.parse(localStorage.getItem("tflex_orders") || "[]");
    existingOrders.unshift({
      ...orderPayload,
      createdAt: new Date().toISOString()
    });
    localStorage.setItem("tflex_orders", JSON.stringify(existingOrders));

    // Clear cart & trigger confetti
    clearCart();
    setOrderComplete(orderPayload);
    setIsSubmitting(false);

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  if (orderComplete) {
    return (
      <div style={{ minHeight: "85vh", padding: "60px 0 100px" }}>
        <div className="container" style={{ maxWidth: "680px" }}>
          <div
            className="glow-card"
            style={{
              padding: "48px 36px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px"
            }}
          >
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                background: "rgba(16, 185, 129, 0.15)",
                border: "2px solid #10b981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#10b981"
              }}
            >
              <CheckCircle size={36} />
            </div>

            <div>
              <span className="badge badge-cyan" style={{ marginBottom: "8px" }}>
                Order Confirmed
              </span>
              <h1 style={{ fontSize: "2rem", fontWeight: 900 }}>Thank You For Your Order!</h1>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginTop: "6px" }}>
                Order #{orderComplete.orderNumber} is now queued in our UltraHD printing line.
              </p>
            </div>

            {/* Order status card */}
            <div
              style={{
                width: "100%",
                background: "rgba(255, 255, 255, 0.03)",
                borderRadius: "var(--radius-lg)",
                padding: "20px",
                border: "1px solid var(--border-subtle)",
                textAlign: "left"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>STATUS</span>
                <span style={{ color: "var(--accent-cyan)", fontWeight: 700, fontSize: "0.85rem" }}>
                  ● In Print Production
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>ESTIMATED DELIVERY</span>
                <span style={{ fontWeight: 700, fontSize: "0.85rem" }}>
                  {orderComplete.estimatedDelivery}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>TOTAL PAID</span>
                <span style={{ fontWeight: 800, fontSize: "1rem", color: "#10b981" }}>
                  ₹{orderComplete.pricing.total.toFixed(0)}
                </span>
              </div>
            </div>

            {/* Ordered Items Preview */}
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "10px" }}>
              {orderComplete.items.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "10px",
                    borderRadius: "var(--radius-md)",
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid var(--border-subtle)"
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "48px", height: "48px", objectFit: "contain", borderRadius: "6px" }}
                  />
                  <div style={{ flex: 1, textAlign: "left" }}>
                    <div style={{ fontSize: "0.85rem", fontWeight: 700 }}>{item.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      Size: {item.size} • Qty: {item.quantity}
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>
                    ₹{(item.price * item.quantity).toFixed(0)}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "12px" }}>
              <Link href="/profile" className="btn-secondary" style={{ padding: "12px 24px" }}>
                View in Profile
              </Link>
              <Link href="/store" className="btn-primary" style={{ padding: "12px 28px" }}>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container" style={{ padding: "80px 0", textAlign: "center" }}>
        <h2 style={{ fontSize: "1.8rem", fontWeight: 800 }}>Your bag is empty</h2>
        <p style={{ color: "var(--text-secondary)", marginTop: "8px" }}>
          Add products or custom tees to your bag before checking out.
        </p>
        <Link href="/store" className="btn-primary" style={{ marginTop: "24px" }}>
          Browse Catalog
        </Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", padding: "40px 0 80px" }}>
      <div className="container">
        {/* Back to cart link */}
        <Link
          href="/store"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            color: "var(--text-secondary)",
            fontSize: "0.85rem",
            marginBottom: "24px"
          }}
        >
          <ArrowLeft size={16} /> Continue Shopping
        </Link>

        <h1 style={{ fontSize: "2.2rem", fontWeight: 900, marginBottom: "32px" }}>
          Secure <span className="text-gradient">Checkout</span>
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "40px",
            alignItems: "start"
          }}
          className="checkout-grid"
        >
          {/* Left Form Column */}
          <form onSubmit={handlePlaceOrder} style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            {/* 1. Contact & Shipping */}
            <div
              className="glow-card"
              style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <h3 style={{ fontSize: "1.15rem", fontWeight: 800, display: "flex", alignItems: "center", gap: "10px" }}>
                <Truck size={20} color="var(--accent-cyan)" />
                <span>1. Shipping Information</span>
              </h3>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Jordan"
                  />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Miller"
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="jordan@example.com"
                  />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>
                  Street Address *
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="742 Evergreen Terrace, Apt 4B"
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Springfield"
                  />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>
                    State / Region *
                  </label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="CA"
                  />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>
                    Zip Code *
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    required
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="90210"
                  />
                </div>
              </div>
            </div>

            {/* 2. Delivery Options */}
            <div
              className="glow-card"
              style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <h3 style={{ fontSize: "1.15rem", fontWeight: 800 }}>2. Delivery Method</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 18px",
                    borderRadius: "var(--radius-md)",
                    background:
                      formData.deliveryOption === "standard"
                        ? "rgba(0, 240, 255, 0.1)"
                        : "rgba(255, 255, 255, 0.03)",
                    border:
                      formData.deliveryOption === "standard"
                        ? "1px solid var(--accent-cyan)"
                        : "1px solid var(--border-subtle)",
                    cursor: "pointer"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <input
                      type="radio"
                      name="deliveryOption"
                      value="standard"
                      checked={formData.deliveryOption === "standard"}
                      onChange={handleChange}
                      style={{ accentColor: "var(--accent-cyan)" }}
                    />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>Standard Courier Delivery</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                        Delivered in 4-6 business days
                      </div>
                    </div>
                  </div>
                  <span style={{ fontWeight: 800, fontSize: "0.9rem" }}>
                    {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
                  </span>
                </label>

                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 18px",
                    borderRadius: "var(--radius-md)",
                    background:
                      formData.deliveryOption === "rush"
                        ? "rgba(0, 240, 255, 0.1)"
                        : "rgba(255, 255, 255, 0.03)",
                    border:
                      formData.deliveryOption === "rush"
                        ? "1px solid var(--accent-cyan)"
                        : "1px solid var(--border-subtle)",
                    cursor: "pointer"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <input
                      type="radio"
                      name="deliveryOption"
                      value="rush"
                      checked={formData.deliveryOption === "rush"}
                      onChange={handleChange}
                      style={{ accentColor: "var(--accent-cyan)" }}
                    />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "6px" }}>
                        <span>Express Rush Print & Courier</span>
                        <span className="badge badge-purple" style={{ fontSize: "0.65rem" }}>Priority</span>
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                        Front-of-line printing + 48-Hour delivery
                      </div>
                    </div>
                  </div>
                  <span style={{ fontWeight: 800, fontSize: "0.9rem", color: "var(--accent-cyan)" }}>
                    +₹149
                  </span>
                </label>
              </div>
            </div>

            {/* 3. Payment Method */}
            <div
              className="glow-card"
              style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <h3 style={{ fontSize: "1.15rem", fontWeight: 800, display: "flex", alignItems: "center", gap: "10px" }}>
                <CreditCard size={20} color="var(--accent-cyan)" />
                <span>3. Payment Information</span>
              </h3>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                {[
                  { id: "card", label: "Credit Card", icon: CreditCard },
                  { id: "upi", label: "UPI / QR", icon: QrCode },
                  { id: "cod", label: "Pay on Delivery", icon: DollarSign }
                ].map((pm) => {
                  const Icon = pm.icon;
                  return (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: pm.id })}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "6px",
                        padding: "14px 8px",
                        borderRadius: "var(--radius-md)",
                        background:
                          formData.paymentMethod === pm.id
                            ? "rgba(0, 240, 255, 0.12)"
                            : "rgba(255, 255, 255, 0.03)",
                        border:
                          formData.paymentMethod === pm.id
                            ? "1px solid var(--accent-cyan)"
                            : "1px solid var(--border-subtle)",
                        color: formData.paymentMethod === pm.id ? "var(--accent-cyan)" : "var(--text-secondary)",
                        fontWeight: 600,
                        fontSize: "0.8rem"
                      }}
                    >
                      <Icon size={18} />
                      <span>{pm.label}</span>
                    </button>
                  );
                })}
              </div>

              {formData.paymentMethod === "card" && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    background: "rgba(0, 0, 0, 0.25)",
                    padding: "16px",
                    borderRadius: "var(--radius-md)"
                  }}
                >
                  <div>
                    <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardData.number}
                      onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                      className="input-field"
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div>
                      <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>
                        Expiration Date
                      </label>
                      <input
                        type="text"
                        value={cardData.expiry}
                        onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>
                        CVC
                      </label>
                      <input
                        type="text"
                        value={cardData.cvc}
                        onChange={(e) => setCardData({ ...cardData, cvc: e.target.value })}
                        className="input-field"
                      />
                    </div>
                  </div>
                </div>
              )}

              {formData.paymentMethod === "upi" && (
                <div
                  style={{
                    padding: "16px",
                    background: "rgba(0, 240, 255, 0.05)",
                    borderRadius: "var(--radius-md)",
                    textAlign: "center"
                  }}
                >
                  <p style={{ fontSize: "0.85rem", color: "var(--accent-cyan)", fontWeight: 700 }}>
                    Instant QR scan will appear after clicking Place Order.
                  </p>
                </div>
              )}

              {formData.paymentMethod === "cod" && (
                <div
                  style={{
                    padding: "16px",
                    background: "rgba(245, 158, 11, 0.08)",
                    borderRadius: "var(--radius-md)",
                    textAlign: "center"
                  }}
                >
                  <p style={{ fontSize: "0.85rem", color: "var(--accent-amber)", fontWeight: 700 }}>
                    Cash on delivery available. Pay when your parcel arrives.
                  </p>
                </div>
              )}
            </div>

            {/* Place Order CTA Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
              style={{
                width: "100%",
                padding: "18px",
                fontSize: "1.1rem",
                borderRadius: "var(--radius-lg)"
              }}
            >
              <Lock size={18} />
              <span>
                {isSubmitting
                  ? "Processing Order..."
                  : `Complete Order • ₹${(
                      finalTotal + (formData.deliveryOption === "rush" ? 149 : 0)
                    ).toFixed(0)}`}
              </span>
            </button>
          </form>

          {/* Right Column: Order Summary Preview */}
          <div
            className="glow-card"
            style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <h3 style={{ fontSize: "1.2rem", fontWeight: 800 }}>Order Summary</h3>

            {/* Item list */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {cart.map((item) => (
                <div
                  key={item.cartItemId}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    paddingBottom: "12px",
                    borderBottom: "1px solid var(--border-subtle)"
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "60px",
                      height: "65px",
                      objectFit: "contain",
                      background: "#0d0e14",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--border-subtle)"
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "0.9rem", fontWeight: 700 }}>{item.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      Size: {item.size} • Qty: {item.quantity}
                    </div>
                  </div>
                  <span style={{ fontWeight: 800, fontSize: "0.95rem" }}>
                    ₹{((item.price || 0) * (item.quantity || 1)).toFixed(0)}
                  </span>
                </div>
              ))}
            </div>

            {/* Cost Breakdown */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.9rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)" }}>
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(0)}</span>
              </div>

              {discountPercent > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", color: "#10b981" }}>
                  <span>Discount ({discountPercent}%)</span>
                  <span>-₹{discountAmount.toFixed(0)}</span>
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)" }}>
                <span>Shipping</span>
                <span>
                  {formData.deliveryOption === "rush"
                    ? "₹149 (Express Rush)"
                    : shippingFee === 0
                    ? "FREE"
                    : `₹${shippingFee}`}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "1.2rem",
                  fontWeight: 900,
                  paddingTop: "12px",
                  borderTop: "1px solid var(--border-subtle)",
                  marginTop: "6px"
                }}
              >
                <span>Total Due</span>
                <span className="text-gradient">
                  ₹
                  {(
                    finalTotal + (formData.deliveryOption === "rush" ? 149 : 0)
                  ).toFixed(0)}
                </span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "0.78rem",
                color: "var(--text-muted)",
                justifyContent: "center"
              }}
            >
              <ShieldCheck size={16} color="#10b981" />
              <span>256-Bit SSL Encrypted & Protected Checkout</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 860px) {
          .checkout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
