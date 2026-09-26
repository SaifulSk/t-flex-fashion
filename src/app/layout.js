import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ||
  (process.env.NODE_ENV === "production" ? "/t-flex-fashion" : "");

export const metadata = {
  title: "T-Flex Fashion | Custom T-Shirt Printing Studio & Luxury Streetwear",
  description:
    "Design and print custom t-shirts online. Live interactive canvas customizer, premium 240 GSM combed cotton, UltraHD DTG prints, and instant mockups.",
  keywords: "custom t-shirt, t-shirt printing, custom apparel, canvas customizer, DTG print, streetwear, oversized tee",
  icons: {
    icon: `${basePath}/favicon.ico`
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={`${basePath}/favicon.ico`} />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
