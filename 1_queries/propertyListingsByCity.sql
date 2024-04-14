-- Property Listings By City

-- When the users come to our home page, they are going to see a list
-- of properties. They will be able to view the properties and filter
-- them by location. They will be able to see all data about the
-- property, including the average rating.

-- Later we'll use this query in our app and alter it slightly
-- to select more columns.

-- Show specific details about properties located in Vancouver incl.
-- the average rating.

-- Select id, title, cost_per_night, and average_rating
-- from the properties table for properties in Vancovuer.
-- Order by results from lowest cost_per_night to highest
-- cost_per_night.
-- Limit the number of results to 10.
-- Only show listings that have a rating >= 4 stars.

SELECT reservations.id, properties.title, properties.cost_per_night, reservations.start_date, avg(rating) as average_rating
FROM reservations
JOIN properties ON reservations.property_id = properties.id
JOIN property_reviews ON properties.id = property_reviews.property_id
WHERE reservations.guest_id = 1
GROUP BY properties.id, reservations.id
ORDER BY reservations.start_date
LIMIT 10;