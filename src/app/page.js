"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";
import TShirtMockup from "@/components/TShirtMockup";
import {
  Sparkles,
  ShoppingBag,
  ArrowRight,
  Star,
  CheckCircle,
  Palette,
  Layers,
  Zap,
  Shield,
  Truck,
  RotateCcw,
  Sliders,
  Check
} from "lucide-react";

export default function HomePage() {
  const { addToCart } = useCart();
  const [selectedColors, setSelectedColors] = useState({});
  const [heroShirtColor, setHeroShirtColor] = useState("#121214");
  const [heroShirtView, setHeroShirtView] = useState("front");

  const handleColorChange = (productId, colorHex) => {
    setSelectedColors((prev) => ({ ...prev, [productId]: colorHex }));
  };

  const handleQuickAdd = (product) => {
    const chosenColor =
      product.colors.find((c) => c.hex === selectedColors[product.id]) ||
      product.colors[0];

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      color: chosenColor,
      size: "L",
      image: product.image,
      isCustom: false
    });
  };

  const HERO_SWATCHES = [
    { name: "Obsidian Black", hex: "#121214" },
    { name: "Clean White", hex: "#f8f9fa" },
    { name: "Vintage Charcoal", hex: "#2b2d35" },
    { name: "Deep Forest", hex: "#1a3a2a" },
    { name: "Crimson Red", hex: "#7a1c1d" },
    { name: "Electric Indigo", hex: "#312e81" }
  ];

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* 1. HERO SECTION - 100% Human-Free, Interactive Apparel Showcase */}
      <section
        style={{
          position: "relative",
          padding: "70px 0 90px",
          overflow: "hidden",
          background: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99, 102, 241, 0.12), transparent 70%)"
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.05fr 0.95fr",
              gap: "48px",
              alignItems: "center"
            }}
            className="hero-grid"
          >
            {/* Left Content */}
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 14px",
                  borderRadius: "var(--radius-full)",
                  background: "rgba(2, 132, 199, 0.08)",
                  border: "1px solid rgba(2, 132, 199, 0.2)",
                  color: "var(--accent-cyan)",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  marginBottom: "20px"
                }}
              >
                <Sparkles size={16} />
                <span>Next-Gen Apparel Printing Studio</span>
              </div>

              <h1
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4.1rem)",
                  fontWeight: 900,
                  lineHeight: "1.1",
                  letterSpacing: "-1px",
                  marginBottom: "20px",
                  color: "var(--text-main)"
                }}
              >
                Wear Your <span className="text-gradient">Imagination.</span>
                <br />
                Luxury Custom Prints.
              </h1>

              <p
                style={{
                  fontSize: "1.1rem",
                  lineHeight: "1.6",
                  color: "var(--text-secondary)",
                  marginBottom: "36px",
                  maxWidth: "540px"
                }}
              >
                Design custom graphic tees on our live interactive canvas.
                Printed on heavy 240 GSM combed cotton with Japanese UltraHD
                direct-to-garment pigment technology. No minimum order.
              </p>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "40px" }}>
                <Link
                  href="/customize"
                  className="btn-primary"
                  style={{ padding: "16px 36px", fontSize: "1.05rem" }}
                >
                  <Sparkles size={18} />
                  <span>Launch Custom Studio</span>
                </Link>

                <Link
                  href="/store"
                  className="btn-secondary"
                  style={{ padding: "16px 32px", fontSize: "1.05rem" }}
                >
                  <span>Explore Catalog</span>
                  <ArrowRight size={18} />
                </Link>
              </div>

              {/* Trust Metric Pillars */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "28px",
                  paddingTop: "24px",
                  borderTop: "1px solid var(--border-subtle)",
                  flexWrap: "wrap"
                }}
              >
                <div>
                  <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "var(--text-main)" }}>
                    240+ GSM
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                    Heavyweight Combed Cotton
                  </div>
                </div>

                <div style={{ width: "1px", height: "30px", background: "var(--border-subtle)" }} />

                <div>
                  <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "var(--accent-cyan)" }}>
                    1200 DPI
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                    UltraHD Direct-to-Garment
                  </div>
                </div>

                <div style={{ width: "1px", height: "30px", background: "var(--border-subtle)" }} />

                <div>
                  <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "var(--text-main)" }}>
                    48 Hours
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                    Fast Track Dispatch
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Interactive Product Stage (No Human Photo) */}
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "relative",
                  borderRadius: "var(--radius-xl)",
                  overflow: "hidden",
                  border: "1px solid var(--border-highlight)",
                  boxShadow: "var(--shadow-elevated)",
                  background: "var(--shirt-stage-bg)",
                  aspectRatio: "600 / 680",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "20px"
                }}
              >
                {/* Floating Top Controls: Front/Back view & Fabric Swatches */}
                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    left: "16px",
                    right: "16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    zIndex: 10,
                    background: "var(--bg-glass)",
                    backdropFilter: "blur(12px)",
                    padding: "8px 16px",
                    borderRadius: "var(--radius-full)",
                    border: "1px solid var(--border-subtle)"
                  }}
                >
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button
                      onClick={() => setHeroShirtView("front")}
                      style={{
                        padding: "6px 14px",
                        borderRadius: "var(--radius-full)",
                        background: heroShirtView === "front" ? "var(--gradient-brand)" : "transparent",
                        color: heroShirtView === "front" ? "#fff" : "var(--text-secondary)",
                        fontSize: "0.78rem",
                        fontWeight: 700
                      }}
                    >
                      Front
                    </button>
                    <button
                      onClick={() => setHeroShirtView("back")}
                      style={{
                        padding: "6px 14px",
                        borderRadius: "var(--radius-full)",
                        background: heroShirtView === "back" ? "var(--gradient-brand)" : "transparent",
                        color: heroShirtView === "back" ? "#fff" : "var(--text-secondary)",
                        fontSize: "0.78rem",
                        fontWeight: 700
                      }}
                    >
                      Back
                    </button>
                  </div>

                  {/* Interactive Swatches */}
                  <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                    {HERO_SWATCHES.map((swatch) => (
                      <button
                        key={swatch.hex}
                        onClick={() => setHeroShirtColor(swatch.hex)}
                        title={swatch.name}
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          backgroundColor: swatch.hex,
                          border: heroShirtColor === swatch.hex ? "2px solid #0284c7" : "1px solid rgba(0,0,0,0.2)",
                          boxShadow: heroShirtColor === swatch.hex ? "0 0 8px rgba(2,132,199,0.5)" : "none",
                          transition: "all 0.15s"
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Vector T-Shirt Mockup */}
                <div style={{ width: "95%", height: "95%", position: "relative" }}>
                  <TShirtMockup view={heroShirtView} color={heroShirtColor}>
                    {/* Live Printed Graphic Art Badge on T-shirt */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        userSelect: "none"
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "Impact, Charcoal, sans-serif",
                          fontSize: "2.4rem",
                          letterSpacing: "3px",
                          color: heroShirtColor === "#f8f9fa" ? "#090d16" : "#00f0ff",
                          lineHeight: "1",
                          textShadow: heroShirtColor === "#f8f9fa" ? "none" : "0 0 16px rgba(0, 240, 255, 0.6)"
                        }}
                      >
                        NEO//FUTURE
                      </div>

                      {/* Cool Cyberpunk Emblem Icon */}
                      <svg width="68" height="68" viewBox="0 0 100 100" style={{ margin: "6px 0", color: heroShirtColor === "#f8f9fa" ? "#7c3aed" : "#ff007a" }} fill="currentColor">
                        <polygon points="56,6 18,54 46,54 40,94 82,44 52,44" />
                      </svg>

                      <div
                        style={{
                          fontFamily: "'Bebas Neue', sans-serif",
                          fontSize: "1.1rem",
                          letterSpacing: "4px",
                          color: heroShirtColor === "#f8f9fa" ? "#475569" : "#ffffff",
                          fontWeight: 700
                        }}
                      >
                        LIMITED DROP • EST. 2026
                      </div>
                    </div>
                  </TShirtMockup>
                </div>

                {/* Floating Bottom Card */}
                <div
                  className="glass-panel"
                  style={{
                    position: "absolute",
                    bottom: "16px",
                    left: "16px",
                    right: "16px",
                    padding: "14px 18px",
                    borderRadius: "var(--radius-lg)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    boxShadow: "var(--shadow-subtle)"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "10px",
                        background: "var(--gradient-brand)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff"
                      }}
                    >
                      <Sparkles size={18} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: "0.9rem", color: "var(--text-main)" }}>
                        Interactive 2D Canvas Studio
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "var(--accent-cyan)", fontWeight: 600 }}>
                        Front & Back Multi-Layer Printing
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/customize"
                    className="btn-primary"
                    style={{ padding: "8px 16px", fontSize: "0.8rem" }}
                  >
                    Try In Studio
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED PRODUCTS CATALOG */}
      <section className="section" style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "40px",
              flexWrap: "wrap",
              gap: "20px"
            }}
          >
            <div>
              <span className="badge badge-purple" style={{ marginBottom: "8px" }}>
                Curated Collection
              </span>
              <h2 style={{ fontSize: "2.2rem", fontWeight: 900, color: "var(--text-main)" }}>
                Trending <span className="text-gradient">Apparel Blanks</span>
              </h2>
              <p style={{ color: "var(--text-secondary)", marginTop: "6px" }}>
                Ready to buy as clean luxury essentials or customize with your artwork
              </p>
            </div>

            <Link href="/store" className="btn-secondary">
              <span>View All 12+ Styles</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Product Cards Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px"
            }}
          >
            {PRODUCTS.map((prod) => {
              const activeColor =
                selectedColors[prod.id] || prod.colors[0].hex;

              return (
                <div key={prod.id} className="glow-card" style={{ display: "flex", flexDirection: "column" }}>
                  {/* Clean Garment Mockup Photo (No Humans) */}
                  <div
                    style={{
                      position: "relative",
                      aspectRatio: "1/1",
                      background: "var(--bg-tertiary)",
                      overflow: "hidden"
                    }}
                  >
                    <Link href={`/products/${prod.id}`}>
                      <img
                        src={prod.image}
                        alt={prod.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.4s ease"
                        }}
                        className="product-img"
                      />
                    </Link>

                    {/* Badge */}
                    {prod.badge && (
                      <div
                        style={{
                          position: "absolute",
                          top: "14px",
                          left: "14px",
                          zIndex: 2
                        }}
                      >
                        <span className="badge badge-cyan">{prod.badge}</span>
                      </div>
                    )}

                    {/* Rating badge */}
                    <div
                      style={{
                        position: "absolute",
                        top: "14px",
                        right: "14px",
                        background: "var(--bg-glass)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid var(--border-subtle)",
                        padding: "4px 8px",
                        borderRadius: "var(--radius-full)",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: "var(--text-main)",
                        zIndex: 2
                      }}
                    >
                      <Star size={12} fill="#d97706" color="#d97706" />
                      <span>{prod.rating}</span>
                      <span style={{ color: "var(--text-muted)" }}>({prod.reviewCount})</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <div style={{ fontSize: "0.75rem", color: "var(--accent-cyan)", fontWeight: 700, textTransform: "uppercase" }}>
                      {prod.specs.weight}
                    </div>

                    <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: "6px 0", color: "var(--text-main)" }}>
                      <Link href={`/products/${prod.id}`}>{prod.name}</Link>
                    </h3>

                    <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: "1.5", marginBottom: "16px", flex: 1 }}>
                      {prod.tagline}
                    </p>

                    {/* Color Swatches */}
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                      {prod.colors.map((c) => (
                        <button
                          key={c.name}
                          onClick={() => handleColorChange(prod.id, c.hex)}
                          title={c.name}
                          style={{
                            width: "22px",
                            height: "22px",
                            borderRadius: "50%",
                            backgroundColor: c.hex,
                            border:
                              activeColor === c.hex
                                ? "2px solid #0284c7"
                                : "1px solid rgba(0,0,0,0.15)",
                            cursor: "pointer",
                            transition: "all 0.15s"
                          }}
                        />
                      ))}
                    </div>

                    {/* Price & Actions */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingTop: "14px",
                        borderTop: "1px solid var(--border-subtle)"
                      }}
                    >
                      <div>
                        <div style={{ fontSize: "1.25rem", fontWeight: 900, color: "var(--text-main)" }}>
                          ₹{prod.price.toFixed(0)}
                        </div>
                        {prod.originalPrice && (
                          <div
                            style={{
                              fontSize: "0.8rem",
                              color: "var(--text-muted)",
                              textDecoration: "line-through"
                            }}
                          >
                            ₹{prod.originalPrice.toFixed(0)}
                          </div>
                        )}
                      </div>

                      <div style={{ display: "flex", gap: "8px" }}>
                        <Link
                          href={`/customize?product=${prod.id}`}
                          className="btn-primary"
                          style={{ padding: "8px 14px", fontSize: "0.82rem" }}
                          title="Open in Custom Studio"
                        >
                          <Sparkles size={14} />
                          <span>Customize</span>
                        </Link>

                        <button
                          onClick={() => handleQuickAdd(prod)}
                          className="btn-secondary"
                          style={{ padding: "8px 12px" }}
                          title="Add plain tee to bag"
                        >
                          <ShoppingBag size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. HOW THE CUSTOM STUDIO WORKS */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 60px" }}>
            <span className="badge badge-cyan" style={{ marginBottom: "10px" }}>
              Effortless Customization
            </span>
            <h2 style={{ fontSize: "2.4rem", fontWeight: 900, color: "var(--text-main)" }}>
              How T-Flex Custom Printing Works
            </h2>
            <p style={{ color: "var(--text-secondary)", marginTop: "10px", fontSize: "1.05rem" }}>
              From your mind to your closet in 3 simple steps. No minimum quantity required.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "32px"
            }}
          >
            {/* Step 1 */}
            <div
              className="glow-card"
              style={{
                padding: "36px 28px",
                display: "flex",
                flexDirection: "column",
                gap: "16px"
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "16px",
                  background: "rgba(2, 132, 199, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--accent-cyan)",
                  fontSize: "1.3rem",
                  fontWeight: 900
                }}
              >
                01
              </div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-main)" }}>
                Choose Your Canvas
              </h3>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.6", fontSize: "0.95rem" }}>
                Select from our premium 240 GSM boxy oversized tees, classic ring-spun combed
                cottons, vintage acid wash blends, or heavyweight French Terry hoodies.
              </p>
            </div>

            {/* Step 2 */}
            <div
              className="glow-card"
              style={{
                padding: "36px 28px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                borderColor: "rgba(99, 102, 241, 0.3)"
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "16px",
                  background: "var(--gradient-brand)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontSize: "1.3rem",
                  fontWeight: 900
                }}
              >
                02
              </div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-main)" }}>
                Create on Live Canvas
              </h3>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.6", fontSize: "0.95rem" }}>
                Type slogans with curated typography, curve text, pick vibrant hues, drop streetwear
                graphics, or upload your own high-res PNG and vector logos.
              </p>
            </div>

            {/* Step 3 */}
            <div
              className="glow-card"
              style={{
                padding: "36px 28px",
                display: "flex",
                flexDirection: "column",
                gap: "16px"
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "16px",
                  background: "rgba(124, 58, 237, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--accent-purple)",
                  fontSize: "1.3rem",
                  fontWeight: 900
                }}
              >
                03
              </div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-main)" }}>
                UltraHD Print & Ship
              </h3>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.6", fontSize: "0.95rem" }}>
                Our industrial Kornit DTG printers infuse pigment directly into cotton fibers.
                Cured at 320°F for extreme wash-durability and delivered right to your door.
              </p>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <Link
              href="/customize"
              className="btn-primary"
              style={{ padding: "16px 40px", fontSize: "1.1rem" }}
            >
              <Sparkles size={20} />
              <span>Open Customizer Studio</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. READY TO CREATE BANNER */}
      <section
        style={{
          padding: "80px 0",
          background: "linear-gradient(135deg, rgba(2, 132, 199, 0.08) 0%, rgba(99, 102, 241, 0.08) 100%)",
          borderTop: "1px solid var(--border-subtle)",
          borderBottom: "1px solid var(--border-subtle)"
        }}
      >
        <div className="container" style={{ textAlign: "center", maxWidth: "700px" }}>
          <h2 style={{ fontSize: "2.6rem", fontWeight: 900, marginBottom: "16px", color: "var(--text-main)" }}>
            Ready to Print Your <span className="text-gradient">Masterpiece?</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", marginBottom: "32px", lineHeight: "1.6" }}>
            Whether it's 1 custom shirt for your streetwear drop or 500 tees for your brand,
            T-Flex delivers unmatched color depth, premium fabrics, and rapid turnaround.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
            <Link href="/customize" className="btn-primary" style={{ padding: "16px 36px", fontSize: "1.05rem" }}>
              <Sparkles size={18} />
              <span>Design Your T-Shirt</span>
            </Link>
            <Link href="/store" className="btn-secondary" style={{ padding: "16px 32px", fontSize: "1.05rem" }}>
              <span>Shop All Apparel</span>
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
        .glow-card:hover .product-img {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
