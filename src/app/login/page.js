"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Mail, Lock, User, AlertCircle, Sparkles, Check, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { signInWithEmail, signUpWithEmail, signInWithGoogle, resetPassword } = useAuth();

  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    try {
      if (mode === "signin") {
        await signInWithEmail(email, password);
        router.push("/profile");
      } else if (mode === "signup") {
        if (!name.trim()) throw new Error("Please enter your full name.");
        await signUpWithEmail(email, password, name.trim());
        router.push("/profile");
      } else if (mode === "forgot") {
        await resetPassword(email);
        setSuccessMsg("Password reset email sent! Check your inbox.");
      }
    } catch (err) {
      console.error("Auth error:", err);
      if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password") {
        setError("Invalid email or password.");
      } else if (err.code === "auth/email-already-in-use") {
        setError("An account with this email already exists.");
      } else {
        setError(err.message || "Failed to authenticate.");
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
      router.push("/profile");
    } catch (err) {
      setError(err.message || "Google sign in failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "85vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 16px"
      }}
    >
      <div
        className="glow-card"
        style={{
          maxWidth: "460px",
          width: "100%",
          padding: "36px 32px"
        }}
      >
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            color: "var(--text-secondary)",
            fontSize: "0.85rem",
            marginBottom: "20px"
          }}
        >
          <ArrowLeft size={16} /> Back to Store
        </Link>

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
              marginBottom: "12px"
            }}
          >
            <Sparkles size={24} color="#ffffff" />
          </div>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 900 }}>
            {mode === "signin"
              ? "Sign In to T-Flex"
              : mode === "signup"
              ? "Create Free Account"
              : "Reset Password"}
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginTop: "4px" }}>
            {mode === "signin"
              ? "Access your saved custom t-shirt mockups & past print orders"
              : "Join our creator community and get 20% off your first tee"}
          </p>
        </div>

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
                fontSize: "0.9rem"
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

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {mode === "signup" && (
            <div>
              <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>
                Full Name
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  required
                  placeholder="Taylor Swift"
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
            <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>
              Email Address
            </label>
            <div style={{ position: "relative" }}>
              <input
                type="email"
                required
                placeholder="name@gmail.com"
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
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                  Password
                </label>
                {mode === "signin" && (
                  <button
                    type="button"
                    onClick={() => setMode("forgot")}
                    style={{ fontSize: "0.75rem", color: "var(--accent-cyan)" }}
                  >
                    Forgot Password?
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
            style={{ width: "100%", padding: "14px", marginTop: "10px" }}
          >
            {loading ? "Processing..." : mode === "signin" ? "Sign In" : mode === "signup" ? "Create Account" : "Send Reset Link"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "24px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
          {mode === "signin" ? (
            <>
              New to T-Flex?{" "}
              <button
                onClick={() => {
                  setMode("signup");
                  setError("");
                }}
                style={{ color: "var(--accent-cyan)", fontWeight: 700 }}
              >
                Create Account
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
