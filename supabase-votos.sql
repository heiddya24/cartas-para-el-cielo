CREATE TABLE votos (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  tipo text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE votos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "leer votos" ON votos FOR SELECT USING (true);
CREATE POLICY "votar" ON votos FOR INSERT WITH CHECK (true);
