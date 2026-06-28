"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AnimacionEnvio() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/gracias");
    }, 3500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center z-50"
      style={{ backgroundColor: "var(--rose-light)" }}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Paloma con carta animada */}
        <div className="paloma-vuela">
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Cuerpo de la paloma */}
            <ellipse cx="60" cy="65" rx="22" ry="14" fill="white" />

            {/* Ala izquierda */}
            <path
              className="ala-izq"
              d="M38 62 Q20 45 15 58 Q25 70 38 68Z"
              fill="white"
            />

            {/* Ala derecha */}
            <path
              className="ala-der"
              d="M82 62 Q100 45 105 58 Q95 70 82 68Z"
              fill="white"
            />

            {/* Cabeza */}
            <circle cx="80" cy="58" r="10" fill="white" />

            {/* Ojo */}
            <circle cx="83" cy="56" r="2" fill="#c9847a" />
            <circle cx="83.8" cy="55.2" r="0.7" fill="white" />

            {/* Pico con carta */}
            <path d="M89 60 L96 58 L89 63Z" fill="#e8c4a0" />

            {/* Carta en el pico */}
            <rect x="93" y="54" width="14" height="10" rx="1" fill="white" stroke="#e8c4c4" strokeWidth="0.8" />
            <line x1="96" y1="57" x2="104" y2="57" stroke="#e8c4c4" strokeWidth="0.8" />
            <line x1="96" y1="59" x2="104" y2="59" stroke="#e8c4c4" strokeWidth="0.8" />
            <line x1="96" y1="61" x2="101" y2="61" stroke="#e8c4c4" strokeWidth="0.8" />

            {/* Cola */}
            <path d="M38 68 Q28 75 32 80 Q40 72 42 70Z" fill="white" />
          </svg>
        </div>

        <p
          className="text-lg font-serif animate-fade-in"
          style={{ color: "var(--text-mid)" }}
        >
          Tu carta va en camino al cielo...
        </p>

        {/* Estrellas/puntos que suben */}
        <div className="flex gap-3 mt-2">
          <span className="punto-1" style={{ color: "var(--rose-warm)", fontSize: 20 }}>✦</span>
          <span className="punto-2" style={{ color: "var(--rose-mid)", fontSize: 14 }}>✦</span>
          <span className="punto-3" style={{ color: "var(--rose-warm)", fontSize: 10 }}>✦</span>
        </div>
      </div>

      <style>{`
        .paloma-vuela {
          animation: volar 3.2s ease-in forwards;
        }

        @keyframes volar {
          0%   { transform: translateY(0px) translateX(0px) scale(1); opacity: 1; }
          30%  { transform: translateY(-30px) translateX(20px) scale(1.05); opacity: 1; }
          60%  { transform: translateY(-80px) translateX(60px) scale(0.85); opacity: 0.9; }
          85%  { transform: translateY(-160px) translateX(120px) scale(0.5); opacity: 0.4; }
          100% { transform: translateY(-220px) translateX(160px) scale(0.1); opacity: 0; }
        }

        .ala-izq {
          animation: aletear 0.4s ease-in-out infinite alternate;
          transform-origin: 38px 62px;
        }

        .ala-der {
          animation: aletear-der 0.4s ease-in-out infinite alternate;
          transform-origin: 82px 62px;
        }

        @keyframes aletear {
          from { transform: rotate(-15deg) scaleY(1); }
          to   { transform: rotate(10deg) scaleY(0.6); }
        }

        @keyframes aletear-der {
          from { transform: rotate(15deg) scaleY(1); }
          to   { transform: rotate(-10deg) scaleY(0.6); }
        }

        .punto-1 { animation: subir 1.5s ease-in-out 0.3s infinite; }
        .punto-2 { animation: subir 1.5s ease-in-out 0.6s infinite; }
        .punto-3 { animation: subir 1.5s ease-in-out 0.9s infinite; }

        @keyframes subir {
          0%   { transform: translateY(0); opacity: 0.8; }
          100% { transform: translateY(-30px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
