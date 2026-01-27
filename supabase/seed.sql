-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- USERS (Insert into auth.users is tricky in cloud, but standard for local seeding)
-- We strictly follow the schema. profiles references auth.users.
-- For the sake of this seed script, we will insert into auth.users. 
-- NOTE: In a real Supabase project, you might need to create users via API, 
-- but for local development (supabase start), this works.

INSERT INTO auth.users (id, aud, role, email, encrypted_password, email_confirmed_at, recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token)
VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'authenticated', 'authenticated', 'candidate@example.com', crypt('password123', gen_salt('bf')), NOW(), NOW(), NOW(), '{"provider":"email","providers":["email"]}', '{"full_name":"Candidate Alice"}', NOW(), NOW(), '', '', '', ''),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'authenticated', 'authenticated', 'voter@example.com', crypt('password123', gen_salt('bf')), NOW(), NOW(), NOW(), '{"provider":"email","providers":["email"]}', '{"full_name":"Voter Bob"}', NOW(), NOW(), '', '', '', '');

-- PROFILES (Trigger typically handles this, but for seed we make sure)
-- If the trigger exists (handle_new_user), these might be auto-created. 
-- We use ON CONFLICT DO NOTHING to match potentially triggered rows.

INSERT INTO public.profiles (id, full_name, role, created_at, updated_at)
VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Candidate Alice', 'candidate', NOW(), NOW()),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Voter Bob', 'voter', NOW(), NOW())
ON CONFLICT (id) DO UPDATE 
SET full_name = EXCLUDED.full_name, role = EXCLUDED.role;

-- POLITICIANS
INSERT INTO public.politicians (id, name, position, party, county, constituency, ward, is_incumbent, bio, slogan, manifesto, contact_info, track_record)
VALUES
('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'Hon. John Doe', 'Governor', 'Progressive Party', 'Nairobi', 'Westlands', 'Kitisuru', TRUE, 'Dedicated to urban development and youth empowerment.', 'Building a Better Future', 'Focus on infrastructure, digital economy, and green spaces.', '{"email": "john.doe@gov.ke", "phone": "+254700000001", "socialMedia": {"twitter": "@johndoe"}}', '{"billsSponsored": ["Urban Planning Bill 2024", "Youth Fund Amendment"], "projects": ["Westlands Library", "Road Expansion"]}'),
('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 'Hon. Jane Smith', 'Senator', 'Unity Alliance', 'Mombasa', 'Likoni', 'Shelley', FALSE, 'Champion for coastal resources and education.', 'Unity and Prosperity', 'Revitalize tourism, improve schools, and clean water access.', '{"email": "jane.smith@senate.ke", "phone": "+254700000002", "socialMedia": {"facebook": "SenatorJane"}}', '{"billsSponsored": ["Marine Conservation Act"], "projects": ["Likoni Community Center"]}');

-- CAMPAIGNS
INSERT INTO public.campaigns (id, user_id, office, jurisdiction, party, slogan, overview, manifesto_summary, status)
VALUES
('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'MP', 'Langata', 'Future Kenya', 'Voices for All', 'A campaign driven by the people, for the people.', 'Focus on healthcare, jobs, and security.', 'active');

-- CAMPAIGN TEAM
INSERT INTO public.campaign_team (campaign_id, name, role, email, phone, access_level)
VALUES
('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 'Sarah Connor', 'Campaign Manager', 'sarah@example.com', '+254711111111', 'admin'),
('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 'Kyle Reese', 'Field Coordinator', 'kyle@example.com', '+254722222222', 'member');

-- MANIFESTO ITEMS
INSERT INTO public.manifesto_items (campaign_id, issue, problem, solution, implementation, outcome, timeline)
VALUES
('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 'Youth Unemployment', 'High rates of jobless youth in the constituency.', 'Establish tech hubs and vocational training centers.', 'Partner with local tech firms to provide mentorship and internships.', 'Reduce youth unemployment by 20% in 2 years.', 'Medium-term'),
('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 'Healthcare Access', 'Lack of medicine in local dispensaries.', 'Increase budget allocation for medical supplies.', 'Lobby county government and seek private partnerships.', 'Fully stocked dispensaries year-round.', 'Short-term');

-- FINANCE RECORDS
INSERT INTO public.finance_records (campaign_id, type, category, description, amount, date, status)
VALUES
('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 'donation', 'Individual', 'Donation from James', 5000.00, '2025-01-10', 'received'),
('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 'expense', 'Marketing', 'Printing posters', 15000.00, '2025-01-15', 'paid');

-- YOUTH ISSUES
INSERT INTO public.youth_issues (id, title, description, color, stats)
VALUES
('unemployment', 'Unemployment', 'Lack of jobs and economic opportunities for young people.', '#FF5733', '{"rate": "35%", "trend": "Increasing"}'),
('corruption', 'Corruption', 'Misuse of public funds affecting service delivery.', '#C70039', '{"index": "High", "impact": "Severe"}'),
('climate_change', 'Climate Change', 'Environmental degradation and extreme weather patterns.', '#28B463', '{"awareness": "Growing", "action_needed": "Immediate"}');

-- POLITICIAN RESPONSES TO ISSUES
INSERT INTO public.issue_responses (issue_id, politician_id, response_text, proposed_actions, timeline, resources, success_metrics, likes)
VALUES
('unemployment', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'We are launching the "Kazi Kwa Vijana" 2.0 initiative.', '["Create digital work hubs", "Tax breaks for hiring youth"]', '2025-2026', 'County Budget Allocation', '["10,000 new jobs", "500 startups funded"]', 150),
('climate_change', 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 'Protecting our mandate to conserve the coastline.', '["Ban single-use plastics in beaches", "Plant 1 million mangroves"]', 'Ongoing', 'CDF and Donor Funds', '["Clean beaches", "Increased fish stock"]', 200);

-- BADGES
INSERT INTO public.badges (id, name, description, icon, rarity, xp_reward, requirements)
VALUES
('civic_starter', 'Civic Starter', 'Completed the first module on civic education.', '🔰', 'common', 100, '{"modules_completed": 1}'),
('policy_pro', 'Policy Pro', 'Submitted a policy idea that got 100 votes.', '📜', 'rare', 500, '{"votes_received": 100}');

-- USER PROGRESS
-- Linking to the Voter User 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'
INSERT INTO public.user_progress (user_id, level, current_xp, total_xp, badges, completed_modules, streak, last_login)
VALUES
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 2, 150, 350, '["civic_starter"]', '["module_1_civics"]', 5, NOW())
ON CONFLICT (user_id) DO UPDATE
SET level = EXCLUDED.level, current_xp = EXCLUDED.current_xp;

-- POLICY IDEAS
INSERT INTO public.policy_ideas (user_id, title, description, category, votes, status)
VALUES
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Free Wi-Fi in Public Parks', 'Install free public Wi-Fi hotspots in all major recreational parks to boost connectivity.', 'Technology', 75, 'submitted'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Community Recycling Centers', 'Establish recycling centers in every ward to manage waste better.', 'Environment', 120, 'under_review');
