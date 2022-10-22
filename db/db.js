const { Pool } = require('pg');

const pool = new Pool({
  user: 'miranda',
  host: 'localhost',
  database: 'questionsandanswers',
  port: 5432,
})

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },
  pool
}
