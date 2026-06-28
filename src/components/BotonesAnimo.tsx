"use client";

import { useState, useEffect } from "react";

const BOTONES = [
  { tipo: "llorar", emoji: "😢", label: "Hoy solo quiero llorar" },
  { tipo: "voz", emoji: "🎙️", label: "Hoy extraño su voz" },
  { tipo: "culpable", emoji: "💔", label: "Hoy me siento culpable" },
  { tipo: "enojado", emoji: "😤", label: "Hoy estoy enojado" },
  { tipo: "vacio", emoji: "🌫️", label: "Hoy me siento vacío" },
];

function formatNum(n: number): string {
  return n.toLocaleString("es-ES");
}

export default function BotonesAnimo() {
  const [conteo, setConteo] = useState<Record<string, number>>({});
  const [tocados, setTocados] = useState<Set<string>>(new Set());
  const [cargando, setCargando] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/votos")
      .then((r) => r.json())
      .then(setConteo)
      .catch(() => {});

    const guardados = localStorage.getItem("votos_tocados");
    if (guardados) setTocados(new Set(JSON.parse(guardados)));
  }, []);

  const handleVoto = async (tipo: string) => {
    if (cargando) return;
    setCargando(tipo);

    const yaTocado = tocados.has(tipo);
    const nuevosConteos = { ...conteo };

    if (yaTocado) {
      nuevosConteos[tipo] = Math.max(0, (nuevosConteos[tipo] || 0) - 1);
      const nuevosTocados = new Set(tocados);
      nuevosTocados.delete(tipo);
      setTocados(nuevosTocados);
      localStorage.setItem("votos_tocados", JSON.stringify([...nuevosTocados]));
    } else {
      nuevosConteos[tipo] = (nuevosConteos[tipo] || 0) + 1;
      const nuevosTocados = new Set(tocados);
      nuevosTocados.add(tipo);
      setTocados(nuevosTocados);
      localStorage.setItem("votos_tocados", JSON.stringify([...nuevosTocados]));

      await fetch("/api/votos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tipo }),
      }).catch(() => {});
    }

    setConteo(nuevosConteos);
    setCargando(null);
  };

  return (
    <section className="py-14 px-6 max-w-3xl mx-auto">
      <h2
        className="text-2xl font-serif text-center mb-3"
        style={{ color: "var(--text-dark)" }}
      >
        ¿Cómo estás hoy?
      </h2>
      <p
        className="text-sm font-light text-center mb-8"
        style={{ color: "var(--text-mid)" }}
      >
        No siempre hay palabras. A veces solo es un botón. Tócalo y sabe que
        no eres el único.
      </p>

      <div className="flex flex-col gap-3">
        {BOTONES.map(({ tipo, emoji, label }) => {
          const activo = tocados.has(tipo);
          const total = conteo[tipo] || 0;
          return (
            <button
              key={tipo}
              onClick={() => handleVoto(tipo)}
              className="w-full flex items-center justify-between px-6 py-4 rounded-2xl border transition-all text-left"
              style={{
                backgroundColor: activo ? "var(--rose-light)" : "var(--soft-white)",
                borderColor: activo ? "var(--rose-mid)" : "#f3e4e4",
                opacity: cargando && cargando !== tipo ? 0.7 : 1,
              }}
            >
              <span className="flex items-center gap-3">
                <span className="text-2xl">{emoji}</span>
                <span
                  className="text-sm font-light"
                  style={{ color: activo ? "var(--rose-warm)" : "var(--text-dark)" }}
                >
                  {label}
                </span>
              </span>
              {total > 0 && (
                <span
                  className="text-xs font-light ml-4 shrink-0"
                  style={{ color: "var(--text-light)" }}
                >
                  {formatNum(total)}{" "}
                  {total === 1 ? "persona" : "personas"}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
