-- Habilitar extensión pgvector (si no está activa)
create extension if not exists vector;

-- Crear función RPC para búsqueda semántica
-- match_threshold (C2): piso de similitud coseno. Con default 0.0 es retrocompatible
-- (no filtra). El cliente Python además aplica MIN_SIMILARITY como red de seguridad,
-- así que esta migración es defensa en profundidad y puede ejecutarse cuando se quiera.
create or replace function buscar_articulos(
  query_embedding vector(384),
  match_count     int   default 6,
  match_threshold float default 0.0
)
returns table (
  id         bigint,
  title      text,
  authors    text,
  year       text,
  journal    text,
  source     text,
  plant_key  text,
  doi        text,
  snippet    text,
  similarity float
)
language sql stable
as $$
  select
    id,
    title,
    authors,
    year,
    journal,
    source,
    plant_key,
    doi,
    snippet,
    1 - (embedding <=> query_embedding) as similarity
  from articulos_botanicos
  where 1 - (embedding <=> query_embedding) >= match_threshold
  order by embedding <=> query_embedding
  limit match_count;
$$;

-- Índice HNSW para búsquedas rápidas (cosine distance)
create index if not exists articulos_embedding_hnsw
  on articulos_botanicos
  using hnsw (embedding vector_cosine_ops);
