"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import {
  User,
  ShoppingBag,
  Layers,
  Sparkles,
  ExternalLink,
  LogOut,
  Calendar,
  Clock,
  CheckCircle,
  Truck,
  RotateCw
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { user, userProfile, logout, loading } = useAuth();

  const [activeTab, setActiveTab] = useState("orders"); // 'orders' | 'designs' | 'settings'
  const [orders, setOrders] = useState([]);
  const [designs, setDesigns] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setDataLoading(true);
      try {
        // Load orders
        let fetchedOrders = [];
        if (user) {
          try {
            const ordersRef = collection(db, "orders");
            const q = query(ordersRef, where("userId", "==", user.uid));
            const snap = await getDocs(q);
            fetchedOrders = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
          } catch (e) {
            console.warn("Firestore fetch orders error:", e);
          }
        }
        // Fallback or merge with localStorage orders
        const localOrders = JSON.parse(localStorage.getItem("tflex_orders") || "[]");
        if (!fetchedOrders.length && localOrders.length) {
          fetchedOrders = localOrders;
        }
        setOrders(fetchedOrders);

        // Load saved designs
        let fetchedDesigns = [];
        if (user) {
          try {
            const designsRef = collection(db, "designs");
            const q = query(designsRef, where("userId", "==", user.uid));
            const snap = await getDocs(q);
            fetchedDesigns = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
          } catch (e) {
            console.warn("Firestore fetch designs error:", e);
          }
        }
        const localDesigns = JSON.parse(localStorage.getItem("tflex_saved_designs") || "[]");
        if (!fetchedDesigns.length && localDesigns.length) {
          fetchedDesigns = localDesigns;
        }
        setDesigns(fetchedDesigns);
      } catch (err) {
        console.error("Error loading profile data:", err);
      } finally {
        setDataLoading(false);
      }
    };

    if (!loading) {
      fetchUserData();
    }
  }, [user, loading]);

  const handleSignOut = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div style={{ minHeight: "100vh", padding: "40px 0 80px" }}>
      <div className="container">
        {/* Profile Header Card */}
        <div
          className="glow-card"
          style={{
            padding: "32px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "24px",
            marginBottom: "36px"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                background: "var(--gradient-brand)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.6rem",
                fontWeight: 800,
                color: "#ffffff",
                boxShadow: "0 0 20px rgba(0, 240, 255, 0.4)"
              }}
            >
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Avatar"
                  style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                />
              ) : (
                (user?.displayName || user?.email || "C")[0].toUpperCase()
              )}
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <h1 style={{ fontSize: "1.6rem", fontWeight: 900 }}>
                  {user ? user.displayName || "Customer" : "Guest Account"}
                </h1>
                <span className="badge badge-cyan">
                  {user ? "Member" : "Guest Mode"}
                </span>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginTop: "4px" }}>
                {user?.email || "Saved orders & designs stored locally"}
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <Link href="/customize" className="btn-primary" style={{ padding: "10px 20px", fontSize: "0.85rem" }}>
              <Sparkles size={16} />
              <span>Create New Design</span>
            </Link>

            {user && (
              <button
                onClick={handleSignOut}
                className="btn-secondary"
                style={{ padding: "10px 18px", fontSize: "0.85rem", color: "var(--accent-magenta)" }}
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            borderBottom: "1px solid var(--border-subtle)",
            marginBottom: "32px"
          }}
        >
          <button
            onClick={() => setActiveTab("orders")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 18px",
              fontWeight: 700,
              fontSize: "0.95rem",
              color: activeTab === "orders" ? "var(--accent-cyan)" : "var(--text-secondary)",
              borderBottom: activeTab === "orders" ? "2px solid var(--accent-cyan)" : "none",
              marginBottom: "-1px"
            }}
          >
            <ShoppingBag size={18} />
            <span>Order History ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("designs")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 18px",
              fontWeight: 700,
              fontSize: "0.95rem",
              color: activeTab === "designs" ? "var(--accent-cyan)" : "var(--text-secondary)",
              borderBottom: activeTab === "designs" ? "2px solid var(--accent-cyan)" : "none",
              marginBottom: "-1px"
            }}
          >
            <Layers size={18} />
            <span>Saved Custom Designs ({designs.length})</span>
          </button>
        </div>

        {/* TAB 1: ORDER HISTORY */}
        {activeTab === "orders" && (
          <div>
            {orders.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "80px 20px",
                  background: "var(--bg-card)",
                  borderRadius: "var(--radius-xl)",
                  border: "1px solid var(--border-subtle)"
                }}
              >
                <ShoppingBag size={48} color="var(--text-muted)" style={{ margin: "0 auto 16px" }} />
                <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>No orders placed yet</h3>
                <p style={{ color: "var(--text-secondary)", marginTop: "6px", fontSize: "0.9rem" }}>
                  Your completed print orders and delivery tracking will appear here.
                </p>
                <Link href="/store" className="btn-primary" style={{ marginTop: "20px" }}>
                  Explore Store
                </Link>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {orders.map((order, i) => (
                  <div
                    key={i}
                    className="glow-card"
                    style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "12px",
                        borderBottom: "1px solid var(--border-subtle)",
                        paddingBottom: "14px"
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 800, fontSize: "1.05rem" }}>
                          Order #{order.orderNumber || `TF-${1000 + i}`}
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "2px" }}>
                          Placed on{" "}
                          {order.createdAt?.seconds
                            ? new Date(order.createdAt.seconds * 1000).toLocaleDateString()
                            : new Date().toLocaleDateString()}
                        </div>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <span className="badge badge-cyan">
                          ● {order.orderStatus || "Printing & Preparation"}
                        </span>
                        <span style={{ fontWeight: 800, fontSize: "1.1rem" }}>
                          ${order.pricing?.total ? order.pricing.total.toFixed(2) : "39.99"}
                        </span>
                      </div>
                    </div>

                    {/* Items row */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      {order.items?.map((item, idx) => (
                        <div key={idx} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{
                              width: "56px",
                              height: "60px",
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
                          <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>
                            ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SAVED CUSTOM DESIGNS */}
        {activeTab === "designs" && (
          <div>
            {designs.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "80px 20px",
                  background: "var(--bg-card)",
                  borderRadius: "var(--radius-xl)",
                  border: "1px solid var(--border-subtle)"
                }}
              >
                <Layers size={48} color="var(--text-muted)" style={{ margin: "0 auto 16px" }} />
                <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>No saved designs yet</h3>
                <p style={{ color: "var(--text-secondary)", marginTop: "6px", fontSize: "0.9rem" }}>
                  Save your canvas mockups in the Customizer Studio to easily re-order or continue editing.
                </p>
                <Link href="/customize" className="btn-primary" style={{ marginTop: "20px" }}>
                  <Sparkles size={16} /> Open Customizer Studio
                </Link>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: "24px"
                }}
              >
                {designs.map((design, idx) => (
                  <div key={idx} className="glow-card" style={{ padding: "20px", display: "flex", flexDirection: "column" }}>
                    <div
                      style={{
                        position: "relative",
                        aspectRatio: "1/1",
                        background: "#0d0e14",
                        borderRadius: "var(--radius-md)",
                        overflow: "hidden",
                        marginBottom: "14px"
                      }}
                    >
                      <img
                        src={design.previewThumbnail}
                        alt="Custom design mockup"
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                      />
                    </div>

                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: "1rem", fontWeight: 800 }}>
                        {design.product || "Custom Graphic Tee"}
                      </h4>
                      <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "4px" }}>
                        Saved on {new Date(design.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div style={{ marginTop: "16px", display: "flex", gap: "8px" }}>
                      <Link
                        href={`/customize?product=${design.productId || "heavyweight-oversized-tee"}`}
                        className="btn-primary"
                        style={{ flex: 1, padding: "8px", fontSize: "0.85rem" }}
                      >
                        <Sparkles size={14} /> Open in Studio
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
