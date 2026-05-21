-- Enable RLS
alter table if exists restaurants enable row level security;
alter table if exists categories enable row level security;
alter table if exists dishes enable row level security;

-- Restaurants table
create table if not exists restaurants (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text not null unique,
  description text,
  logo_url text,
  cover_url text,
  currency text default 'EUR',
  languages text[] default array['pt', 'en'],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Categories table
create table if not exists categories (
  id uuid default gen_random_uuid() primary key,
  restaurant_id uuid references restaurants(id) on delete cascade not null,
  name text not null,
  name_en text,
  name_es text,
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Dishes table
create table if not exists dishes (
  id uuid default gen_random_uuid() primary key,
  restaurant_id uuid references restaurants(id) on delete cascade not null,
  category_id uuid references categories(id) on delete cascade not null,
  name text not null,
  name_en text,
  name_es text,
  description text,
  description_en text,
  description_es text,
  price decimal(10,2) not null,
  image_url text,
  is_vegetarian boolean default false,
  is_vegan boolean default false,
  is_gluten_free boolean default false,
  is_popular boolean default false,
  is_spicy boolean default false,
  allergens text[] default array[]::text[],
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Indexes for performance
create index if not exists idx_categories_restaurant on categories(restaurant_id);
create index if not exists idx_dishes_restaurant on dishes(restaurant_id);
create index if not exists idx_dishes_category on dishes(category_id);
create index if not exists idx_restaurants_slug on restaurants(slug);

-- RLS Policies (public read access)
create policy "Allow public read access" on restaurants
  for select using (true);

create policy "Allow public read access" on categories
  for select using (true);

create policy "Allow public read access" on dishes
  for select using (true);

-- Insert sample data
insert into restaurants (name, slug, description, currency, languages)
values (
  'Umami Lab',
  'umami-lab',
  'Ramen artesanal com sabores autênticos',
  'EUR',
  array['pt', 'en', 'es']
)
on conflict (slug) do nothing;

-- Get restaurant ID
with rest as (
  select id from restaurants where slug = 'umami-lab'
)
insert into categories (restaurant_id, name, name_en, name_es, sort_order)
select 
  rest.id,
  unnest(array['Entradas', 'Ramen Classic', 'Ramen Especial', 'Sobremesas']),
  unnest(array['Starters', 'Classic Ramen', 'Specialty Ramen', 'Desserts']),
  unnest(array['Entrantes', 'Ramen Clásico', 'Ramen Especial', 'Postres']),
  generate_series(1, 4)
from rest
on conflict do nothing;
