import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartaCard from "@/components/CartaCard";
import BotonesAnimo from "@/components/BotonesAnimo";
import { supabase, type Carta } from "@/lib/supabase";

async function getCartasRecientes(): Promise<Carta[]> {
  const { data } = await supabase
    .from("cartas")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(6);
  return data ?? [];
}

async function getEstadisticas(): Promise<{ totalCartas: number; totalPalabras: number }> {
  const { data } = await supabase.from("cartas").select("mensaje");
  if (!data) return { totalCartas: 0, totalPalabras: 0 };
  const totalCartas = data.length;
  const totalPalabras = data.reduce((acc, c) => {
    return acc + c.mensaje.trim().split(/\s+/).filter(Boolean).length;
  }, 0);
  return { totalCartas, totalPalabras };
}

function formatNum(n: number): string {
  return n.toLocaleString("es-ES");
}

export const revalidate = 60;

export default async function HomePage() {
  const [cartas, stats] = await Promise.all([getCartasRecientes(), getEstadisticas()]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section
          className="relative py-24 px-6 text-center overflow-hidden"
          style={{ backgroundColor: "var(--rose-light)" }}
        >
          <div className="absolute inset-0 opacity-20 pointer-events-none select-none flex items-center justify-center">
            <span className="text-[20rem] leading-none">🕊️</span>
          </div>
          <div className="relative max-w-2xl mx-auto animate-float-up">
            <p
              className="text-xs tracking-widest uppercase font-light mb-4"
              style={{ color: "var(--rose-warm)" }}
            >
              Un espacio para despedirse con amor
            </p>
            <h1
              className="text-4xl md:text-5xl font-serif font-medium mb-6 leading-tight"
              style={{ color: "var(--text-dark)" }}
            >
              Cartas para el Cielo
            </h1>
            <p
              className="text-lg font-light leading-relaxed mb-8"
              style={{ color: "var(--text-mid)" }}
            >
              Un espacio gratuito donde puedes escribirle una carta a quien ya
              no está. No necesitas registrarte. Solo necesitas amor.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/escribir"
                className="px-8 py-3 rounded-full text-white font-medium text-sm tracking-wide transition-all hover:opacity-90 shadow-sm"
                style={{ backgroundColor: "var(--rose-warm)" }}
              >
                Escribir mi carta
              </Link>
              <Link
                href="/cartas"
                className="px-8 py-3 rounded-full font-medium text-sm tracking-wide border transition-all hover:opacity-80"
                style={{
                  borderColor: "var(--rose-mid)",
                  color: "var(--text-mid)",
                  backgroundColor: "white",
                }}
              >
                Leer cartas
              </Link>
            </div>
          </div>
        </section>

        {/* Contador */}
        {stats.totalCartas > 0 && (
          <section className="py-12 px-6">
            <div className="max-w-2xl mx-auto grid grid-cols-2 gap-6">
              <div
                className="rounded-2xl p-6 text-center border border-rose-100"
                style={{ backgroundColor: "var(--soft-white)" }}
              >
                <p
                  className="text-4xl font-serif font-medium mb-2"
                  style={{ color: "var(--rose-warm)" }}
                >
                  {formatNum(stats.totalCartas)}
                </p>
                <p
                  className="text-sm font-light leading-relaxed"
                  style={{ color: "var(--text-mid)" }}
                >
                  cartas enviadas al cielo
                </p>
              </div>
              <div
                className="rounded-2xl p-6 text-center border border-rose-100"
                style={{ backgroundColor: "var(--soft-white)" }}
              >
                <p
                  className="text-4xl font-serif font-medium mb-2"
                  style={{ color: "var(--rose-warm)" }}
                >
                  {formatNum(stats.totalPalabras)}
                </p>
                <p
                  className="text-sm font-light leading-relaxed"
                  style={{ color: "var(--text-mid)" }}
                >
                  palabras que necesitaban salir del pecho
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Botones de ánimo */}
        <BotonesAnimo />

        {/* Días especiales */}
        <section className="py-14 px-6 max-w-3xl mx-auto">
          <h2
            className="text-2xl font-serif text-center mb-3"
            style={{ color: "var(--text-dark)" }}
          >
            Días que duelen más
          </h2>
          <p
            className="text-sm font-light text-center mb-8"
            style={{ color: "var(--text-mid)" }}
          >
            Algunos días el peso se siente más. Si hoy es uno de esos días,
            escríbele.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { emoji: "🎂", label: "Su cumpleaños", id: "cumpleanos" },
              { emoji: "💐", label: "Día de las madres", id: "madres" },
              { emoji: "👔", label: "Día del padre", id: "padre" },
              { emoji: "🎄", label: "Navidad", id: "navidad" },
              { emoji: "💑", label: "Aniversario", id: "aniversario" },
              { emoji: "🕊️", label: "Otro día difícil", id: "dificil" },
            ].map(({ emoji, label, id }) => (
              <a
                key={id}
                href={`/escribir?ocasion=${id}`}
                className="rounded-2xl p-5 text-center border border-rose-100 transition-all hover:shadow-sm hover:border-rose-200 flex flex-col items-center gap-2"
                style={{ backgroundColor: "var(--soft-white)" }}
              >
                <span className="text-3xl">{emoji}</span>
                <span
                  className="text-sm font-light"
                  style={{ color: "var(--text-mid)" }}
                >
                  {label}
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* Texto de contexto */}
        <section className="py-16 px-6 max-w-2xl mx-auto text-center">
          <div
            className="w-12 h-px mx-auto mb-8"
            style={{ backgroundColor: "var(--rose-mid)" }}
          />
          <p
            className="text-base font-light leading-loose"
            style={{ color: "var(--text-mid)" }}
          >
            Este espacio nació del dolor y del amor. Para los que perdieron
            seres queridos en el{" "}
            <span style={{ color: "var(--text-dark)" }} className="font-medium">
              terremoto de Venezuela
            </span>{" "}
            y para todos los que cargan el peso de una despedida que nunca
            llegó a tiempo. Aquí, las palabras no se pierden — suben.
          </p>
          <div
            className="w-12 h-px mx-auto mt-8"
            style={{ backgroundColor: "var(--rose-mid)" }}
          />
        </section>

        {/* Cartas recientes */}
        {cartas.length > 0 && (
          <section className="py-12 px-6 max-w-4xl mx-auto">
            <h2
              className="text-2xl font-serif text-center mb-10"
              style={{ color: "var(--text-dark)" }}
            >
              Cartas recientes
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {cartas.map((carta) => (
                <CartaCard key={carta.id} carta={carta} />
              ))}
            </div>
            {cartas.length >= 6 && (
              <div className="text-center mt-10">
                <Link
                  href="/cartas"
                  className="text-sm font-medium underline underline-offset-4"
                  style={{ color: "var(--rose-warm)" }}
                >
                  Ver todas las cartas →
                </Link>
              </div>
            )}
          </section>
        )}

        {/* CTA vacío */}
        {cartas.length === 0 && (
          <section className="py-16 px-6 text-center max-w-lg mx-auto">
            <div className="text-5xl mb-6">✉️</div>
            <p
              className="text-lg font-light mb-6"
              style={{ color: "var(--text-mid)" }}
            >
              Aún no hay cartas. Sé el primero en escribir.
            </p>
            <Link
              href="/escribir"
              className="px-8 py-3 rounded-full text-white font-medium text-sm shadow-sm hover:opacity-90 transition-all"
              style={{ backgroundColor: "var(--rose-warm)" }}
            >
              Escribir la primera carta
            </Link>
          </section>
        )}

        {/* Cómo funciona */}
        <section
          className="py-16 px-6"
          style={{ backgroundColor: "var(--rose-light)" }}
        >
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-2xl font-serif text-center mb-12"
              style={{ color: "var(--text-dark)" }}
            >
              ¿Cómo funciona?
            </h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {[
                {
                  emoji: "✍️",
                  title: "Escribe",
                  desc: "Llena un formulario sencillo con tu nombre, el nombre de quien fue, y tu mensaje.",
                },
                {
                  emoji: "🕊️",
                  title: "Se publica",
                  desc: "Tu carta aparece públicamente para que otros también puedan leerla y sentirse acompañados.",
                },
                {
                  emoji: "💛",
                  title: "Sana",
                  desc: "Escribir es un acto de amor. El duelo necesita palabras. Este es tu espacio.",
                },
              ].map(({ emoji, title, desc }) => (
                <div key={title} className="flex flex-col items-center gap-3">
                  <div className="text-4xl">{emoji}</div>
                  <h3
                    className="font-serif text-lg"
                    style={{ color: "var(--text-dark)" }}
                  >
                    {title}
                  </h3>
                  <p
                    className="text-sm font-light leading-relaxed"
                    style={{ color: "var(--text-mid)" }}
                  >
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
