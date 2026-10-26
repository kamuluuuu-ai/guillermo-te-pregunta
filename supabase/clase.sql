-- Pantalla de la clase (proyector.html): salas y lo que pasa en cada partida.
-- Pegar entero en Supabase → SQL Editor → Run (una sola vez).
--
-- La página usa la clave pública (anon): con estas reglas solo puede LEER y AGREGAR.
-- No se puede editar ni borrar nada. Una sala acepta eventos durante 12 horas.
-- Para borrar salas viejas: Table Editor → salas (se borran también sus eventos).

create table public.salas (
  codigo text primary key check (codigo ~ '^[A-HJ-NP-Z2-9]{4}$'),  -- 4 caracteres sin 0/O ni 1/I
  creada timestamptz not null default now()
);

create table public.eventos (
  id        bigint generated always as identity primary key,
  uid       uuid        not null unique,                 -- lo genera el dispositivo: reintentar no duplica
  sala      text        not null references public.salas (codigo) on delete cascade,
  jugador   uuid        not null,                        -- el dispositivo
  partida   uuid        not null,                        -- cada vez que empieza la evaluación
  tipo      text        not null check (tipo in ('unirse', 'respuesta', 'comodin', 'fin', 'ronda')),
  nombre    text        check (char_length(nombre) between 1 and 24),
  personaje text        check (personaje in ('kamil', 'elias', 'rappi')),
  pregunta  smallint    check (pregunta between 0 and 29),
  total     smallint    check (total between 1 and 30),
  ok        boolean,
  comodin   text        check (comodin in ('ssj', 'cambio', 'rappi')),
  nota      smallint    check (nota between 1 and 12),
  creado    timestamptz not null default now(),
  check (tipo <> 'unirse'    or (nombre is not null and total is not null)),
  check (tipo <> 'respuesta' or (pregunta is not null and ok is not null)),
  check (tipo <> 'comodin'   or comodin is not null),
  check (tipo <> 'fin'       or nota is not null)
);

-- una respuesta por pregunta, un uso de cada comodín y un final por partida
create unique index eventos_respuesta_unica on public.eventos (partida, pregunta) where tipo = 'respuesta';
create unique index eventos_comodin_unico  on public.eventos (partida, comodin)  where tipo = 'comodin';
create unique index eventos_fin_unico      on public.eventos (partida)           where tipo = 'fin';
create index eventos_sala on public.eventos (sala, id);

alter table public.salas enable row level security;
alter table public.eventos enable row level security;

create policy "cualquiera ve las salas" on public.salas for select to anon using (true);
create policy "el proyector crea salas" on public.salas for insert to anon with check (true);

create policy "cualquiera ve los eventos" on public.eventos for select to anon using (true);
create policy "solo en salas abiertas" on public.eventos for insert to anon
  with check (exists (select 1 from public.salas s where s.codigo = sala and s.creada > now() - interval '12 hours'));

grant select, insert on public.salas, public.eventos to anon;
