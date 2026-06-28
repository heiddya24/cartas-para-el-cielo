import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function GraciasPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 flex items-center justify-center py-24 px-6">
        <div className="text-center max-w-lg animate-float-up">
          <div className="text-6xl mb-6">🕊️</div>
          <h1
            className="text-3xl font-serif mb-4"
            style={{ color: "var(--text-dark)" }}
          >
            Tu carta llegó al cielo
          </h1>
          <p
            className="text-base font-light leading-relaxed mb-10"
            style={{ color: "var(--text-mid)" }}
          >
            Gracias por compartir tu amor. Escribir es un acto de valentía y de
            sanación. Que tus palabras lleguen a donde deben llegar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cartas"
              className="px-7 py-3 rounded-full text-white font-medium text-sm shadow-sm hover:opacity-90 transition-all"
              style={{ backgroundColor: "var(--rose-warm)" }}
            >
              Ver todas las cartas
            </Link>
            <Link
              href="/escribir"
              className="px-7 py-3 rounded-full font-medium text-sm border transition-all hover:opacity-80"
              style={{
                borderColor: "var(--rose-mid)",
                color: "var(--text-mid)",
                backgroundColor: "white",
              }}
            >
              Escribir otra carta
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
