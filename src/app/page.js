"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";
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
  Eye,
  Sliders
} from "lucide-react";

export default function HomePage() {
  const { addToCart } = useCart();
  const [selectedColors, setSelectedColors] = useState({});

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

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* 1. HERO SECTION */}
      <section
        style={{
          position: "relative",
          padding: "80px 0 100px",
          overflow: "hidden",
          background: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 240, 255, 0.15), transparent 70%)"
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 0.9fr",
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
                  background: "rgba(0, 240, 255, 0.1)",
                  border: "1px solid rgba(0, 240, 255, 0.25)",
                  color: "var(--accent-cyan)",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  marginBottom: "20px"
                }}
              >
                <Sparkles size={16} />
                <span>UltraHD Custom Apparel Studio</span>
              </div>

              <h1
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  fontWeight: 900,
                  lineHeight: "1.1",
                  letterSpacing: "-1px",
                  marginBottom: "20px"
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
                Bring your creative ideas to life on our interactive canvas studio.
                Printed on heavy 240 GSM combed cotton using Japanese UltraHD DTG pigment
                technology with razor-sharp 1200 DPI details.
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

              {/* Key Trust Badges */}
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

            {/* Right Hero Visual Showcase */}
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "relative",
                  borderRadius: "var(--radius-xl)",
                  overflow: "hidden",
                  border: "1px solid var(--border-highlight)",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
                  aspectRatio: "16/11",
                  background: "#12141d"
                }}
              >
                <img
                  src="/images/hero.jpg"
                  alt="Streetwear model in custom printed t-shirt"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block"
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(10, 11, 16, 0.8) 0%, transparent 60%)"
                  }}
                />

                {/* Floating Interactive Badge */}
                <div
                  className="glass-panel"
                  style={{
                    position: "absolute",
                    bottom: "20px",
                    left: "20px",
                    right: "20px",
                    padding: "16px 20px",
                    borderRadius: "var(--radius-lg)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        background: "var(--gradient-brand)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Sparkles size={20} color="#fff" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: "0.95rem" }}>
                        Live Canvas Studio
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "var(--accent-cyan)" }}>
                        Front & Back Multi-Layer Printing
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/customize"
                    className="btn-primary"
                    style={{ padding: "8px 18px", fontSize: "0.85rem" }}
                  >
                    Try It Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED PRODUCTS CATALOG */}
      <section className="section" style={{ background: "var(--bg-secondary)" }}>
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
              <h2 style={{ fontSize: "2.2rem", fontWeight: 900 }}>
                Trending <span className="text-gradient">Apparel Blanks</span>
              </h2>
              <p style={{ color: "var(--text-secondary)", marginTop: "6px" }}>
                Ready to buy as clean essentials or customize with your artwork
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
                  {/* Image container */}
                  <div
                    style={{
                      position: "relative",
                      aspectRatio: "1/1",
                      background: "#12141e",
                      overflow: "hidden"
                    }}
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.5s ease"
                      }}
                      className="product-img"
                    />

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
                        background: "rgba(0, 0, 0, 0.7)",
                        backdropFilter: "blur(6px)",
                        padding: "4px 8px",
                        borderRadius: "var(--radius-full)",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        zIndex: 2
                      }}
                    >
                      <Star size={12} fill="#f59e0b" color="#f59e0b" />
                      <span>{prod.rating}</span>
                      <span style={{ color: "var(--text-muted)" }}>({prod.reviewCount})</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <div style={{ fontSize: "0.75rem", color: "var(--accent-cyan)", fontWeight: 700, textTransform: "uppercase" }}>
                      {prod.specs.weight}
                    </div>

                    <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: "6px 0" }}>
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
                                ? "2px solid #00f0ff"
                                : "1px solid rgba(255,255,255,0.2)",
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
                        <div style={{ fontSize: "1.25rem", fontWeight: 900 }}>
                          ${prod.price.toFixed(2)}
                        </div>
                        {prod.originalPrice && (
                          <div
                            style={{
                              fontSize: "0.8rem",
                              color: "var(--text-muted)",
                              textDecoration: "line-through"
                            }}
                          >
                            ${prod.originalPrice.toFixed(2)}
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
            <h2 style={{ fontSize: "2.4rem", fontWeight: 900 }}>
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
                  background: "rgba(0, 240, 255, 0.12)",
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
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800 }}>Choose Your Canvas</h3>
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
                borderColor: "rgba(0, 240, 255, 0.3)"
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
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800 }}>Create on Live Canvas</h3>
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
                  background: "rgba(157, 78, 221, 0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#c77dff",
                  fontSize: "1.3rem",
                  fontWeight: 900
                }}
              >
                03
              </div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800 }}>UltraHD Print & Ship</h3>
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

      {/* 4. CALL TO ACTION BANNER */}
      <section
        style={{
          padding: "80px 0",
          background: "linear-gradient(135deg, rgba(0, 240, 255, 0.1) 0%, rgba(157, 78, 221, 0.15) 100%)",
          borderTop: "1px solid var(--border-subtle)",
          borderBottom: "1px solid var(--border-subtle)"
        }}
      >
        <div className="container" style={{ textAlign: "center", maxWidth: "700px" }}>
          <h2 style={{ fontSize: "2.6rem", fontWeight: 900, marginBottom: "16px" }}>
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
