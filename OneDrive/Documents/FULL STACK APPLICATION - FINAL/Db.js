const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // If using Render or Railway, you often need this SSL setting:
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;