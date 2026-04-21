-- ============================================================
--  POLIFY KENYA — Party Admin Account & Registration Setup
--  Migration: 20260421000000_create_party_accounts.sql
--
--  Run this in Supabase → SQL Editor
--  This creates the party tables, registration pipeline,
--  and subscription plans.
-- ============================================================


-- ─────────────────────────────────────────────
-- 1. POLITICAL PARTIES TABLE
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.political_parties (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  abbreviation text NOT NULL,          -- e.g. ODM, UDA, JUBILEE
  logo_url    text,
  color       text DEFAULT '#000000',  -- hex brand color
  founded_year int,
  description text,
  website     text,
  is_active   boolean NOT NULL DEFAULT true,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

-- ─────────────────────────────────────────────
-- 2. PARTY MEMBERSHIPS TABLE
--    (This is what the login page checks for role = 'party_admin')
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.party_memberships (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  party_id   uuid REFERENCES public.political_parties(id) ON DELETE SET NULL,
  role       text NOT NULL DEFAULT 'member',
              -- roles: 'party_admin' | 'member' | 'official'
  title      text,                     -- e.g. "Secretary General"
  joined_at  timestamptz NOT NULL DEFAULT now(),
  is_active  boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT valid_role CHECK (role IN ('party_admin', 'official', 'member')),
  CONSTRAINT unique_user_party UNIQUE (user_id, party_id)
);


-- ─────────────────────────────────────────────
-- 3. SUBSCRIPTION PLANS TABLE
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.party_subscription_plans (
  id             text PRIMARY KEY,             -- e.g. 'starter', 'growth', 'enterprise'
  name           text NOT NULL,
  price_monthly  numeric NOT NULL DEFAULT 0,
  features       jsonb NOT NULL DEFAULT '[]'::jsonb,
  is_active      boolean NOT NULL DEFAULT true,
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now()
);


-- ─────────────────────────────────────────────
-- 4. PARTY REGISTRATIONS TABLE (Self-Service Onboarding)
-- ─────────────────────────────────────────────
CREATE TYPE party_registration_status AS ENUM ('pending', 'approved', 'rejected');

CREATE TABLE IF NOT EXISTS public.party_registrations (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  party_name     text NOT NULL,
  abbreviation   text NOT NULL,
  website        text,
  brand_color    text,
  description    text,
  
  contact_name   text NOT NULL,
  contact_email  text NOT NULL,
  contact_phone  text NOT NULL,
  contact_title  text,
  
  plan_id        text REFERENCES public.party_subscription_plans(id),
  status         party_registration_status NOT NULL DEFAULT 'pending',
  
  submitted_at   timestamptz NOT NULL DEFAULT now(),
  reviewed_at    timestamptz,
  reviewed_by    uuid REFERENCES auth.users(id),
  notes          text
);


-- ─────────────────────────────────────────────
-- 5. ROW LEVEL SECURITY (RLS)
-- ─────────────────────────────────────────────
ALTER TABLE public.political_parties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.party_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.party_subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.party_registrations ENABLE ROW LEVEL SECURITY;

-- Anyone can read active parties
CREATE POLICY "parties_public_read"
  ON public.political_parties FOR SELECT
  USING (is_active = true);

-- Auth users can read memberships
CREATE POLICY "memberships_auth_read"
  ON public.party_memberships FOR SELECT
  TO authenticated
  USING (true);

-- Active party admins can insert memberships for their own party
CREATE POLICY "memberships_admin_insert"
  ON public.party_memberships FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.party_memberships m
      WHERE m.user_id = auth.uid()
        AND m.role = 'party_admin'
        AND m.party_id = party_memberships.party_id
        AND m.is_active = true
    )
  );

-- Anyone can read active subscription plans
CREATE POLICY "subscription_plans_read"
  ON public.party_subscription_plans FOR SELECT
  USING (is_active = true);

-- Users can insert their own party registrations
CREATE POLICY "party_registrations_insert"
  ON public.party_registrations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can read their own party registrations
CREATE POLICY "party_registrations_read"
  ON public.party_registrations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);


-- ─────────────────────────────────────────────
-- 6. SEED DATA
-- ─────────────────────────────────────────────

-- Seed Plans
INSERT INTO public.party_subscription_plans (id, name, price_monthly) VALUES
  ('starter', 'Starter', 5000),
  ('growth', 'Growth', 15000),
  ('enterprise', 'Enterprise', 40000)
ON CONFLICT DO NOTHING;

-- Seed Major Parties
INSERT INTO public.political_parties (name, abbreviation, color) VALUES
  ('Orange Democratic Movement',       'ODM',     '#FF6600'),
  ('United Democratic Alliance',       'UDA',     '#FFD700'),
  ('Jubilee Party',                    'JUBILEE', '#006400'),
  ('Wiper Democratic Movement',        'WIPER',   '#8B0000'),
  ('Amani National Congress',          'ANC',     '#1E90FF'),
  ('Kenya African National Union',     'KANU',    '#DC143C'),
  ('Democratic Action Party of Kenya', 'DAP-K',   '#800080')
ON CONFLICT DO NOTHING;


-- ─────────────────────────────────────────────
-- 7. HELPER FUNCTION: GRANT PARTY ADMIN ROLE
-- ─────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.grant_party_admin(
  p_user_id     uuid,
  p_party_abbr  text,
  p_title       text DEFAULT NULL
)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_party_id uuid;
BEGIN
  SELECT id INTO v_party_id FROM public.political_parties
  WHERE abbreviation = upper(p_party_abbr) AND is_active = true LIMIT 1;

  IF v_party_id IS NULL THEN
    RETURN 'ERROR: Party "' || p_party_abbr || '" not found.';
  END IF;

  INSERT INTO public.party_memberships (user_id, party_id, role, title)
  VALUES (p_user_id, v_party_id, 'party_admin', p_title)
  ON CONFLICT (user_id, party_id)
  DO UPDATE SET role = 'party_admin', title = EXCLUDED.title, is_active = true;

  RETURN 'SUCCESS: User grants processed.';
END;
$$;
