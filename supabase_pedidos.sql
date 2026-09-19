-- Pedidos de la tienda (pago con Flow).
-- Los crea y actualiza solo el servidor con la clave secreta de Supabase.
-- Desde el Lab, solo la dueña de la tienda puede verlos y marcarlos como despachados.

create table if not exists public.pedidos (
  id           bigint generated always as identity primary key,
  orden        text not null unique,
  flow_orden   bigint,
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
