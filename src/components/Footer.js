import React from "react";
import Link from "next/link";
import { Shirt, ShieldCheck, Truck, RotateCcw, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border-subtle)",
        marginTop: "auto"
      }}
    >
      {/* Brand value pillars */}
      <div
        style={{
          borderBottom: "1px solid var(--border-subtle)",
          padding: "36px 0"
        }}
      >
        <div
          className="container"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "24px"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                background: "rgba(0, 240, 255, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--accent-cyan)",
                flexShrink: 0
              }}
            >
              <Sparkles size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>UltraHD DTG Printing</div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>1200 DPI razor-sharp details</div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                background: "rgba(157, 78, 221, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#c77dff",
                flexShrink: 0
              }}
            >
              <Shirt size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>240 GSM Luxury Cotton</div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>100% Combed ring-spun cotton</div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                background: "rgba(16, 185, 129, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#10b981",
                flexShrink: 0
              }}
            >
              <Truck size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>Fast Turnaround & Delivery</div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>Printed & shipped in 48 hours</div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                background: "rgba(245, 158, 11, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--accent-amber)",
                flexShrink: 0
              }}
            >
              <ShieldCheck size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>100% Quality Guarantee</div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>50+ washes no-fade guarantee</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer navigation */}
      <div className="container" style={{ padding: "60px 24px 40px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "40px"
          }}
        >
          {/* Brand Col */}
          <div style={{ maxWidth: "300px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "var(--gradient-brand)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Shirt size={20} color="#ffffff" />
              </div>
              <span style={{ fontSize: "1.2rem", fontWeight: 900, fontFamily: "var(--font-display)" }}>
                T-FLEX FASHION
              </span>
            </div>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: "1.6" }}>
              Premium streetwear apparel and custom digital printing platform. Wear your imagination with custom canvas designs, heavyweight cottons, and rich color accuracy.
            </p>
          </div>

          {/* Catalog Col */}
          <div>
            <h4 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "18px", color: "var(--text-main)" }}>
              Store Catalog
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.85rem" }}>
              <li><Link href="/store" style={{ color: "var(--text-secondary)" }}>All Products</Link></li>
              <li><Link href="/store?category=oversized" style={{ color: "var(--text-secondary)" }}>Heavyweight Oversized</Link></li>
              <li><Link href="/store?category=vintage" style={{ color: "var(--text-secondary)" }}>Acid Wash & Vintage</Link></li>
              <li><Link href="/store?category=hoodies" style={{ color: "var(--text-secondary)" }}>French Terry Hoodies</Link></li>
            </ul>
          </div>

          {/* Custom Studio Col */}
          <div>
            <h4 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "18px", color: "var(--text-main)" }}>
              Custom Studio
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.85rem" }}>
              <li><Link href="/customize" style={{ color: "var(--text-secondary)" }}>Online Canvas Designer</Link></li>
              <li><Link href="/about" style={{ color: "var(--text-secondary)" }}>DTG Printing Specs</Link></li>
              <li><Link href="/profile#designs" style={{ color: "var(--text-secondary)" }}>My Saved Designs</Link></li>
              <li><Link href="/about#bulk" style={{ color: "var(--text-secondary)" }}>Bulk & Merch Orders</Link></li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div>
            <h4 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "18px", color: "var(--text-main)" }}>
              Get 20% Off Your First Tee
            </h4>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginBottom: "12px" }}>
              Subscribe to get exclusive drops, streetwear graphic packs, and secret discounts.
            </p>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="email"
                placeholder="your.email@gmail.com"
                className="input-field"
                style={{ fontSize: "0.85rem", padding: "10px 14px" }}
              />
              <button className="btn-primary" style={{ padding: "10px 16px", fontSize: "0.85rem" }}>
                Join
              </button>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "50px",
            paddingTop: "24px",
            borderTop: "1px solid var(--border-subtle)",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            fontSize: "0.8rem",
            color: "var(--text-muted)"
          }}
        >
          <div>
            © {new Date().getFullYear()} T-Flex Fashion & Prints. All rights reserved.
          </div>
          <div style={{ display: "flex", gap: "20px" }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Shipping Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
