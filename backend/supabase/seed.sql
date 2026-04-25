-- ============================================================
-- DABBLE — SEED DATA: STATEN ISLAND LAUNCH PARTNERS v1.0
-- 5 local businesses, 10 upcoming events
-- Replace placeholder names/addresses with real partner data
-- before public launch
-- ============================================================

insert into public.businesses (id, name, address, borough, category, description, instagram)
values
  (
    'b1000000-0000-0000-0000-000000000001',
    'The Karaoke Lounge SI',
    '123 Victory Blvd, Staten Island, NY 10301',
    'Staten Island', 'nightlife',
    'Private karaoke rooms and open stage nights every Friday and Saturday.',
    '@karaokeloungesid'
  ),
  (
    'b1000000-0000-0000-0000-000000000002',
    'Sip & Stroke Studio',
    '456 Forest Ave, Staten Island, NY 10310',
    'Staten Island', 'art',
    'Wine and paint nights every Thursday and Sunday. No experience needed.',
    '@sipandstrokesi'
  ),
  (
    'b1000000-0000-0000-0000-000000000003',
    'Escape the Island',
    '789 Richmond Ave, Staten Island, NY 10314',
    'Staten Island', 'gaming',
    'Immersive escape room experiences for groups of 2-8. Five themed rooms.',
    '@escapetheisland'
  ),
  (
    'b1000000-0000-0000-0000-000000000004',
    'Brewed on Bay Street',
    '321 Bay St, Staten Island, NY 10301',
    'Staten Island', 'food_drink',
    'Craft brewery with weekly trivia nights, live music, and tasting events.',
    '@brewedonbay'
  ),
  (
    'b1000000-0000-0000-0000-000000000005',
    'The Clay Co.',
    '654 Richmond Terrace, Staten Island, NY 10301',
    'Staten Island', 'art',
    'Pottery wheel and hand-building classes. Beginner-friendly and welcoming.',
    '@theclaycosi'
  );

insert into public.events (business_id, title, description, category, event_date, event_time, capacity)
values
  (
    'b1000000-0000-0000-0000-000000000001',
    'Friday Night Karaoke Open Stage',
    'Open stage karaoke — all genres, all skill levels. Drink specials all night. Show up solo or with people.',
    'nightlife', current_date + interval '3 days', '20:00', 60
  ),
  (
    'b1000000-0000-0000-0000-000000000001',
    'Private Karaoke Room Night',
    'Book a private room for your group. 2 hours, round of drinks included.',
    'nightlife', current_date + interval '7 days', '19:00', 12
  ),
  (
    'b1000000-0000-0000-0000-000000000002',
    'Thursday Wine & Paint — Coastal Sunset',
    'Paint a Staten Island waterfront sunset. All supplies included. One glass of wine with ticket.',
    'art', current_date + interval '4 days', '19:00', 24
  ),
  (
    'b1000000-0000-0000-0000-000000000002',
    'Sunday Brunch & Brushes',
    'Daytime paint session with mimosas. Great for beginners. Just show up ready to create.',
    'art', current_date + interval '6 days', '11:00', 20
  ),
  (
    'b1000000-0000-0000-0000-000000000003',
    'The Lighthouse Escape — Beginner Friendly',
    'Our easiest room. Perfect for first-timers. Groups of 2-6. Strangers welcome to team up.',
    'gaming', current_date + interval '5 days', '18:00', 6
  ),
  (
    'b1000000-0000-0000-0000-000000000003',
    'The Vault Heist — Advanced',
    'Our hardest room. 60 minutes. Under 20% escape rate. Not for the faint of heart.',
    'gaming', current_date + interval '9 days', '19:30', 8
  ),
  (
    'b1000000-0000-0000-0000-000000000004',
    'Wednesday Trivia Night',
    'Weekly pub trivia with prizes. Teams of 2-6. Solo players matched if needed. Free to play.',
    'food_drink', current_date + interval '2 days', '19:30', 80
  ),
  (
    'b1000000-0000-0000-0000-000000000004',
    'New Brew Saturday — Tasting Flight',
    'We drop three new seasonal beers. Come taste, rate, and hang with the brewers.',
    'food_drink', current_date + interval '8 days', '14:00', 40
  ),
  (
    'b1000000-0000-0000-0000-000000000005',
    'Beginner Wheel Throwing Class',
    'Learn pottery from scratch. 2-hour class. All materials included. Max 8 students.',
    'art', current_date + interval '10 days', '10:00', 8
  ),
  (
    'b1000000-0000-0000-0000-000000000005',
    'Open Studio Sunday',
    'Drop-in session for anyone who has taken a class. Work at your own pace. Clay and tools provided.',
    'art', current_date + interval '13 days', '12:00', 15
  );
