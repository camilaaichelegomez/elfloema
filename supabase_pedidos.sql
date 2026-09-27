-- Pedidos de la tienda (pago con Flow).
-- Los crea y actualiza solo el servidor con la clave secreta de Supabase.
-- Desde el Lab, solo la dueña de la tienda puede verlos y marcarlos como despachados.

create table if not exists public.pedidos (
  id           bigint generated always as identity primary key,
  orden        text not null unique,
  pasarela     text,        -- 'flow' o 'mercadopago'
  flow_orden   bigint,      -- el numero de orden de Flow
  pago_id      text,        -- el id del pago (o de la preferencia) en Mercado Pago
  estado       text not null default 'pendiente'
               check (estado in ('pendiente', 'pagado', 'rechazado', 'anulado')),
  total        integer not null,
  items        jsonb not null,
  nombre       text,
  email        text,
  telefono     text,
  metodo_envio text,
  direccion    text,
  sucursal     text,
  comentarios  text,
  despachado   boolean not null default false,
  creado       timestamptz not null default now(),
  pagado       timestamptz
);

alter table public.pedidos enable row level security;

drop policy if exists "la duena ve los pedidos" on public.pedidos;
create policy "la duena ve los pedidos" on public.pedidos
  for select to authenticated
  using ((auth.jwt() ->> 'email') = 'camilaaichelegomez@gmail.com');

drop policy if exists "la duena marca despachados" on public.pedidos;
create policy "la duena marca despachados" on public.pedidos
  for update to authenticated
  using ((auth.jwt() ->> 'email') = 'camilaaichelegomez@gmail.com')
  with check ((auth.jwt() ->> 'email') = 'camilaaichelegomez@gmail.com');

-- ── Si la tabla ya existe, esto agrega lo que falta y no toca nada mas ──
alter table public.pedidos add column if not exists pasarela text;
alter table public.pedidos add column if not exists pago_id  text;
