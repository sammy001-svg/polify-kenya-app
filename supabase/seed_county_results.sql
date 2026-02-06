DO $$
DECLARE
    v_eid UUID;
    v_id_ruto UUID;
    v_id_raila UUID;
    v_id_kalonzo UUID;
    v_id_wajack UUID;
    c_list TEXT[] := ARRAY[
        'Mombasa', 'Kwale', 'Taita Taveta', 'Kilifi', 'Lamu', 'Tana River',
        'Garissa', 'Wajir', 'Mandera', 'Marsabit', 'Isiolo', 'Meru',
        'Tharaka-Nithi', 'Embu', 'Kitui', 'Machakos', 'Makueni', 'Nyandarua',
        'Nyeri', 'Kirinyaga', 'Murang''a', 'Kiambu', 'Turkana', 'West Pokot',
        'Samburu', 'Trans Nzoia', 'Uasin Gishu', 'Elgeyo-Marakwet', 'Nandi',
        'Baringo', 'Laikipia', 'Nakuru', 'Narok', 'Kajiado', 'Kericho',
        'Bomet', 'Kakamega', 'Vihiga', 'Bungoma', 'Busia', 'Siaya',
        'Kisumu', 'Homa Bay', 'Migori', 'Kisii', 'Nyamira', 'Nairobi'
    ];
    c_name TEXT;
    votes_ruto INTEGER;
    votes_raila INTEGER;
    votes_kalonzo INTEGER;
    votes_wajack INTEGER;
    v_total INTEGER;
    s_count INTEGER;
BEGIN
    SELECT id INTO v_eid FROM elections WHERE name = 'General Election 2027' LIMIT 1;
    IF v_eid IS NULL THEN RAISE EXCEPTION 'Election not found'; END IF;

    SELECT id INTO v_id_ruto FROM election_candidates WHERE name = 'William Ruto' AND election_id = v_eid;
    SELECT id INTO v_id_raila FROM election_candidates WHERE name = 'Raila Odinga' AND election_id = v_eid;
    SELECT id INTO v_id_kalonzo FROM election_candidates WHERE name = 'Kalonzo Musyoka' AND election_id = v_eid;
    SELECT id INTO v_id_wajack FROM election_candidates WHERE name = 'George Wajackoyah' AND election_id = v_eid;

    DELETE FROM election_results WHERE level = 'county';

    FOREACH c_name IN ARRAY c_list
    LOOP
        s_count := floor(random() * (2000) + 500);
        votes_ruto := floor(random() * (150000) + 50000);
        votes_raila := floor(random() * (150000) + 50000);
        votes_kalonzo := floor(random() * (20000) + 5000);
        votes_wajack := floor(random() * (4000) + 1000);
        v_total := votes_ruto + votes_raila + votes_kalonzo + votes_wajack;

        INSERT INTO election_results (candidate_id, level, location_name, votes, total_valid_votes, reporting_stations, total_stations)
        VALUES
            (v_id_ruto, 'county', c_name, votes_ruto, v_total, s_count, s_count),
            (v_id_raila, 'county', c_name, votes_raila, v_total, s_count, s_count),
            (v_id_kalonzo, 'county', c_name, votes_kalonzo, v_total, s_count, s_count),
            (v_id_wajack, 'county', c_name, votes_wajack, v_total, s_count, s_count);
    END LOOP;
END $$;
