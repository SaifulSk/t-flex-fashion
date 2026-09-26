import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ShieldCheck,
  Droplet,
  Sun,
  Flame,
  Shirt,
  CheckCircle,
  Clock,
  ArrowRight
} from "lucide-react";

export const metadata = {
  title: "Print Technology & Quality Standards | T-Flex Fashion",
  description:
    "Discover our UltraHD 1200 DPI Direct-to-Garment printing technology, organic combed ring-spun cottons, and OEKO-TEX eco-friendly inks."
};

export default function AboutPage() {
  return (
    <div style={{ minHeight: "100vh", padding: "60px 0 100px" }}>
      <div className="container" style={{ maxWidth: "1000px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <span className="badge badge-cyan" style={{ marginBottom: "12px" }}>
            Uncompromising Craftsmanship
          </span>
          <h1 style={{ fontSize: "2.8rem", fontWeight: 900, lineHeight: "1.2" }}>
            The Science of <span className="text-gradient">UltraHD Printing</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", marginTop: "12px", maxWidth: "680px", margin: "12px auto 0" }}>
            Why our custom prints feel soft to the touch, survive 50+ machine washes, and maintain
            hallmark gallery-grade color fidelity.
          </p>
        </div>

        {/* 3 Pillars */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "28px",
            marginBottom: "70px"
          }}
        >
          <div className="glow-card" style={{ padding: "32px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background: "rgba(0, 240, 255, 0.12)",
                color: "var(--accent-cyan)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px"
              }}
            >
              <Droplet size={24} />
            </div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "10px" }}>
              1200 DPI DTG Precision
            </h3>
            <p style={{ color: "var(--text-secondary)", lineHeight: "1.6", fontSize: "0.92rem" }}>
              Our industrial Kornit Avalanche printers utilize specialized microscopic ink nozzles
              that fire 1200 dots per inch. Fine lines, gradients, and micro-text render with
              photo-level clarity.
            </p>
          </div>

          <div className="glow-card" style={{ padding: "32px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background: "rgba(157, 78, 221, 0.12)",
                color: "#c77dff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px"
              }}
            >
              <Shirt size={24} />
            </div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "10px" }}>
              240 GSM Combed Cotton
            </h3>
            <p style={{ color: "var(--text-secondary)", lineHeight: "1.6", fontSize: "0.92rem" }}>
              Unlike cheap carded cotton that pills and distorts, our ring-spun long-staple cotton is
              bio-washed and pre-shrunk. The dense knit surface prevents ink feathering.
            </p>
          </div>

          <div className="glow-card" style={{ padding: "32px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background: "rgba(16, 185, 129, 0.12)",
                color: "#10b981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px"
              }}
            >
              <ShieldCheck size={24} />
            </div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "10px" }}>
              Eco-Friendly OEKO-TEX
            </h3>
            <p style={{ color: "var(--text-secondary)", lineHeight: "1.6", fontSize: "0.92rem" }}>
              100% toxin-free, vegan water-based Japanese pigment inks. Completely safe for sensitive
              skin, infant wear, and zero toxic chemical runoff into water systems.
            </p>
          </div>
        </div>

        {/* DTG vs Traditional Screen Print Comparison */}
        <div
          className="glow-card"
          style={{ padding: "40px", marginBottom: "70px", overflowX: "auto" }}
        >
          <h2 style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: "8px" }}>
            How T-Flex DTG Compares to Standard Screen Printing
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "24px" }}>
            Clear breakdown of why direct-to-garment digital printing is superior for modern streetwear designs.
          </p>

          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-highlight)", color: "var(--text-main)" }}>
                <th style={{ padding: "14px 10px" }}>Feature</th>
                <th style={{ padding: "14px 10px", color: "var(--accent-cyan)" }}>T-Flex UltraHD DTG</th>
                <th style={{ padding: "14px 10px", color: "var(--text-muted)" }}>Traditional Screen Print</th>
              </tr>
            </thead>
            <tbody style={{ color: "var(--text-secondary)" }}>
              <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                <td style={{ padding: "14px 10px", fontWeight: 700, color: "#fff" }}>Minimum Order Qty</td>
                <td style={{ padding: "14px 10px", color: "var(--accent-cyan)", fontWeight: 700 }}>1 Shirt (No Min)</td>
                <td style={{ padding: "14px 10px" }}>25 - 50 shirts minimum</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                <td style={{ padding: "14px 10px", fontWeight: 700, color: "#fff" }}>Color Count Limit</td>
                <td style={{ padding: "14px 10px", color: "var(--accent-cyan)", fontWeight: 700 }}>Unlimited full colors & gradients</td>
                <td style={{ padding: "14px 10px" }}>Max 4-6 flat spot colors</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                <td style={{ padding: "14px 10px", fontWeight: 700, color: "#fff" }}>Hand Feel (Breathability)</td>
                <td style={{ padding: "14px 10px", color: "var(--accent-cyan)", fontWeight: 700 }}>Soft, breathable fiber bond</td>
                <td style={{ padding: "14px 10px" }}>Thick rubbery plastic shield</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                <td style={{ padding: "14px 10px", fontWeight: 700, color: "#fff" }}>Detail Resolution</td>
                <td style={{ padding: "14px 10px", color: "var(--accent-cyan)", fontWeight: 700 }}>1200 DPI Photo Quality</td>
                <td style={{ padding: "14px 10px" }}>150 - 300 DPI halftones</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                <td style={{ padding: "14px 10px", fontWeight: 700, color: "#fff" }}>Turnaround Time</td>
                <td style={{ padding: "14px 10px", color: "var(--accent-cyan)", fontWeight: 700 }}>48 Hours Dispatch</td>
                <td style={{ padding: "14px 10px" }}>10 - 14 business days</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Bulk Inquiry Section */}
        <div
          id="bulk"
          className="glow-card"
          style={{
            padding: "40px",
            background: "linear-gradient(135deg, rgba(0, 240, 255, 0.08) 0%, rgba(157, 78, 221, 0.08) 100%)",
            border: "1px solid var(--border-glow)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "20px"
          }}
        >
          <span className="badge badge-purple">Brand Merch & Bulk Drops</span>
          <h2 style={{ fontSize: "2rem", fontWeight: 900 }}>Printing For Your Own Streetwear Label?</h2>
          <p style={{ color: "var(--text-secondary)", maxWidth: "600px", lineHeight: "1.6" }}>
            We provide wholesale custom neck labels, hang tags, polybag packing, and volume discounts
            up to 40% for clothing brands, creators, and corporate events.
          </p>

          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/customize" className="btn-primary" style={{ padding: "14px 32px" }}>
              <Sparkles size={18} />
              <span>Design a Sample Tee</span>
            </Link>
            <a
              href="mailto:orders@t-flex-fashion.com?subject=Bulk Inquiry"
              className="btn-secondary"
              style={{ padding: "14px 30px" }}
            >
              <span>Contact Wholesale Team</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
