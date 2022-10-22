const db = require('../../db/db.js');

exports.getQuestions = (req, res) => {
  let product_id = req.params.product_id;
  db.query(`SELECT
             question_id,
             product_id,
             question_body,
             to_timestamp(question_date/1000)::date,
             asker_name,
             asker_email,
             reported,
             question_helpfulness
            FROM questions WHERE product_id = ${product_id} AND reported = false`)
    .then((data) => {
      console.log(data.rows);
      res.status(200).send(data.rows);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send();
    })
}

exports.getAnswers = (req, res) => {
  let q_id = req.params.question_id;
  db.query(`SELECT
             answer_id,
             question_id,
             answer_body,
             to_timestamp(answer_date/1000)::date,
             answer_name,
             answer_email,
             reported,
             answer_helpfulness
           FROM answers WHERE question_id = ${q_id} AND reported = false`)
    .then((data) => {
      console.log(data.rows);
      res.status(200).send(data.rows);
    })
    .catch(err => {
      res.status(500).send();
    })
};

exports.addQuestion = (req, res) => {
  let body = req.body;
  db.query(`INSERT INTO questions (question_id, product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness)
            VALUES (
              (SELECT MAX(question_id) FROM questions) + 1,
              ${body.product_id},
              '${body.body}',
              (extract(epoch from now()) * 1000),
              '${body.name}',
              '${body.email}',
              false,
              0)`)
    .then(() => {
      res.status(201).send();
    })
    .catch(err => {
      console.log(err);
      res.status(500).send();
    })
}