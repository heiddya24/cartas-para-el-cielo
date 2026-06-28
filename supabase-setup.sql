-- Ejecuta esto en el SQL Editor de Supabase

CREATE TABLE cartas (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  de text NOT NULL CHECK (char_length(de) <= 100),
  para text NOT NULL CHECK (char_length(para) <= 100),
  mensaje text NOT NULL CHECK (char_length(mensaje) <= 3000),
  created_at timestamp with time zone DEFAULT now()
);

-- Cualquiera puede leer las cartas
ALTER TABLE cartas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Cartas públicas — lectura" ON cartas
  FOR SELECT USING (true);

CREATE POLICY "Cartas públicas — escritura" ON cartas
  FOR INSERT WITH CHECK (true);
