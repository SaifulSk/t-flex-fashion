"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import {
  Sparkles,
  ShoppingBag,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Ruler,
  ChevronDown,
  ChevronUp,
  X
} from "lucide-react";

export default function ProductDetailClient({ product }) {
  const { addToCart } = useCart();

  const [selectedImage, setSelectedImage] = useState(product.gallery?.[0] || product.image);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState("L");
  const [quantity, setQuantity] = useState(1);
  const [sizeChartOpen, setSizeChartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("specs"); // 'specs' | 'reviews' | 'care'

  if (!product) {
    return (
      <div className="container" style={{ padding: "80px 0", textAlign: "center" }}>
        <h2>Product not found</h2>
        <Link href="/store" className="btn-primary" style={{ marginTop: "16px" }}>
          Back to Store
        </Link>
      </div>
    );
  }

  const handleAddPlainToBag = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
      image: selectedImage || product.image,
      isCustom: false
    });
  };

  return (
    <div style={{ minHeight: "100vh", padding: "40px 0 80px" }}>
      <div className="container">
        {/* Breadcrumb */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "0.85rem",
            color: "var(--text-secondary)",
            marginBottom: "32px"
          }}
        >
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/store">Store</Link>
          <span>/</span>
          <span style={{ color: "var(--text-main)" }}>{product.name}</span>
        </div>

        {/* Main Details Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: "50px",
            alignItems: "start"
          }}
          className="product-detail-grid"
        >
          {/* Left: Gallery Showcase */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div
              style={{
                position: "relative",
                aspectRatio: "1/1",
                borderRadius: "var(--radius-xl)",
                overflow: "hidden",
                background: "#12141e",
                border: "1px solid var(--border-subtle)",
                boxShadow: "var(--shadow-subtle)"
              }}
            >
              <img
                src={selectedImage}
                alt={product.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />

              {product.badge && (
                <div style={{ position: "absolute", top: "18px", left: "18px" }}>
                  <span className="badge badge-cyan">{product.badge}</span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.gallery && product.gallery.length > 1 && (
              <div style={{ display: "flex", gap: "12px" }}>
                {product.gallery.map((imgUrl, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(imgUrl)}
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "var(--radius-md)",
                      overflow: "hidden",
                      border:
                        selectedImage === imgUrl
                          ? "2px solid #00f0ff"
                          : "1px solid var(--border-subtle)",
                      background: "#12141e",
                      padding: 0,
                      cursor: "pointer"
                    }}
                  >
                    <img
                      src={imgUrl}
                      alt={`Thumb ${i}`}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Buy & Customize Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "0.85rem",
                  color: "var(--accent-cyan)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  marginBottom: "8px"
                }}
              >
                <span>{product.specs.weight}</span>
                <span>•</span>
                <span>{product.specs.fit}</span>
              </div>

              <h1 style={{ fontSize: "2.2rem", fontWeight: 900, lineHeight: "1.2" }}>
                {product.name}
              </h1>

              {/* Rating */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "8px" }}>
                <div style={{ display: "flex", gap: "2px" }}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < Math.floor(product.rating) ? "#f59e0b" : "none"}
                      color="#f59e0b"
                    />
                  ))}
                </div>
                <span style={{ fontSize: "0.9rem", fontWeight: 700 }}>{product.rating}</span>
                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  ({product.reviewCount} customer reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
              <span style={{ fontSize: "2rem", fontWeight: 900, color: "var(--text-main)" }}>
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span style={{ fontSize: "1.1rem", color: "var(--text-muted)", textDecoration: "line-through" }}>
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="badge badge-emerald" style={{ background: "rgba(16, 185, 129, 0.15)", color: "#10b981" }}>
                In Stock & Ready
              </span>
            </div>

            <p style={{ color: "var(--text-secondary)", lineHeight: "1.6", fontSize: "0.95rem" }}>
              {product.description}
            </p>

            <div style={{ height: "1px", background: "var(--border-subtle)" }} />

            {/* Color Selector */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 700 }}>
                  Color: <strong style={{ color: "var(--accent-cyan)" }}>{selectedColor.name}</strong>
                </span>
              </div>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    title={c.name}
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      backgroundColor: c.hex,
                      border:
                        selectedColor.name === c.name
                          ? "3px solid #00f0ff"
                          : "1px solid rgba(255,255,255,0.2)",
                      boxShadow:
                        selectedColor.name === c.name
                          ? "0 0 12px rgba(0, 240, 255, 0.5)"
                          : "none",
                      cursor: "pointer",
                      transition: "all 0.15s"
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector with Size Guide Button */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 700 }}>
                  Size: <strong>{selectedSize}</strong>
                </span>
                <button
                  onClick={() => setSizeChartOpen(true)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "0.8rem",
                    color: "var(--accent-cyan)",
                    fontWeight: 600
                  }}
                >
                  <Ruler size={14} /> Size Chart Guide
                </button>
              </div>

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    style={{
                      minWidth: "48px",
                      padding: "10px 16px",
                      borderRadius: "var(--radius-md)",
                      background:
                        selectedSize === s
                          ? "var(--accent-cyan)"
                          : "rgba(255, 255, 255, 0.05)",
                      color: selectedSize === s ? "#000000" : "#ffffff",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      border:
                        selectedSize === s
                          ? "none"
                          : "1px solid var(--border-subtle)",
                      transition: "all 0.15s"
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "10px" }}>
              {/* CUSTOMIZE STUDIO BUTTON (Featured) */}
              <Link
                href={`/customize?product=${product.id}`}
                className="btn-primary"
                style={{
                  padding: "16px",
                  fontSize: "1.05rem",
                  borderRadius: "var(--radius-lg)"
                }}
              >
                <Sparkles size={20} />
                <span>Customize This Shirt in Canvas Studio</span>
              </Link>

              {/* BUY PLANK BUTTON */}
              <button
                onClick={handleAddPlainToBag}
                className="btn-secondary"
                style={{
                  padding: "14px",
                  fontSize: "0.95rem",
                  borderRadius: "var(--radius-lg)"
                }}
              >
                <ShoppingBag size={18} />
                <span>Add Plain Blank to Bag (${product.price.toFixed(2)})</span>
              </button>
            </div>

            {/* Value Guarantees */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
                padding: "16px",
                background: "rgba(255, 255, 255, 0.03)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-subtle)",
                fontSize: "0.8rem",
                color: "var(--text-secondary)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Truck size={16} color="var(--accent-cyan)" />
                <span>Free shipping over $60</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <ShieldCheck size={16} color="#10b981" />
                <span>50+ wash durability test</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Sparkles size={16} color="var(--accent-purple)" />
                <span>UltraHD DTG 1200 DPI</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <RotateCcw size={16} color="var(--accent-amber)" />
                <span>30-Day satisfaction guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <div style={{ marginTop: "70px" }}>
          <div
            style={{
              display: "flex",
              gap: "24px",
              borderBottom: "1px solid var(--border-subtle)",
              marginBottom: "30px"
            }}
          >
            {[
              { id: "specs", label: "Garment Specifications" },
              { id: "reviews", label: `Reviews (${product.reviewCount})` },
              { id: "care", label: "Care & Print Longevity" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: "12px 4px",
                  fontSize: "1rem",
                  fontWeight: activeTab === tab.id ? 700 : 500,
                  color: activeTab === tab.id ? "var(--accent-cyan)" : "var(--text-secondary)",
                  borderBottom: activeTab === tab.id ? "2px solid var(--accent-cyan)" : "none",
                  marginBottom: "-1px"
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "specs" && (
            <div
              className="glow-card"
              style={{
                padding: "32px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "24px"
              }}
            >
              <div>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>FABRIC COMPOSITION</span>
                <div style={{ fontSize: "1.05rem", fontWeight: 700, marginTop: "4px" }}>{product.specs.fabric}</div>
              </div>
              <div>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>GARMENT WEIGHT</span>
                <div style={{ fontSize: "1.05rem", fontWeight: 700, marginTop: "4px" }}>{product.specs.weight}</div>
              </div>
              <div>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>FIT PROFILE</span>
                <div style={{ fontSize: "1.05rem", fontWeight: 700, marginTop: "4px" }}>{product.specs.fit}</div>
              </div>
              <div>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>MAX PRINT AREA</span>
                <div style={{ fontSize: "1.05rem", fontWeight: 700, marginTop: "4px" }}>{product.specs.printArea}</div>
              </div>
            </div>
          )}

          {activeTab === "care" && (
            <div className="glow-card" style={{ padding: "32px", maxWidth: "700px" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "12px" }}>
                Keep Your Custom Print Brand New
              </h3>
              <ul style={{ listStyle: "disc", paddingLeft: "20px", color: "var(--text-secondary)", lineHeight: "1.8" }}>
                <li>Turn the t-shirt inside out before placing it in the washing machine.</li>
                <li>Wash with cold water (30°C / 86°F max) with mild detergent.</li>
                <li>Avoid fabric softeners or bleach, as they can degrade water-based DTG inks.</li>
                <li>Hang dry or tumble dry on low delicate heat.</li>
                <li>Do NOT iron directly over printed graphics; iron on reverse side.</li>
              </ul>
            </div>
          )}

          {activeTab === "reviews" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                {
                  author: "Marcus Vance",
                  rating: 5,
                  date: "2 days ago",
                  comment:
                    "The heavyweight fabric drape is insane. Feels like luxury high-street streetwear. I customized with a huge back graphic in their canvas studio and the colors are vibrant!"
                },
                {
                  author: "Sarah K.",
                  rating: 5,
                  date: "1 week ago",
                  comment:
                    "DTG print quality is razor sharp. Washed it 3 times already and zero fading or cracking. 10/10 recommend."
                },
                {
                  author: "Devon Reed",
                  rating: 4.8,
                  date: "2 weeks ago",
                  comment:
                    "The collar ribbing is super thick and sturdy. Fits true to boxy oversized styling. Shipping was fast too."
                }
              ].map((rev, i) => (
                <div
                  key={i}
                  className="glow-card"
                  style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "8px" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>{rev.author}</span>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{rev.date}</span>
                  </div>
                  <div style={{ display: "flex", gap: "2px" }}>
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} size={14} fill="#f59e0b" color="#f59e0b" />
                    ))}
                  </div>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: "1.5" }}>
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sizing Chart Modal */}
      {sizeChartOpen && (
        <div className="modal-backdrop" onClick={() => setSizeChartOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "560px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800 }}>Standard Size Chart (Inches)</h3>
              <button onClick={() => setSizeChartOpen(false)} style={{ color: "var(--text-muted)" }}>
                <X size={20} />
              </button>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-highlight)", color: "var(--accent-cyan)" }}>
                  <th style={{ padding: "10px 8px" }}>Size</th>
                  <th style={{ padding: "10px 8px" }}>Chest (in)</th>
                  <th style={{ padding: "10px 8px" }}>Length (in)</th>
                  <th style={{ padding: "10px 8px" }}>Sleeve (in)</th>
                </tr>
              </thead>
              <tbody style={{ color: "var(--text-secondary)" }}>
                {[
                  { s: "S", c: "38 - 40", l: "28.0", sl: "8.5" },
                  { s: "M", c: "41 - 43", l: "29.5", sl: "9.0" },
                  { s: "L", c: "44 - 46", l: "31.0", sl: "9.5" },
                  { s: "XL", c: "47 - 49", l: "32.0", sl: "10.0" },
                  { s: "2XL", c: "50 - 52", l: "33.0", sl: "10.5" },
                  { s: "3XL", c: "53 - 55", l: "34.0", sl: "11.0" }
                ].map((row) => (
                  <tr key={row.s} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                    <td style={{ padding: "10px 8px", fontWeight: 700, color: "#fff" }}>{row.s}</td>
                    <td style={{ padding: "10px 8px" }}>{row.c}</td>
                    <td style={{ padding: "10px 8px" }}>{row.l}</td>
                    <td style={{ padding: "10px 8px" }}>{row.sl}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 860px) {
          .product-detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
