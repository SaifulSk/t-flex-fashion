"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { PRODUCTS, CATEGORIES } from "@/data/products";
import { useCart } from "@/context/CartContext";
import {
  Sparkles,
  ShoppingBag,
  Star,
  Search,
  Filter,
  ArrowUpDown,
  Check
} from "lucide-react";

export default function StorePage() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [selectedColors, setSelectedColors] = useState({});

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // featured default
    });
  }, [selectedCategory, searchQuery, sortBy]);

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
    <div style={{ minHeight: "100vh", padding: "40px 0 80px" }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: "36px" }}>
          <span className="badge badge-cyan" style={{ marginBottom: "8px" }}>
            Premium Blanks & Prints
          </span>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 900 }}>
            Apparel <span className="text-gradient">Catalog</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", marginTop: "6px", maxWidth: "600px" }}>
            Choose from heavy streetwear oversized cuts, classic ring-spun tees, acid-washed vintage
            fabrics, and loopback French Terry hoodies. Ready to wear plain or customize.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 20px",
            background: "var(--bg-glass)",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border-subtle)",
            marginBottom: "36px"
          }}
        >
          {/* Category Chips */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "var(--radius-full)",
                  background:
                    selectedCategory === cat.id
                      ? "var(--gradient-brand)"
                      : "rgba(255, 255, 255, 0.05)",
                  color: selectedCategory === cat.id ? "#ffffff" : "var(--text-secondary)",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  border:
                    selectedCategory === cat.id
                      ? "none"
                      : "1px solid var(--border-subtle)",
                  transition: "all 0.2s"
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search & Sort */}
          <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ position: "relative", minWidth: "220px" }}>
              <input
                type="text"
                placeholder="Search styles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field"
                style={{ padding: "8px 12px 8px 36px", fontSize: "0.85rem" }}
              />
              <Search
                size={16}
                style={{ position: "absolute", left: "12px", top: "11px", color: "var(--text-muted)" }}
              />
            </div>

            <div style={{ position: "relative" }}>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field"
                style={{ padding: "8px 16px", fontSize: "0.85rem", cursor: "pointer" }}
              >
                <option value="featured" style={{ background: "#1a1c26" }}>Featured</option>
                <option value="price-low" style={{ background: "#1a1c26" }}>Price: Low to High</option>
                <option value="price-high" style={{ background: "#1a1c26" }}>Price: High to Low</option>
                <option value="rating" style={{ background: "#1a1c26" }}>Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "80px 20px",
              background: "var(--bg-card)",
              borderRadius: "var(--radius-xl)",
              border: "1px solid var(--border-subtle)"
            }}
          >
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700 }}>No styles found</h3>
            <p style={{ color: "var(--text-secondary)", marginTop: "6px" }}>
              Try adjusting your search query or switching categories.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "28px"
            }}
          >
            {filteredProducts.map((prod) => {
              const activeColor = selectedColors[prod.id] || prod.colors[0].hex;

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
                    <Link href={`/products/${prod.id}`}>
                      <img
                        src={prod.image}
                        alt={prod.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.5s ease"
                        }}
                      />
                    </Link>

                    {prod.badge && (
                      <div style={{ position: "absolute", top: "14px", left: "14px", zIndex: 2 }}>
                        <span className="badge badge-cyan">{prod.badge}</span>
                      </div>
                    )}

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
                          onClick={() =>
                            setSelectedColors((prev) => ({ ...prev, [prod.id]: c.hex }))
                          }
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

                    {/* Price & Action Buttons */}
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
                          ₹{prod.price.toFixed(0)}
                        </div>
                        {prod.originalPrice && (
                          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textDecoration: "line-through" }}>
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
        )}
      </div>
    </div>
  );
}
