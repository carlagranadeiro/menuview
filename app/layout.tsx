import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "MenuView — Menu Digital para Restaurantes",
  description:
    "Menu digital interativo com fotos reais dos pratos. Ideal para turistas e clientes que não falam a língua local.",
  keywords: ["menu digital", "restaurante", "QR code", "menu interativo", "turismo"],
  authors: [{ name: "MenuView" }],
  openGraph: {
    title: "MenuView",
    description: "Descubra o sabor em cada imagem",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#171717",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" className={inter.variable}>
      <body className="font-sans antialiased bg-surface-950 text-surface-50 min-h-screen">
        {children}
      </body>
    </html>
  );
}
