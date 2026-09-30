-- =========================================================================
-- NGONGOTAHA PANEL & PAINT - SUPABASE PRODUCTION DATABASE SCHEMA & RLS
-- Address: 142 Oturoa Road, Ngongotahā, Rotorua 3072, New Zealand
-- =========================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. QUOTES TABLE
create table if not exists public.quotes (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  phone text not null,
  email text,
  vehicle_make text not null,
  vehicle_model text not null,
  vehicle_year text,
  service_type text not null,
  description text not null,
  photo_urls text[] default '{}',
  status text not null default 'new' check (status in ('new', 'contacted', 'in_progress', 'completed')),
  notes text,
  estimated_cost text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on quotes
alter table public.quotes enable row level security;

-- Public can submit quotes
create policy "Allow anonymous users to submit quote requests"
  on public.quotes for insert
  with check (true);

-- Only authenticated admins can view and modify quotes
create policy "Allow authenticated admin full access to quotes"
  on public.quotes for all
  using (auth.role() = 'authenticated');


-- 2. SERVICES TABLE
create table if not exists public.services (
  id text primary key,
  title text not null,
  slug text not null,
  short_description text not null,
  full_description text not null,
  turnaround_time text not null,
  icon_name text not null,
  image_url text not null,
  key_benefits text[] default '{}',
  is_featured boolean default true,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.services enable row level security;

create policy "Allow public read access to services"
  on public.services for select
  using (true);

create policy "Allow admin write access to services"
  on public.services for all
  using (auth.role() = 'authenticated');


-- 3. REVIEWS TABLE (VERIFIED GOOGLE REVIEWS ONLY)
create table if not exists public.reviews (
  id text primary key,
  author_name text not null,
  is_local_guide boolean default false,
  rating integer not null default 5,
  text text not null,
  date_str text,
  source text not null default 'Google Reviews',
  is_visible boolean default true,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.reviews enable row level security;

create policy "Allow public read access to visible reviews"
  on public.reviews for select
  using (is_visible = true);

create policy "Allow admin full access to reviews"
  on public.reviews for all
  using (auth.role() = 'authenticated');


-- 4. GALLERY TABLE
create table if not exists public.gallery (
  id text primary key,
  title text not null,
  category text not null,
  image_url text not null,
  caption text,
  is_real_work boolean default false,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.gallery enable row level security;

create policy "Allow public read access to gallery"
  on public.gallery for select
  using (true);

create policy "Allow admin full access to gallery"
  on public.gallery for all
  using (auth.role() = 'authenticated');


-- 5. BEFORE / AFTER TABLE
create table if not exists public.before_after (
  id text primary key,
  title text not null,
  vehicle text not null,
  description text not null,
  before_image_url text not null,
  after_image_url text not null,
  before_label text default 'Before: Prep / Damage',
  after_label text default 'After: Clearcoat Finish',
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.before_after enable row level security;

create policy "Allow public read access to before_after"
  on public.before_after for select
  using (true);

create policy "Allow admin full access to before_after"
  on public.before_after for all
  using (auth.role() = 'authenticated');


-- 6. FAQS TABLE
create table if not exists public.faqs (
  id text primary key,
  question text not null,
  answer text not null,
  category text default 'General',
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.faqs enable row level security;

create policy "Allow public read access to faqs"
  on public.faqs for select
  using (true);

create policy "Allow admin full access to faqs"
  on public.faqs for all
  using (auth.role() = 'authenticated');


-- 7. SITE SETTINGS TABLE
create table if not exists public.site_settings (
  id text primary key default 'primary_config',
  settings jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.site_settings enable row level security;

create policy "Allow public read access to settings"
  on public.site_settings for select
  using (true);

create policy "Allow admin full access to settings"
  on public.site_settings for all
  using (auth.role() = 'authenticated');


-- =========================================================================
-- SEED DATA (Confirmed Business Information & Verified Google Reviews)
-- =========================================================================

-- Insert Confirmed Reviews (Verbatim wording only)
insert into public.reviews (id, author_name, is_local_guide, rating, text, source, is_visible, display_order)
values
  ('rev-1', 'Alison W.', true, 5, 'I have used them twice. Once for chassis rust and once for a ding.. The guy that did it was excellent. Very happy with the job and he didn''t hold onto the car for days.', 'Google Reviews', true, 1),
  ('rev-2', 'Zachariah J.', false, 5, 'Contacted him and had the car in the next day and done before the end of the day. 10/10 would definitely recommend does an incredible job and fairly priced too.', 'Google Reviews', true, 2),
  ('rev-3', 'Janice G.', true, 5, 'I called Darren to do a temporary fix on my front bumper which was hanging off and I couldn''t drive it. He came to my house and fixed it so that I can drive it and didn''t charge me. What a legend!', 'Google Reviews', true, 3),
  ('rev-4', 'Tracy J.', false, 5, 'Absolutely outstanding service and workmanship. Would highly recommend.', 'Google Reviews', true, 4),
  ('rev-5', 'Jane W.', false, 5, 'I am so thankful for the job done on my car much appreciated a very kind, thorough man', 'Google Reviews', true, 5)
on conflict (id) do nothing;

-- Insert Confirmed Services
insert into public.services (id, title, slug, short_description, full_description, turnaround_time, icon_name, image_url, key_benefits, is_featured, display_order)
values
  ('srv-1', 'Panel Beating & Chassis Repair', 'panel-beating', 'Precision structural alignment, panel beating, and chassis restoration for accident damage and structural integrity.', 'Using hydraulic alignment rigs and seasoned metal-shaping techniques, we restore damaged body panels, quarter panels, and structural chassis back to factory specifications.', 'Often Same-Day or 1-3 Days', 'Hammer', '/images/ute-paint-booth.png', array['Chassis rust and structural alignment', 'WoF compliance certification', 'Preserves factory metal integrity'], true, 1),
  ('srv-2', 'Spray Painting & Gloss Finishes', 'spray-painting', 'Computerised colour matching, premium oven baking, and deep mirror-gloss clearcoats that endure the NZ sun.', 'Our spray booth delivers factory-grade finishes from single-panel blend-ins to complete resprays.', '1 - 2 Days', 'Paintbrush', '/images/ute-paint-booth.png', array['Exact computerized tint and flake match', 'High-solid glossy clearcoat for UV protection', 'Bake-cured finish for scratch resistance'], true, 2),
  ('srv-3', 'Rust Repair & WoF Compliance', 'rust-repair', 'Specialised cut-out, steel plating, and seam sealing to pass strict NZTA Warrant of Fitness inspections.', 'Chassis and sill rust will fail your WoF instantly. We cut out cancer rust completely down to clean bare metal, fabricate fresh steel, and weld to certified standards.', 'Fast Turnaround (No long shop holds)', 'ShieldAlert', '/images/ute-paint-booth.png', array['100% WoF compliant metal fabrication', 'Anti-corrosive epoxy sealing & cavity wax protection', 'Verified: "didn''t hold onto the car for days"'], true, 3),
  ('srv-4', 'Dent & Ding Repair', 'dent-repair', 'From carpark shopping trolley dings to crease damage, restored smoothly without unnecessary panel replacements.', 'Minor dents compromise the visual line of your car. We employ specialized pullers, fine picks, and micro-filling techniques to eliminate door dings.', 'Same-Day Service Available', 'Sparkles', '/images/interior-detail.png', array['Fast turnarounds - back on the road in hours', 'Affordable rates that save on insurance excess', 'Smooth factory contour restoration'], true, 4),
  ('srv-5', 'Bumper Repair & Emergency Fixes', 'bumper-repair', 'Plastic welding, clip re-securing, scuff resprays, and mobile emergency temporary fixes to keep you mobile.', 'Is your bumper hanging off after a curb impact or carpark scrape? We perform heavy-duty plastic welding and emergency temporary fixes to get you driving safely right away.', 'Emergency Same-Day / While-You-Wait', 'Wrench', '/images/interior-detail.png', array['Emergency callouts and rapid temporary re-securing', 'High-strength plastic fusion welding', 'Saves hundreds compared to buying OEM replacements'], true, 5)
on conflict (id) do nothing;

-- =========================================================================
-- STORAGE BUCKETS CONFIGURATION
-- =========================================================================

-- Create storage bucket for damage photos
insert into storage.buckets (id, name, public)
values ('damage-photos', 'damage-photos', true)
on conflict (id) do nothing;

-- Create storage bucket for workshop gallery
insert into storage.buckets (id, name, public)
values ('workshop-gallery', 'workshop-gallery', true)
on conflict (id) do nothing;

-- Public can upload quote photos
create policy "Allow anonymous photo upload to damage-photos"
  on storage.objects for insert
  with check (bucket_id = 'damage-photos');

-- Public can view damage photos & gallery
create policy "Allow public view for damage-photos"
  on storage.objects for select
  using (bucket_id in ('damage-photos', 'workshop-gallery'));

-- Authenticated admins can manage all gallery photos
create policy "Allow admin full access to workshop-gallery"
  on storage.objects for all
  using (auth.role() = 'authenticated');
