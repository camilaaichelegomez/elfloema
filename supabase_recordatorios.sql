-- Recordatorios de Florecer: avisos que llegan con la app cerrada.
--
-- Se corre una sola vez en Supabase → SQL Editor. Antes, reemplaza los dos
-- valores marcados con CAMBIAR más abajo (la dirección del sitio y la
-- contraseña CRON_SECRET, la misma que pusiste en Vercel).
--
-- Cómo funciona: cada aparato que activa los recordatorios guarda aquí su
-- suscripción de avisos y la lista de horas. Cada cinco minutos Supabase
-- llama a /api/recordatorios/enviar, que manda los que tocan.

-- ── 1. La tabla ──────────────────────────────────────────────────────────
create table if not exists public.recordatorios_push (
  id             bigint generated always as identity primary key,
  endpoint       text not null unique,  -- la dirección de avisos del aparato
  p256dh         text not null,
  auth           text not null,
  zona           text not null,         -- zona horaria, p. ej. America/Santiago
  recordatorios  jsonb not null default '[]'::jsonb,
  enviados       jsonb not null default '{}'::jsonb,  -- { id: 'YYYY-MM-DD' }
  creado         timestamptz not null default now(),
  actualizado    timestamptz not null default now()
);

-- RLS encendido y sin reglas: nadie puede leerla ni escribirla desde el
-- navegador. Solo el servidor, con la clave secreta, la usa.
alter table public.recordatorios_push enable row level security;

-- ── 2. El reloj: cada cinco minutos ─────────────────────────────────────
create extension if not exists pg_cron;
create extension if not exists pg_net;

-- Si ya existía, se reemplaza.
select cron.unschedule('recordatorios-florecer')
where exists (select 1 from cron.job where jobname = 'recordatorios-florecer');

select cron.schedule(
  'recordatorios-florecer',
  '*/5 * * * *',
  $$
  select net.http_get(
    url := 'https://CAMBIAR-DIRECCION-DEL-SITIO/api/recordatorios/enviar',
    headers := jsonb_build_object('Authorization', 'Bearer CAMBIAR-CRON-SECRET'),
    timeout_milliseconds := 30000
  );
  $$
);

-- Para revisar que corre: las últimas llamadas y cómo respondió el sitio.
-- select status_code, content, created from net._http_response order by created desc limit 10;
