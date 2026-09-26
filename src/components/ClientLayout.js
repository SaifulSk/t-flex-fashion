"use client";

import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CartDrawer from "./CartDrawer";
import AuthModal from "./AuthModal";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";

export default function ClientLayout({ children }) {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <AuthProvider>
      <CartProvider>
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <Navbar onOpenAuthModal={() => setAuthModalOpen(true)} />
          <main style={{ flex: 1 }}>{children}</main>
          <Footer />
          <CartDrawer />
          <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}
