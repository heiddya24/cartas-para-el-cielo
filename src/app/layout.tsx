import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cartas para el Cielo — Un espacio para despedirse con amor",
  description:
    "Escribe una carta pública para alguien que ya no está. Un espacio gratuito de duelo, amor y consuelo para las víctimas del terremoto de Venezuela y todos los que perdieron un ser querido.",
  openGraph: {
    title: "Cartas para el Cielo",
    description: "Un espacio para despedirse con amor.",
    url: "https://cartasparaelcielo.com",
    siteName: "Cartas para el Cielo",
    locale: "es_VE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
