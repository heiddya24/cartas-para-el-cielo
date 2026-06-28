import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

const RECURSOS = [
  {
    emoji: "🫁",
    titulo: "La respiración como ancla",
    subtitulo: "Ejercicio de meditación",
    color: "#fff5f5",
    borde: "#f3d0d0",
    contenido: [
      "Cuando el dolor se vuelve muy intenso, la mente puede llenarse de pensamientos que se aceleran y se enredan. La respiración consciente es una de las herramientas más simples y poderosas para volver al cuerpo, al momento presente, y calmar ese ruido interno.",
      "Prueba este ejercicio cuando sientas que el pensamiento no para:",
    ],
    ejercicio: {
      titulo: "Respiración 4-7-8",
      pasos: [
        "Busca un lugar cómodo, sentado o acostado.",
        "Cierra los ojos suavemente.",
        "Inhala por la nariz contando hasta 4.",
        "Retén el aire contando hasta 7.",
        "Exhala lentamente por la boca contando hasta 8.",
        "Repite este ciclo 4 veces.",
      ],
    },
    cierre: "No tienes que vaciar la mente. Solo tienes que respirar.",
  },
  {
    emoji: "🌊",
    titulo: "Las etapas del duelo",
    subtitulo: "Lo que estás viviendo tiene nombre",
    color: "#f5f8ff",
    borde: "#d0ddf3",
    contenido: [
      "El duelo no sigue un camino recto. No hay un orden correcto ni un tiempo exacto. La psicóloga Elisabeth Kübler-Ross describió cinco etapas que muchas personas atraviesan, aunque no siempre en este orden y no todas las personas las viven todas:",
    ],
    lista: [
      { nombre: "Negación", desc: "«Esto no puede ser real.» El shock protege al corazón mientras procesa." },
      { nombre: "Ira", desc: "«¿Por qué a mí? ¿Por qué a ellos?» El enojo es parte del amor que no sabe a dónde ir." },
      { nombre: "Negociación", desc: "«Si hubiera hecho algo diferente...» La mente busca control en lo incontrolable." },
      { nombre: "Depresión", desc: "La tristeza profunda cuando la realidad se asienta. No es debilidad — es amor." },
      { nombre: "Aceptación", desc: "No significa que esté bien. Significa que aprendes a vivir con ello." },
    ],
    cierre: "No hay etapa incorrecta. Donde estés hoy es exactamente donde tienes que estar.",
  },
  {
    emoji: "🎵",
    titulo: "Vuelve a lo que te hace bien",
    subtitulo: "Música, libros, movimiento",
    color: "#fff9f0",
    borde: "#f3e4c0",
    contenido: [
      "En el duelo es fácil alejarse de todo lo que antes daba alegría. Pero pequeñas dosis de cosas que amamos pueden devolvernos al presente y recordarnos que todavía somos capaces de sentir algo más que dolor.",
    ],
    lista: [
      { nombre: "Música", desc: "Pon esa canción que te movía el alma. Llorar con música también es sanar." },
      { nombre: "Leer", desc: "Un libro puede ser refugio. No tienes que entenderlo todo — solo estar presente en la historia." },
      { nombre: "Moverse", desc: "Caminar 20 minutos, bailar solo en casa, estirar el cuerpo. El movimiento libera lo que las palabras no pueden." },
      { nombre: "Crear algo", desc: "Dibujar, cocinar, escribir (como aquí). Crear es una forma de transformar el dolor en algo tangible." },
    ],
    cierre: "No tienes que \"estar bien\" para disfrutar algo. Permítete sentir los dos al mismo tiempo.",
  },
  {
    emoji: "🌿",
    titulo: "Reconectar con la naturaleza",
    subtitulo: "El mundo sigue, y tú también puedes",
    color: "#f5fff8",
    borde: "#c0f3d0",
    contenido: [
      "La naturaleza tiene una forma silenciosa de recordarnos que formamos parte de algo más grande. El sol que sale, el viento, el sonido del agua — todo eso sigue existiendo, y estar en contacto con ello puede devolvernos algo de calma.",
    ],
    lista: [
      { nombre: "Salir al sol", desc: "Aunque sea 10 minutos. La luz natural regula el estado de ánimo." },
      { nombre: "Tocar la tierra", desc: "Quítate los zapatos en el pasto. Parece pequeño. No lo es." },
      { nombre: "Observar el cielo", desc: "Las nubes, las estrellas, un atardecer. A veces sentimos que los que se fueron están más cerca desde ahí." },
      { nombre: "Cuidar algo vivo", desc: "Una planta, un jardín, un animal. Cuidar es también una forma de sanar." },
    ],
    cierre: "La naturaleza no juzga. No apura. Simplemente es. Y a veces eso es todo lo que necesitamos.",
  },
  {
    emoji: "💛",
    titulo: "Pensamientos que sostienen",
    subtitulo: "Cuando la mente se pone en contra",
    color: "#fffdf0",
    borde: "#f3ecc0",
    contenido: [
      "En el duelo, la mente puede volverse muy crítica. «Debería haberlo dicho», «No fui suficiente», «¿Por qué yo sigo aquí?». Estos pensamientos son normales, pero no son la verdad.",
      "Cuando aparezcan, intenta reconocerlos sin luchar contra ellos:",
    ],
    lista: [
      { nombre: "Nótalos", desc: "«Estoy teniendo el pensamiento de que...» Nombrar crea distancia." },
      { nombre: "No los creas automáticamente", desc: "Un pensamiento es solo una frase en tu mente. No es un hecho." },
      { nombre: "Ofrécete lo que le dirías a un amigo", desc: "¿Qué le dirías si él te dijera lo mismo? Dítelo a ti." },
      { nombre: "Recuerda lo que sí hiciste", desc: "El amor que diste es real. La presencia que tuviste es real." },
    ],
    cierre: "Amaste. Eso no cambia, aunque ya no estén.",
  },
  {
    emoji: "🤝",
    titulo: "La importancia del acompañamiento profesional",
    subtitulo: "No tienes que atravesar esto solo",
    color: "#f8f5ff",
    borde: "#d0c0f3",
    contenido: [
      "Buscar ayuda profesional no significa que el duelo se te esté yendo de las manos. Significa que te estás cuidando. Un psicólogo o terapeuta especializado en duelo puede ofrecerte herramientas que la voluntad sola no alcanza.",
      "Considera buscar acompañamiento profesional si:",
    ],
    lista: [
      { nombre: "El dolor no disminuye después de meses", desc: "El duelo tiene picos y valles — pero si no hay ningún alivio, puede ayudar hablar con alguien." },
      { nombre: "Sientes que no puedes funcionar en el día a día", desc: "Trabajo, relaciones, higiene básica. Cuando todo colapsa, el apoyo externo es necesario." },
      { nombre: "Los pensamientos se vuelven oscuros", desc: "Si aparecen ideas de hacerte daño, busca ayuda hoy. No mañana." },
      { nombre: "Te sientes completamente solo", desc: "Un profesional puede ser el primer paso para volver a conectar con el mundo." },
    ],
    cierre: "Pedir ayuda es uno de los actos de amor propio más valientes que existen.",
    crisis: true,
  },
];

