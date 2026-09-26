"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";
import {
  ShoppingBag,
  User,
  Sparkles,
  LogOut,
  Menu,
  X,
  Layers,
  Shirt,
  Sun,
  Moon
} from "lucide-react";

export default function Navbar({ onOpenAuthModal }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { totalItemsCount, setIsCartOpen } = useCart();
  const { theme, toggleTheme, mounted } = useTheme();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { label: "Catalog", href: "/store" },
    { label: "Custom Studio", href: "/customize", highlight: true },
    { label: "Print Quality", href: "/about" }
  ];

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "var(--bg-glass)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border-subtle)",
        transition: "background 0.25s ease, border-color 0.25s ease"
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "76px"
        }}
      >
        {/* Brand Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none"
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              background: "var(--gradient-brand)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)"
            }}
          >
            <Shirt size={22} color="#ffffff" />
          </div>
          <div>
            <span
              style={{
                fontSize: "1.3rem",
                fontWeight: 900,
                letterSpacing: "-0.5px",
                fontFamily: "var(--font-display)",
                color: "var(--text-main)"
              }}
            >
              T-FLEX
            </span>
            <span
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "2.5px",
                color: "var(--accent-cyan)",
                display: "block",
                lineHeight: "1"
              }}
            >
              FASHION & PRINTS
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: "none",
            gap: "32px",
            alignItems: "center"
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: "0.92rem",
                  fontWeight: 600,
                  color: isActive
                    ? "var(--accent-cyan)"
                    : link.highlight
                    ? "var(--text-main)"
                    : "var(--text-secondary)",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "color 0.2s"
                }}
              >
                {link.highlight && (
                  <Sparkles size={14} color="var(--accent-cyan)" />
                )}
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Section: Theme Toggle, Auth & Cart */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Theme Toggle (Light / Dark) */}
          <button
            onClick={toggleTheme}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              borderRadius: "var(--radius-full)",
              background: "var(--bg-tertiary)",
              border: "1px solid var(--border-subtle)",
              color: "var(--text-main)",
              transition: "all 0.2s ease"
            }}
            title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            aria-label="Toggle theme"
          >
            {mounted && theme === "dark" ? (
              <Sun size={18} color="#f59e0b" />
            ) : (
              <Moon size={18} color="var(--text-main)" />
            )}
          </button>

          {/* Studio Quick CTA */}
          <Link
            href="/customize"
            className="btn-primary"
            style={{
              padding: "8px 18px",
              fontSize: "0.85rem",
              display: "none"
            }}
            id="nav-customize-btn"
          >
            <Sparkles size={15} />
            <span>Customize Now</span>
          </Link>

          {/* User Account / Auth Dropdown */}
          {user ? (
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 12px",
                  borderRadius: "var(--radius-full)",
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border-subtle)",
                  color: "var(--text-main)",
                  fontSize: "0.85rem",
                  fontWeight: 600
                }}
              >
                <div
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    background: "var(--gradient-brand)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    color: "#fff"
                  }}
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Avatar"
                      style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                    />
                  ) : (
                    (user.displayName || user.email || "U")[0].toUpperCase()
                  )}
                </div>
                <span style={{ maxWidth: "100px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {user.displayName || user.email?.split("@")[0]}
                </span>
              </button>

              {userDropdownOpen && (
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "48px",
                    width: "220px",
                    background: "var(--bg-secondary)",
                    border: "1px solid var(--border-highlight)",
                    borderRadius: "var(--radius-md)",
                    padding: "8px",
                    boxShadow: "var(--shadow-elevated)",
                    zIndex: 100
                  }}
                >
                  <div
                    style={{
                      padding: "8px 12px",
                      borderBottom: "1px solid var(--border-subtle)",
                      marginBottom: "6px"
                    }}
                  >
                    <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-main)" }}>
                      {user.displayName || "Customer"}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {user.email}
                    </div>
                  </div>

                  <Link
                    href="/profile"
                    onClick={() => setUserDropdownOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "8px 12px",
                      borderRadius: "var(--radius-sm)",
                      fontSize: "0.85rem",
                      color: "var(--text-main)",
                      transition: "background 0.2s"
                    }}
                  >
                    <User size={15} /> My Profile & Orders
                  </Link>

                  <Link
                    href="/profile#designs"
                    onClick={() => setUserDropdownOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "8px 12px",
                      borderRadius: "var(--radius-sm)",
                      fontSize: "0.85rem",
                      color: "var(--text-main)"
                    }}
                  >
                    <Layers size={15} /> Saved Designs
                  </Link>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      logout();
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      width: "100%",
                      padding: "8px 12px",
                      borderRadius: "var(--radius-sm)",
                      fontSize: "0.85rem",
                      color: "var(--accent-magenta)",
                      textAlign: "left"
                    }}
                  >
                    <LogOut size={15} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="btn-secondary"
              style={{
                padding: "8px 16px",
                fontSize: "0.85rem"
              }}
            >
              <User size={15} />
              <span>Sign In</span>
            </button>
          )}

          {/* Cart Trigger Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "42px",
              height: "42px",
              borderRadius: "var(--radius-full)",
              background: "var(--bg-tertiary)",
              border: "1px solid var(--border-subtle)",
              color: "var(--text-main)",
              transition: "all 0.2s"
            }}
            title="Open Cart"
          >
            <ShoppingBag size={19} />
            {totalItemsCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-4px",
                  right: "-4px",
                  background: "var(--accent-magenta)",
                  color: "#ffffff",
                  fontSize: "0.7rem",
                  fontWeight: 900,
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 10px rgba(225, 29, 72, 0.5)"
                }}
              >
                {totalItemsCount}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--text-main)"
            }}
            className="mobile-toggle"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            background: "var(--bg-secondary)",
            borderBottom: "1px solid var(--border-subtle)",
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "16px"
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: "1.05rem",
                fontWeight: 600,
                color: pathname === link.href ? "var(--accent-cyan)" : "var(--text-main)"
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/customize"
            onClick={() => setMobileMenuOpen(false)}
            className="btn-primary"
            style={{ width: "100%", padding: "12px", textAlign: "center" }}
          >
            <Sparkles size={16} /> Open Customizer Studio
          </Link>
        </div>
      )}

      <style jsx>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          #nav-customize-btn {
            display: inline-flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
