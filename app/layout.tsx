import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Piscilago 2.0 · Experiencia Inteligente",
  description:
    "Evolución de la app oficial de Piscilago Colsubsidio con gestión inteligente de filas, recompensas por movilidad y mapa en tiempo real",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#003478",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
