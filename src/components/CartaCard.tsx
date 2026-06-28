import type { Carta } from "@/lib/supabase";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("es-VE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function CartaCard({ carta }: { carta: Carta }) {
  return (
    <article
      className="rounded-2xl p-6 shadow-sm border border-rose-100 flex flex-col gap-4"
      style={{ backgroundColor: "var(--soft-white)" }}
    >
      <div
        className="text-xs font-light tracking-widest uppercase"
        style={{ color: "var(--text-light)" }}
      >
        {formatDate(carta.created_at)}
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-sm font-light" style={{ color: "var(--text-mid)" }}>
          De:{" "}
          <span className="font-serif italic text-base" style={{ color: "var(--text-dark)" }}>
            {carta.de}
          </span>
        </p>
        <p className="text-sm font-light" style={{ color: "var(--text-mid)" }}>
          Para:{" "}
          <span className="font-serif italic text-base" style={{ color: "var(--rose-warm)" }}>
            {carta.para}
          </span>
        </p>
      </div>

      <div
        className="border-t border-rose-100 pt-4 text-[15px] leading-relaxed font-light whitespace-pre-wrap"
        style={{ color: "var(--text-dark)" }}
      >
        {carta.mensaje.length > 400
          ? carta.mensaje.slice(0, 400) + "..."
          : carta.mensaje}
      </div>
    </article>
  );
}
