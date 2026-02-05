-- Seed 10 Mock Crowdfunding Campaigns
-- Finds a user to assign these to (first found profile)

WITH first_user AS (
    SELECT id FROM public.profiles LIMIT 1
)
INSERT INTO public.crowdfundings (user_id, title, description, target_amount, collected_amount, image_url)
SELECT 
    (SELECT id FROM first_user),
    title,
    description,
    target_amount,
    collected_amount,
    image_url
FROM (VALUES
    (
        'Save the Mau Forest Ecosystem',
        'Help us plant 10,000 trees in the Mau Forest complex to restore our water towers. The funds will go towards seedlings and community labor.',
        1500000.00,
        450000.00,
        'https://images.unsplash.com/photo-1542601906990-b4d3fb7d5c73?auto=format&fit=crop&q=80&w=1000'
    ),
    (
        'Turkana Water Pan Project',
        'Building a sustainable water pan for the community in Lodwar to harvest rainwater and provide water for livestock during dry seasons.',
        3000000.00,
        1250000.00,
        'https://images.unsplash.com/photo-1574482620265-40643770a98f?auto=format&fit=crop&q=80&w=1000'
    ),
    (
        'Digital Literacy for Kibera Youth',
        'Equipping a community center with 50 laptops to teach coding and digital skills to youths in Kibera.',
        2500000.00,
        890000.00,
        'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&q=80&w=1000'
    ),
    (
        'Support Mama Mboga Business Fund',
        'A micro-grant initiative to boost capital for 100 women market vendors in Gikomba market who lost stock in the recent fire.',
        1000000.00,
        670000.00,
        'https://images.unsplash.com/photo-1605280261971-155e944d1877?auto=format&fit=crop&q=80&w=1000'
    ),
    (
        'Nairobi River Clean-up Drive',
        'Organizing a massive volunteer clean-up of the Nairobi River. Funds needed for protective gear, tools, and waste disposal trucks.',
        500000.00,
        120000.00,
        'https://images.unsplash.com/photo-1618477461853-cf6ed80fdb5f?auto=format&fit=crop&q=80&w=1000'
    ),
    (
        'School Feeding Program in Kilifi',
        'Providing lunch for 500 primary school pupils in Kilifi to ensure they stay in school and learn effectively.',
        1200000.00,
        980000.00,
        'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1000'
    ),
    (
        'Youth Sports Academy Equipment',
        'Buying kits, balls, and boots for the Mathare Youth Sports Association to nurture the next generation of football stars.',
        800000.00,
        45000.00,
        'https://images.unsplash.com/photo-1510566372909-2fc563065b77?auto=format&fit=crop&q=80&w=1000'
    ),
    (
        'Solar Lights for Rural Homes',
        'Distributing solar lamps to 200 households in off-grid villages in Kajiado to replace kerosene lamps.',
        1800000.00,
        1550000.00,
        'https://images.unsplash.com/photo-1548613053-220e8b23f240?auto=format&fit=crop&q=80&w=1000'
    ),
    (
        'Medical Camp for Seniors in Nyeri',
        'A free 3-day medical camp offering screenings and medication for diabetes and hypertension for the elderly.',
        600000.00,
        580000.00,
        'https://images.unsplash.com/photo-1584515933487-9d316b8e9f58?auto=format&fit=crop&q=80&w=1000'
    ),
    (
        'Arts & Culture Festival 2026',
        'Funding the first annual street arts festival in Mombasa to showcase local talent in painting, music, and dance.',
        4000000.00,
        200000.00,
        'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?auto=format&fit=crop&q=80&w=1000'
    )
) AS data(title, description, target_amount, collected_amount, image_url)
WHERE EXISTS (SELECT 1 FROM first_user);
