"use client";

import React from "react";

/**
 * High-fidelity realistic T-Shirt SVG Mockup component.
 * Supports Front and Back views, realistic shading overlay, ribbing collar, and dynamic fabric color.
 */
export default function TShirtMockup({
  view = "front", // 'front' | 'back'
  color = "#121214", // fabric hex
  children
}) {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", userSelect: "none" }}>
      <svg
        viewBox="0 0 600 700"
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.5))"
        }}
      >
        <defs>
          {/* Subtle realistic lighting gradient */}
          <radialGradient id="shirtLighting" cx="50%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.12" />
            <stop offset="60%" stopColor="#000000" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.45" />
          </radialGradient>

          {/* Fabric wrinkle and fold linear gradient */}
          <linearGradient id="wrinkleShading" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.3" />
            <stop offset="8%" stopColor="#000000" stopOpacity="0.05" />
            <stop offset="25%" stopColor="#ffffff" stopOpacity="0.08" />
            <stop offset="50%" stopColor="#000000" stopOpacity="0.0" />
            <stop offset="75%" stopColor="#ffffff" stopOpacity="0.08" />
            <stop offset="92%" stopColor="#000000" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.3" />
          </linearGradient>

          {/* Underarm and sleeve depth shadow */}
          <linearGradient id="sleeveShadowL" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id="sleeveShadowR" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.35" />
          </linearGradient>
        </defs>

        {view === "front" ? (
          /* FRONT VIEW T-SHIRT */
          <g id="tshirt-front">
            {/* Base T-Shirt Body & Sleeves */}
            <path
              d="M 215,80 
                 C 250,98 350,98 385,80 
                 L 510,145 
                 C 525,152 535,168 530,185 
                 L 475,280 
                 C 470,290 458,295 448,290 
                 L 420,270 
                 L 435,630 
                 C 435,645 425,655 410,655 
                 L 190,655 
                 C 175,655 165,645 165,630 
                 L 180,270 
                 L 152,290 
                 C 142,295 130,290 125,280 
                 L 70,185 
                 C 65,168 75,152 90,145 
                 Z"
              fill={color}
              stroke="rgba(0,0,0,0.25)"
              strokeWidth="1.5"
            />

            {/* Natural Lighting & Fold Overlays */}
            <path
              d="M 215,80 C 250,98 350,98 385,80 L 510,145 C 525,152 535,168 530,185 L 475,280 C 470,290 458,295 448,290 L 420,270 L 435,630 C 435,645 425,655 410,655 L 190,655 C 175,655 165,645 165,630 L 180,270 L 152,290 C 142,295 130,290 125,280 L 70,185 C 65,168 75,152 90,145 Z"
              fill="url(#shirtLighting)"
              style={{ mixBlendMode: "overlay" }}
            />
            <path
              d="M 180,270 L 420,270 L 435,630 L 165,630 Z"
              fill="url(#wrinkleShading)"
              style={{ mixBlendMode: "multiply" }}
            />

            {/* Left and Right Underarm Creases */}
            <path
              d="M 180,270 C 190,295 185,340 180,380"
              fill="none"
              stroke="rgba(0,0,0,0.2)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M 420,270 C 410,295 415,340 420,380"
              fill="none"
              stroke="rgba(0,0,0,0.2)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Sleeve Hem Seams */}
            <path
              d="M 125,280 L 175,248"
              fill="none"
              stroke="rgba(0,0,0,0.25)"
              strokeWidth="1.5"
              strokeDasharray="4,2"
            />
            <path
              d="M 475,280 L 425,248"
              fill="none"
              stroke="rgba(0,0,0,0.25)"
              strokeWidth="1.5"
              strokeDasharray="4,2"
            />

            {/* Bottom Hem Seam */}
            <path
              d="M 166,635 L 434,635"
              fill="none"
              stroke="rgba(0,0,0,0.25)"
              strokeWidth="1.5"
              strokeDasharray="4,2"
            />

            {/* Collar (Front Curved Neckline & Ribbed Collar) */}
            <path
              d="M 215,80 C 250,135 350,135 385,80 C 355,108 245,108 215,80 Z"
              fill="rgba(0,0,0,0.22)"
            />
            <path
              d="M 215,80 C 255,138 345,138 385,80 C 352,118 248,118 215,80 Z"
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1.5"
            />
            {/* Subtle inner neck shadow */}
            <path
              d="M 225,83 C 265,115 335,115 375,83 C 350,72 250,72 225,83 Z"
              fill="rgba(0,0,0,0.4)"
            />
            {/* Subtle Brand Tag inside Collar */}
            <rect
              x="285"
              y="77"
              width="30"
              height="18"
              rx="2"
              fill="#ffffff"
              opacity="0.85"
            />
            <text
              x="300"
              y="89"
              fontSize="6"
              fontWeight="900"
              textAnchor="middle"
              fill="#121214"
              fontFamily="sans-serif"
            >
              T-FLEX
            </text>
          </g>
        ) : (
          /* BACK VIEW T-SHIRT */
          <g id="tshirt-back">
            {/* Base T-Shirt Body & Sleeves (Back View) */}
            <path
              d="M 215,80 
                 C 255,72 345,72 385,80 
                 L 510,145 
                 C 525,152 535,168 530,185 
                 L 475,280 
                 C 470,290 458,295 448,290 
                 L 420,270 
                 L 435,630 
                 C 435,645 425,655 410,655 
                 L 190,655 
                 C 175,655 165,645 165,630 
                 L 180,270 
                 L 152,290 
                 C 142,295 130,290 125,280 
                 L 70,185 
                 C 65,168 75,152 90,145 
                 Z"
              fill={color}
              stroke="rgba(0,0,0,0.25)"
              strokeWidth="1.5"
            />

            {/* Natural Lighting & Fold Overlays */}
            <path
              d="M 215,80 C 255,72 345,72 385,80 L 510,145 C 525,152 535,168 530,185 L 475,280 C 470,290 458,295 448,290 L 420,270 L 435,630 C 435,645 425,655 410,655 L 190,655 C 175,655 165,645 165,630 L 180,270 L 152,290 C 142,295 130,290 125,280 L 70,185 C 65,168 75,152 90,145 Z"
              fill="url(#shirtLighting)"
              style={{ mixBlendMode: "overlay" }}
            />
            <path
              d="M 180,270 L 420,270 L 435,630 L 165,630 Z"
              fill="url(#wrinkleShading)"
              style={{ mixBlendMode: "multiply" }}
            />

            {/* Back Collar Line (Higher, shallower curve) */}
            <path
              d="M 215,80 C 255,88 345,88 385,80 C 355,74 245,74 215,80 Z"
              fill="rgba(0,0,0,0.25)"
            />
            <path
              d="M 215,80 C 255,88 345,88 385,80"
              fill="none"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="1.5"
            />

            {/* Back shoulder yoke line */}
            <path
              d="M 215,80 C 260,110 340,110 385,80"
              fill="none"
              stroke="rgba(0,0,0,0.15)"
              strokeWidth="1"
              strokeDasharray="4,2"
            />

            {/* Sleeve Hem Seams */}
            <path
              d="M 125,280 L 175,248"
              fill="none"
              stroke="rgba(0,0,0,0.25)"
              strokeWidth="1.5"
              strokeDasharray="4,2"
            />
            <path
              d="M 475,280 L 425,248"
              fill="none"
              stroke="rgba(0,0,0,0.25)"
              strokeWidth="1.5"
              strokeDasharray="4,2"
            />

            {/* Bottom Hem Seam */}
            <path
              d="M 166,635 L 434,635"
              fill="none"
              stroke="rgba(0,0,0,0.25)"
              strokeWidth="1.5"
              strokeDasharray="4,2"
            />
          </g>
        )}
      </svg>

      {/* Children container placed directly over printable chest/back area */}
      <div
        style={{
          position: "absolute",
          top: "22%",
          left: "32.5%",
          width: "35%",
          height: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "auto"
        }}
      >
        {children}
      </div>
    </div>
  );
}
