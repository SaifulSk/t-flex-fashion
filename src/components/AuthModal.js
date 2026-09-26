"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { X, Mail, Lock, User, AlertCircle, Sparkles, Check } from "lucide-react";

export default function AuthModal({ isOpen, onClose }) {
  const { signInWithEmail, signUpWithEmail, signInWithGoogle, resetPassword } = useAuth();

  const [mode, setMode] = useState("signin"); // 'signin' | 'signup' | 'forgot'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    try {
      if (mode === "signin") {
        await signInWithEmail(email, password);
        onClose();
      } else if (mode === "signup") {
        if (!name.trim()) throw new Error("Please enter your full name.");
        await signUpWithEmail(email, password, name.trim());
        onClose();
      } else if (mode === "forgot") {
        await resetPassword(email);
        setSuccessMsg("Password reset email sent! Check your inbox.");
      }
    } catch (err) {
      console.error("Auth error:", err);
      // Format firebase friendly message
      if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password") {
        setError("Invalid email or password. Please verify and try again.");
      } else if (err.code === "auth/email-already-in-use") {
        setError("An account with this email already exists. Try signing in.");
      } else if (err.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      } else {
        setError(err.message || "Failed to authenticate. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithGoogle();
      onClose();
    } catch (err) {
      console.error("Google sign in error:", err);
      setError(err.message || "Google sign in failed. Please try with email/password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "440px" }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            color: "var(--text-muted)",
            padding: "4px"
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              background: "var(--gradient-brand)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "12px",
              boxShadow: "0 0 20px rgba(0, 240, 255, 0.3)"
            }}
          >
            <Sparkles size={24} color="#ffffff" />
          </div>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 800 }}>
            {mode === "signin"
              ? "Welcome Back"
              : mode === "signup"
              ? "Join T-Flex Fashion"
              : "Reset Password"}
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginTop: "4px" }}>
            {mode === "signin"
              ? "Sign in to access saved custom designs and orders"
              : mode === "signup"
              ? "Create an account for personalized apparel & exclusive perks"
              : "Enter your email to receive recovery instructions"}
          </p>
        </div>

        {/* Google OAuth Quick Button */}
        {mode !== "forgot" && (
          <>
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                padding: "12px",
                borderRadius: "var(--radius-md)",
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid var(--border-subtle)",
                color: "#ffffff",
                fontWeight: 600,
                fontSize: "0.9rem",
                transition: "all 0.2s"
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                margin: "18px 0",
                color: "var(--text-muted)",
                fontSize: "0.75rem"
              }}
            >
              <div style={{ flex: 1, height: "1px", background: "var(--border-subtle)" }} />
              <span>OR WITH EMAIL</span>
              <div style={{ flex: 1, height: "1px", background: "var(--border-subtle)" }} />
            </div>
          </>
        )}

        {/* Error / Success alert */}
        {error && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 14px",
              borderRadius: "var(--radius-md)",
              background: "rgba(255, 0, 122, 0.12)",
              border: "1px solid rgba(255, 0, 122, 0.3)",
              color: "#ff3366",
              fontSize: "0.85rem",
              marginBottom: "16px"
            }}
          >
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 14px",
              borderRadius: "var(--radius-md)",
              background: "rgba(16, 185, 129, 0.12)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              color: "#10b981",
              fontSize: "0.85rem",
              marginBottom: "16px"
            }}
          >
            <Check size={16} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form Fields */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {mode === "signup" && (
            <div>
              <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                Full Name
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  required
                  placeholder="Alex Rivera"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field"
                  style={{ paddingLeft: "40px" }}
                />
                <User size={16} style={{ position: "absolute", left: "14px", top: "14px", color: "var(--text-muted)" }} />
              </div>
            </div>
          )}

          <div>
            <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
              Email Address
            </label>
            <div style={{ position: "relative" }}>
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                style={{ paddingLeft: "40px" }}
              />
              <Mail size={16} style={{ position: "absolute", left: "14px", top: "14px", color: "var(--text-muted)" }} />
            </div>
          </div>

          {mode !== "forgot" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                  Password
                </label>
                {mode === "signin" && (
                  <button
                    type="button"
                    onClick={() => setMode("forgot")}
                    style={{ fontSize: "0.75rem", color: "var(--accent-cyan)" }}
                  >
                    Forgot?
                  </button>
                )}
              </div>
              <div style={{ position: "relative" }}>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  style={{ paddingLeft: "40px" }}
                />
                <Lock size={16} style={{ position: "absolute", left: "14px", top: "14px", color: "var(--text-muted)" }} />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ width: "100%", padding: "13px", marginTop: "8px" }}
          >
            {loading ? "Processing..." : mode === "signin" ? "Sign In" : mode === "signup" ? "Create Free Account" : "Send Reset Link"}
          </button>
        </form>

        {/* Toggle Mode */}
        <div style={{ textAlign: "center", marginTop: "20px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
          {mode === "signin" ? (
            <>
              Don't have an account?{" "}
              <button
                onClick={() => {
                  setMode("signup");
                  setError("");
                }}
                style={{ color: "var(--accent-cyan)", fontWeight: 700 }}
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => {
                  setMode("signin");
                  setError("");
                }}
                style={{ color: "var(--accent-cyan)", fontWeight: 700 }}
              >
                Sign In
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