export default function RecursosPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">

        {/* Hero */}
        <section className="py-20 px-6 text-center" style={{ backgroundColor: "var(--rose-light)" }}>
          <div className="max-w-2xl mx-auto">
            <p className="text-xs tracking-widest uppercase font-light mb-4" style={{ color: "var(--rose-warm)" }}>
              Lecturas y ejercicios
            </p>
            <h1 className="text-4xl font-serif mb-4" style={{ color: "var(--text-dark)" }}>
              Herramientas para el camino
            </h1>
            <p className="text-base font-light leading-relaxed" style={{ color: "var(--text-mid)" }}>
              El duelo no tiene manual. Pero hay cosas pequeñas que pueden ayudar a que el peso se sienta un poco menos pesado. Aquí encontrarás lecturas cortas y ejercicios sencillos para los días difíciles.
            </p>
          </div>
        </section>

        {/* Recursos */}
        <section className="py-16 px-6 max-w-3xl mx-auto flex flex-col gap-10">
          {RECURSOS.map((r) => (
            <article
              key={r.titulo}
              className="rounded-3xl p-8 border"
              style={{ backgroundColor: r.color, borderColor: r.borde }}
            >
              <div className="flex items-start gap-4 mb-5">
                <span className="text-4xl mt-1">{r.emoji}</span>
                <div>
                  <p className="text-xs uppercase tracking-widest font-light mb-1" style={{ color: "var(--text-light)" }}>
                    {r.subtitulo}
                  </p>
                  <h2 className="text-2xl font-serif" style={{ color: "var(--text-dark)" }}>
                    {r.titulo}
                  </h2>
                </div>
              </div>

              {r.contenido.map((p, i) => (
                <p key={i} className="text-sm font-light leading-relaxed mb-3" style={{ color: "var(--text-mid)" }}>
                  {p}
                </p>
              ))}

              {r.ejercicio && (
                <div className="rounded-2xl p-5 mt-4 mb-4" style={{ backgroundColor: "white", borderColor: r.borde, border: "1px solid" }}>
                  <p className="text-xs uppercase tracking-widest font-light mb-3" style={{ color: "var(--text-light)" }}>
                    {r.ejercicio.titulo}
                  </p>
                  <ol className="flex flex-col gap-2">
                    {r.ejercicio.pasos.map((paso, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm font-light" style={{ color: "var(--text-dark)" }}>
                        <span className="font-medium shrink-0" style={{ color: "var(--rose-warm)" }}>{i + 1}.</span>
                        {paso}
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {r.lista && (
                <ul className="flex flex-col gap-3 mt-4 mb-4">
                  {r.lista.map((item) => (
                    <li key={item.nombre} className="flex items-start gap-3">
                      <span className="text-sm font-medium shrink-0 pt-0.5" style={{ color: "var(--rose-warm)" }}>✦</span>
                      <span className="text-sm font-light leading-relaxed" style={{ color: "var(--text-mid)" }}>
                        <span className="font-medium" style={{ color: "var(--text-dark)" }}>{item.nombre}:</span>{" "}
                        {item.desc}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {r.crisis && (
                <div className="rounded-2xl p-4 mt-4 mb-4 text-sm font-light" style={{ backgroundColor: "#fdebd0", color: "#8b4513" }}>
                  <p className="font-medium mb-2">Líneas de ayuda disponibles ahora:</p>
                  <p>🇻🇪 Venezuela: <strong>0800-SALUD-00</strong></p>
                  <p>🇺🇸 USA: <strong>988</strong> (Suicide & Crisis Lifeline)</p>
                  <p>🌎 Internacional: <strong>findahelpline.com</strong></p>
                </div>
              )}

              <p className="text-sm font-serif italic mt-2" style={{ color: "var(--text-dark)" }}>
                {r.cierre}
              </p>
            </article>
          ))}
        </section>

        {/* CTA */}
        <section className="py-16 px-6 text-center" style={{ backgroundColor: "var(--rose-light)" }}>
          <div className="max-w-lg mx-auto">
            <p className="text-base font-light mb-6" style={{ color: "var(--text-mid)" }}>
              A veces las palabras ayudan más de lo que creemos. Si sientes algo hoy, escríbelo.
            </p>
            <Link
              href="/escribir"
              className="px-8 py-3 rounded-full text-white font-medium text-sm shadow-sm hover:opacity-90 transition-all"
              style={{ backgroundColor: "var(--rose-warm)" }}
            >
              Escribir una carta al cielo 🕊️
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
