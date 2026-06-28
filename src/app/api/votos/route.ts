import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const TIPOS_VALIDOS = [
  "llorar",
  "voz",
  "culpable",
  "enojado",
  "vacio",
];

export async function GET() {
  const { data, error } = await supabase.from("votos").select("tipo");
  if (error) return NextResponse.json({}, { status: 500 });

  const conteo: Record<string, number> = {};
  TIPOS_VALIDOS.forEach((t) => (conteo[t] = 0));
  data?.forEach(({ tipo }) => {
    if (tipo in conteo) conteo[tipo]++;
  });

  return NextResponse.json(conteo);
}

export async function POST(req: NextRequest) {
  const { tipo } = await req.json();
  if (!TIPOS_VALIDOS.includes(tipo)) {
    return NextResponse.json({ error: "Tipo inválido." }, { status: 400 });
  }

  const { error } = await supabase.from("votos").insert([{ tipo }]);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true }, { status: 201 });
}
