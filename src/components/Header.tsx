"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header
      style={{ backgroundColor: "var(--soft-white)" }}
      className="border-b border-rose-100 sticky top-0 z-50 backdrop-blur-sm bg-white/80"
    >
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl">🕊️</span>
          <span
            className="text-xl font-serif font-medium tracking-wide"
            style={{ color: "var(--text-dark)" }}
          >
            Cartas para el Cielo
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/cartas"
            className="text-sm font-light tracking-wide transition-colors"
            style={{
              color: pathname === "/cartas" ? "var(--rose-warm)" : "var(--text-mid)",
            }}
          >
            Leer cartas
          </Link>
          <Link
            href="/recursos"
            className="text-sm font-light tracking-wide transition-colors"
            style={{
              color: pathname === "/recursos" ? "var(--rose-warm)" : "var(--text-mid)",
            }}
          >
            Ayuda
          </Link>
          <Link
            href="/escribir"
            className="text-sm px-5 py-2 rounded-full transition-all font-medium"
            style={{
              backgroundColor: "var(--rose-warm)",
              color: "white",
            }}
          >
            Escribir carta
          </Link>
        </nav>
      </div>
    </header>
  );
}
