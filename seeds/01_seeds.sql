-- Inserting data into the users table
INSERT INTO users (name, email, password)
VALUES 
  ('Mike Chapter', 'mikechapter@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Annie Elise', 'annie@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Adrienne House', 'ahouse@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

-- Inserting data into the properties table
INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bedrooms, number_of_bathrooms, country, street, city, province, post_code, active)
VALUES
  (1, 'Cabin in the Woods', 'Wooden A-frame cabin', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 93061, 6, 4, 8, 'Canada', '536 Namsub Highway', 'Sotboske', 'Quebec', '28142', true),
  (1, 'Sunrise in the Sky-rise', 'Luxury penthouse', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 85234, 6, 6, 7, 'Canada', '651 Nami Road', 'Bohbatev', 'Alberta', '83680', true),
  (2, 'Coastal Yurt', 'Yurt in the woods along the', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg', 46058, 0, 5, 6, 'Canada', '1650 Hejto Center', 'Genwezuj', 'Newfoundland And Labrador', '44583', true);

-- Inserting data into the reservations table
INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES 
  ('2018-09-11', '2018-09-26', 1, 1),
  ('2019-01-04', '2019-02-01', 2, 2),
  ('2021-10-01', '2021-10-14', 3, 3);

-- Inserting data into the property_reviews table
INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES 
  (1, 2, 1, 3, 'Cute spot to relax'),
  (2, 2, 2, 5, 'Lovely decor!'),
  (3, 1, 3, 1, 'No complimentary coffee!');
