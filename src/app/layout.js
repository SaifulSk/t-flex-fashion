import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

export const metadata = {
  title: "T-Flex Fashion | Custom T-Shirt Printing Studio & Luxury Streetwear",
  description:
    "Design and print custom t-shirts online. Live interactive canvas customizer, premium 240 GSM combed cotton, UltraHD DTG prints, and instant mockups.",
  keywords: "custom t-shirt, t-shirt printing, custom apparel, canvas customizer, DTG print, streetwear, oversized tee"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
