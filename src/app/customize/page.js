import React, { Suspense } from "react";
import CustomizeClient from "./CustomizeClient";

export const metadata = {
  title: "Interactive T-Shirt Customizer Studio | T-Flex Fashion",
  description:
    "Design your custom t-shirt online with live canvas tools. Add custom text, street graphics, upload logos, customize colors, and preview high-res DTG prints."
};

export default function CustomizePage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ color: "var(--accent-cyan)", fontSize: "1.1rem", fontWeight: 700 }}>
            Loading Customizer Studio...
          </div>
        </div>
      }
    >
      <CustomizeClient />
    </Suspense>
  );
}
