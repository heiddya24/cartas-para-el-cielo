import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartaCard from "@/components/CartaCard";
import Link from "next/link";
import { supabase, type Carta } from "@/lib/supabase";

async function getCartas(): Promise<Carta[]> {
  const { data } = await supabase
    .from("cartas")
    .select("*")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export const revalidate = 60;

export default async function CartasPage() {
  const cartas = await getCartas();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-4xl">📬</span>
            <h1
              className="text-3xl font-serif mt-4 mb-3"
              style={{ color: "var(--text-dark)" }}
            >
              Cartas enviadas al cielo
            </h1>
            <p
              className="text-sm font-light"
              style={{ color: "var(--text-mid)" }}
            >
              {cartas.length === 0
                ? "Aún no hay cartas. Sé el primero en escribir."
                : `${cartas.length} carta${cartas.length === 1 ? "" : "s"} de amor y despedida`}
            </p>
          </div>

          {cartas.length === 0 ? (
            <div className="text-center py-16">
              <Link
                href="/escribir"
                className="px-8 py-3 rounded-full text-white font-medium text-sm shadow-sm hover:opacity-90 transition-all"
                style={{ backgroundColor: "var(--rose-warm)" }}
              >
                Escribir la primera carta
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {cartas.map((carta) => (
                <CartaCard key={carta.id} carta={carta} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
