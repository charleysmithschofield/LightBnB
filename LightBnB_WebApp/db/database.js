// database.js

const { Pool } = require("pg");
const properties = require("./json/properties.json");
const users = require("./json/users.json");

// Configure the connection pool
const pool = new Pool({
  user: "development",
  password: "development",
  host: "localhost",
  database: "lightbnb",
});

/**
 * FUNCTION: GET USER WITH EMAIL
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool
    .query(`
    SELECT * 
    FROM users
    WHERE email = $1`, [email])
    .then((result) => {
      return result.rows[0] || null;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/**
 * FUNCTION: GET USER WITH ID
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool.query(`
  SELECT * 
  FROM users
  WHERE id = $1`, [id])
    .then((result) => {
      return result.rows[0] || null;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/**
 * FUNCTION: ADD USER
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function(user) {
  return pool
    .query(`
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *`, [user.name, user.email, user.password])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/**
 * FUNCTION: GET ALL RESERVATIONS
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const query = `
    SELECT reservations.*, properties.*, users.*, avg(property_reviews.rating) AS average_rating
    FROM reservations
    JOIN properties ON reservations.property_id = properties.id
    JOIN users ON reservations.guest_id = users.id
    LEFT JOIN property_reviews ON properties.id = property_reviews.property_id
    WHERE reservations.guest_id = $1
    GROUP BY reservations.id, properties.id, users.id
    ORDER BY reservations.start_date
    LIMIT $2;
  `;
  return pool.query(query, [guest_id, limit])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};


/**
 * FUNCTION: GET ALL PROPERTIES
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = (options, limit = 10) => {
  // Array to hold the queries
  const queryParams = [];

  // start the query with all info before the WHERE clause
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as property_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_reviews.property_id
  WHERE 1=1
  `;

  // Array to hold the individual filter conditions
  const filters = [];

  // if owner is passed in, only return properties belonging to that owner
  if (options.owner_id) {
    queryParams.push(options.owner_id);
    filters.push(`properties.owner_id = $${queryParams.length}`);
  }

  // if a minimum_price_per_night and a maximum_price_per_night, return properties in that range
  if (options.minimum_price_per_night !== undefined && options.maximum_price_per_night !== undefined) {
    queryParams.push(options.minimum_price_per_night);
    queryParams.push(options.maximum_price_per_night);
    filters.push(`properties.cost_per_night BETWEEN $${queryParams.length - 1} AND $${queryParams.length}`);
  }

  // if minimum_rating is passed in, only return properties with an average rating equal to or higher than that
  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    queryString += `HAVING avg(property_reviews.rating) >= $${queryParams.length}`;
  }

  // Combine all filter conditions with 'AND
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    filters.push(`properties.city LIKE $${queryParams.length}`);
  }

  if (filters.length > 0) {
    queryString += ` AND ${filters.join(' AND ')}`;
  }

  // Add any query that comes after the WHERE clause
  queryParams.push(limit);
  queryString += `
    GROUP BY properties.id
    ORDER BY cost_per_night
    LIMIT $${queryParams.length}`;

  // Log everything to check it is done right
  console.log(queryString);
  console.log(queryParams);

  // Run the query
  return pool.query(queryString, queryParams)
    .then((res) => res.rows)
    .catch((err) => {
      console.log(err.message);
    });
};

/**
 * FUNCTION: ADD A PROPERTY TO THE DATABASE
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};

// Exports
module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};

