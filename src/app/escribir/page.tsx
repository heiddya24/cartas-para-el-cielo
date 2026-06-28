"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const FRASES_CRISIS = [
  "me quiero quitar la vida",
  "quiero quitarme la vida",
  "ya no quiero vivir",
  "no quiero vivir más",
  "no quiero vivir mas",
  "quiero morirme",
  "me quiero morir",
  "quiero morir",
  "voy a suicidarme",
  "me voy a suicidar",
  "voy a hacerme daño",
  "me voy a hacer daño",
  "se que pronto me ire contigo",
  "sé que pronto me iré contigo",
  "pronto estaré contigo",
  "pronto estare contigo",
  "no vale la pena seguir viviendo",
  "no tiene sentido seguir viviendo",
  "prefiero no estar aquí",
  "prefiero no estar aqui",
  "mejor me voy con él",
  "mejor me voy con ella",
  "mejor me voy con ellos",
  "ya no quiero estar aquí",
  "ya no quiero estar aqui",
  "cansado de vivir",
  "cansada de vivir",
];

function detectarCrisis(texto: string): boolean {
  const textoNorm = texto.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  return FRASES_CRISIS.some((frase) => {
    const fraseNorm = frase.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    return textoNorm.includes(fraseNorm);
  });
}

export default function EscribirPage() {
  const router = useRouter();
  const [form, setForm] = useState({ de: "", para: "", mensaje: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mostrarAlertaCrisis, setMostrarAlertaCrisis] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.name === "mensaje" && mostrarAlertaCrisis) {
      if (!detectarCrisis(e.target.value)) setMostrarAlertaCrisis(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (detectarCrisis(form.mensaje)) {
      setMostrarAlertaCrisis(true);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/cartas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al enviar la carta.");
      router.push("/gracias");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 py-16 px-6">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-4xl">✉️</span>
            <h1
              className="text-3xl font-serif mt-4 mb-3"
              style={{ color: "var(--text-dark)" }}
            >
              Escribe tu carta
            </h1>
            <p
              className="text-sm font-light leading-relaxed"
              style={{ color: "var(--text-mid)" }}
            >
              No necesitas registrarte. Tu carta será publicada tal como la
              escribas, con amor.
            </p>
          </div>

          {/* Alerta de crisis */}
          {mostrarAlertaCrisis && (
            <div
              className="rounded-2xl p-6 mb-6 border"
              style={{
                backgroundColor: "#fff8f0",
                borderColor: "#e8c4a0",
              }}
            >
              <p
                className="text-lg font-serif mb-3"
                style={{ color: "#8b4513" }}
              >
                💛 Gracias por escribir esto.
              </p>
              <p
                className="text-sm font-light leading-relaxed mb-4"
                style={{ color: "#7a5c3a" }}
              >
                Lo que estás viviendo puede sentirse insoportable, pero no
                tienes que atravesarlo solo. Si sientes que estás en peligro,
                o que podrías hacerte daño, por favor busca apoyo inmediato —
                de alguien de confianza o los servicios de emergencia de tu
                país.
              </p>
              <p
                className="text-sm font-light leading-relaxed mb-4"
                style={{ color: "#7a5c3a" }}
              >
                Tu vida tiene valor. Estamos aquí para escucharte, pero en
                este momento necesitas más que una carta — necesitas una mano
                de verdad.
              </p>
              <div
                className="rounded-xl p-4 text-sm font-light"
                style={{ backgroundColor: "#fdebd0", color: "#8b4513" }}
              >
                <p className="font-medium mb-2">Líneas de ayuda:</p>
                <p>🇻🇪 Venezuela: <strong>0800-SALUD-00</strong></p>
                <p>🇺🇸 USA: <strong>988</strong> (Suicide & Crisis Lifeline)</p>
                <p>🌎 Internacional: <strong>findahelpline.com</strong></p>
              </div>
              <p
                className="text-xs mt-4 font-light"
                style={{ color: "#b09070" }}
              >
                Si deseas, puedes editar tu carta y enviarla cuando te sientas
                listo.
              </p>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl p-8 shadow-sm border border-rose-100 flex flex-col gap-6"
            style={{ backgroundColor: "var(--soft-white)" }}
          >
            <div className="flex flex-col gap-2">
              <label
                htmlFor="de"
                className="text-xs uppercase tracking-widest font-light"
                style={{ color: "var(--text-light)" }}
              >
                De (tu nombre o como quieras llamarte)
              </label>
              <input
                id="de"
                name="de"
                type="text"
                placeholder="Ej: Su hija María, Un amigo anónimo..."
                value={form.de}
                onChange={handleChange}
                required
                maxLength={100}
                className="border border-rose-100 rounded-xl px-4 py-3 text-sm font-light outline-none focus:border-rose-300 transition-colors"
                style={{
                  backgroundColor: "var(--cream)",
                  color: "var(--text-dark)",
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="para"
                className="text-xs uppercase tracking-widest font-light"
                style={{ color: "var(--text-light)" }}
              >
                Para (nombre de quien fue)
              </label>
              <input
                id="para"
                name="para"
                type="text"
                placeholder="Ej: Mi mamá Lucía, Mi hermano Carlos..."
                value={form.para}
                onChange={handleChange}
                required
                maxLength={100}
                className="border border-rose-100 rounded-xl px-4 py-3 text-sm font-light outline-none focus:border-rose-300 transition-colors"
                style={{
                  backgroundColor: "var(--cream)",
                  color: "var(--text-dark)",
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="mensaje"
                className="text-xs uppercase tracking-widest font-light"
                style={{ color: "var(--text-light)" }}
              >
                Tu carta
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={10}
                placeholder="Escribe lo que llevas en el corazón..."
                value={form.mensaje}
                onChange={handleChange}
                required
                maxLength={3000}
                className="border border-rose-100 rounded-xl px-4 py-3 text-sm font-light leading-relaxed outline-none focus:border-rose-300 transition-colors resize-none"
                style={{
                  backgroundColor: "var(--cream)",
                  color: "var(--text-dark)",
                  borderColor: mostrarAlertaCrisis ? "#e8c4a0" : undefined,
                }}
              />
              <p
                className="text-xs text-right"
                style={{ color: "var(--text-light)" }}
              >
                {form.mensaje.length} / 3000
              </p>
            </div>

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full text-white font-medium text-sm tracking-wide transition-all hover:opacity-90 disabled:opacity-50 shadow-sm"
              style={{ backgroundColor: "var(--rose-warm)" }}
            >
              {loading ? "Enviando tu carta... 🕊️" : "Enviar mi carta al cielo 🕊️"}
            </button>

            <p
              className="text-xs text-center font-light"
              style={{ color: "var(--text-light)" }}
            >
              Tu carta será publicada públicamente. No incluyas información
              personal sensible como direcciones o teléfonos.
            </p>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
