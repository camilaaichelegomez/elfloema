-- Comentarios de las páginas públicas (sección "Deja tu comentario").
-- Cualquiera puede escribir uno, pero NO se muestra hasta que la dueña lo apruebe
-- desde el Lab (Comentarios). Así no aparece spam ni cosas ofensivas en la web.

create table if not exists public.comentarios (
  id       bigint generated always as identity primary key,
  pagina   text not null,
  nombre   text,
  texto    text not null,
  aprobado boolean not null default false,
  creado   timestamptz not null default now(),
  constraint comentarios_pagina_ok check (pagina ~ '^[a-z0-9/_-]{1,60}$'),
  constraint comentarios_nombre_ok check (nombre is null or char_length(nombre) <= 40),
  constraint comentarios_texto_ok  check (char_length(texto) between 3 and 600)
);

create index if not exists comentarios_pagina_idx on public.comentarios (pagina, creado desc);

alter table public.comentarios enable row level security;

-- Todos ven solo los aprobados.
drop policy if exists "todos ven los aprobados" on public.comentarios;
create policy "todos ven los aprobados" on public.comentarios
  for select to anon, authenticated
  using (aprobado = true);

-- Cualquiera puede comentar, pero siempre entra sin aprobar.
drop policy if exists "cualquiera comenta" on public.comentarios;
create policy "cualquiera comenta" on public.comentarios
  for insert to anon, authenticated
  with check (aprobado = false);

-- Solo la dueña ve los pendientes, los aprueba y los borra.
drop policy if exists "la duena ve todos" on public.comentarios;
create policy "la duena ve todos" on public.comentarios
  for select to authenticated
  using ((auth.jwt() ->> 'email') = 'camilaaichelegomez@gmail.com');

drop policy if exists "la duena aprueba" on public.comentarios;
create policy "la duena aprueba" on public.comentarios
  for update to authenticated
  using ((auth.jwt() ->> 'email') = 'camilaaichelegomez@gmail.com')
  with check ((auth.jwt() ->> 'email') = 'camilaaichelegomez@gmail.com');

drop policy if exists "la duena borra" on public.comentarios;
create policy "la duena borra" on public.comentarios
  for delete to authenticated
  using ((auth.jwt() ->> 'email') = 'camilaaichelegomez@gmail.com');
