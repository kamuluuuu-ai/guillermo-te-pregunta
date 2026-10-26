-- Agrega el personaje elegido (Kamil, Elías o Rappi) a un ranking que ya existe.
-- Pegar en Supabase → SQL Editor → Run (una sola vez). Si nadie eligió, queda vacío.
alter table public.ranking
  add column personaje text check (personaje in ('kamil', 'elias', 'rappi'));
