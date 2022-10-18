const { Pool } = require('pg');
const postgres = require('postgres');

const sql = postgres('postgres://miranda@localhost:5432/QuestionsAndAnswers');

const pool = new Pool();

module.exports = {
  sql,
  pool
}