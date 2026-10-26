-- Ranking de «Guillermo te pregunta»: quién hizo enojar menos a Guillermo en la evaluación.
-- Pegar entero en Supabase → SQL Editor → Run (una sola vez).
--
-- La página usa la clave pública (anon): con estas reglas solo puede LEER el ranking y
-- AGREGAR resultados dentro de los límites de abajo. No puede editar ni borrar nada.
-- Para borrar una fila (un nombre feo, una prueba): Supabase → Table Editor → ranking.

create table public.ranking (
  id        bigint generated always as identity primary key,
  nombre    text        not null check (char_length(nombre) between 1 and 24),
  personaje text        check (personaje in ('kamil', 'elias', 'rappi')),  -- vacío: sin personaje
  errores   smallint    not null check (errores between 0 and 30),   -- respuestas incorrectas
  total     smallint    not null check (total between 1 and 30),     -- preguntas de la evaluación
  nota      smallint    not null check (nota between 1 and 12),
  comodines smallint    not null check (comodines between 0 and 3),  -- comodines usados
  comido    boolean     not null default false,                       -- Guillermo se comió el panel
  creado    timestamptz not null default now(),
  check (errores <= total)
);

alter table public.ranking enable row level security;

create policy "cualquiera ve el ranking"
  on public.ranking for select to anon using (true);

create policy "cualquiera se anota"
  on public.ranking for insert to anon with check (true);

grant select, insert on public.ranking to anon;

-- el orden del ranking: menos errores, mejor nota, menos comodines, quién llegó primero
create index ranking_orden on public.ranking (errores, nota desc, comodines, creado);
